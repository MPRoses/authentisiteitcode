import { useEffect, useState } from 'react';
import { getPublishedPosts } from '../services/blogService';

export function useBlogPosts() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const loadPosts = async () => {
            try {
                setIsLoading(true);
                const nextPosts = await getPublishedPosts();

                if (isMounted) {
                    setPosts(nextPosts);
                }
            } catch (error) {
                console.error('Failed to load blog posts:', error);
                if (isMounted) {
                    setPosts([]);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        loadPosts();

        return () => {
            isMounted = false;
        };
    }, []);

    return { posts, isLoading };
}
