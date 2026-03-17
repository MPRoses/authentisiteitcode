import { blogPosts as fallbackBlogPosts } from '../data/blogPosts';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

function normalizePost(post) {
    return {
        ...post,
        content: Array.isArray(post.content) ? post.content : [],
    };
}

function mapSupabasePost(post) {
    const fallbackPost = fallbackBlogPosts.find((currentPost) => currentPost.slug === post.slug);

    return normalizePost({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        image: post.image_url,
        fallbackImage: fallbackPost?.image ?? '',
        date: post.date_label,
        readTime: post.read_time,
        content: post.content,
        published: post.published,
    });
}

function getFallbackPosts() {
    return fallbackBlogPosts.map((post) =>
        normalizePost({
            ...post,
            fallbackImage: post.image,
        })
    );
}

export async function getPublishedPosts() {
    if (!isSupabaseConfigured || !supabase) {
        return getFallbackPosts();
    }

    const { data, error } = await supabase
        .from('posts')
        .select('id, slug, title, excerpt, content, image_url, date_label, read_time, published, sort_order, updated_at')
        .eq('published', true)
        .order('sort_order', { ascending: true, nullsFirst: false })
        .order('updated_at', { ascending: false });

    if (error) {
        console.error('Failed to load published posts from Supabase:', error);
        return getFallbackPosts();
    }

    return data.map(mapSupabasePost);
}

export async function getPublishedPostBySlug(slug) {
    if (!isSupabaseConfigured || !supabase) {
        return getFallbackPosts().find((post) => post.slug === slug) ?? null;
    }

    const { data, error } = await supabase
        .from('posts')
        .select('id, slug, title, excerpt, content, image_url, date_label, read_time, published')
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle();

    if (error) {
        console.error(`Failed to load post "${slug}" from Supabase:`, error);
        return getFallbackPosts().find((post) => post.slug === slug) ?? null;
    }

    return data ? mapSupabasePost(data) : null;
}
