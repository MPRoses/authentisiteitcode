import { useEffect, useState } from 'react';
import { getPublishedPostBySlug, getPublishedPosts } from '../services/blogService';

export function useBlogPost(slug) {
    const [post, setPost] = useState(null);
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const loadPostData = async () => {
            try {
                setIsLoading(true);

                const [nextPost, nextPosts] = await Promise.all([
                    getPublishedPostBySlug(slug),
                    getPublishedPosts(),
                ]);

                if (isMounted) {
                    setPost(nextPost);
                    setPosts(nextPosts);
                }
            } catch (error) {
                console.error(`Failed to load blog post "${slug}":`, error);
                if (isMounted) {
                    setPost(null);
                    setPosts([]);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        loadPostData();

        return () => {
            isMounted = false;
        };
    }, [slug]);

    return { post, posts, isLoading };
}
