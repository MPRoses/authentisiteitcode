import { isSupabaseConfigured, supabase } from '../lib/supabase';

function ensureSupabase() {
    if (!isSupabaseConfigured || !supabase) {
        throw new Error('Supabase is niet geconfigureerd.');
    }
}

function mapPost(post) {
    return {
        id: post.id,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: Array.isArray(post.content) ? post.content : [],
        imageUrl: post.image_url,
        dateLabel: post.date_label,
        readTime: post.read_time,
        sortOrder: post.sort_order ?? 0,
        published: Boolean(post.published),
    };
}

export async function getAdminSession() {
    ensureSupabase();
    const { data, error } = await supabase.auth.getSession();
    if (error) {
        throw error;
    }
    return data.session;
}

export function subscribeToAdminAuth(callback) {
    ensureSupabase();
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
        callback(session);
    });
    return data.subscription;
}

export async function signInAdmin(email, password) {
    ensureSupabase();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
        throw error;
    }
    return data.session;
}

export async function signOutAdmin() {
    ensureSupabase();
    const { error } = await supabase.auth.signOut();
    if (error) {
        throw error;
    }
}

export async function getAllPostsAdmin() {
    ensureSupabase();
    const { data, error } = await supabase
        .from('posts')
        .select('id, slug, title, excerpt, content, image_url, date_label, read_time, sort_order, published')
        .order('sort_order', { ascending: true, nullsFirst: false })
        .order('updated_at', { ascending: false });

    if (error) {
        throw error;
    }

    return data.map(mapPost);
}

export async function savePostAdmin(post) {
    ensureSupabase();

    const payload = {
        id: post.id || undefined,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        image_url: post.imageUrl,
        date_label: post.dateLabel,
        read_time: post.readTime,
        sort_order: Number.isFinite(post.sortOrder) ? post.sortOrder : 0,
        published: Boolean(post.published),
    };

    const { data, error } = await supabase
        .from('posts')
        .upsert(payload)
        .select('id, slug, title, excerpt, content, image_url, date_label, read_time, sort_order, published')
        .single();

    if (error) {
        throw error;
    }

    return mapPost(data);
}

export async function deletePostAdmin(postId) {
    ensureSupabase();

    const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId);

    if (error) {
        throw error;
    }
}

export async function uploadPostImage(file, slug) {
    ensureSupabase();

    const extension = file.name.includes('.') ? file.name.split('.').pop() : 'jpg';
    const safeSlug = (slug || 'blog-image').trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-');
    const filePath = `${safeSlug}-${Date.now()}.${extension}`;

    const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file, { upsert: true });

    if (uploadError) {
        throw uploadError;
    }

    const { data } = supabase.storage.from('blog-images').getPublicUrl(filePath);
    return data.publicUrl;
}
