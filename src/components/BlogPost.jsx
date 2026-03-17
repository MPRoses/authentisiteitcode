import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import './../css/BlogPost.css';
import { useBlogPost } from '../hooks/useBlogPost';
import ManagedImage from './ManagedImage';

function BlogPost() {
    const { slug } = useParams();
    const { post, posts, isLoading } = useBlogPost(slug);

    if (isLoading) {
        return (
            <section className="blog-post section fade-in">
                <div className="blog-post-container">
                    <div className="post-meta">Blog laden...</div>
                    <h1>Artikel wordt geladen</h1>
                </div>
            </section>
        );
    }

    if (!post || posts.length === 0) {
        return <Navigate to="/blog" replace />;
    }

    const currentIndex = posts.findIndex((currentPost) => currentPost.slug === slug);
    if (currentIndex === -1) {
        return <Navigate to="/blog" replace />;
    }
    const prevPost = posts[(currentIndex - 1 + posts.length) % posts.length];
    const nextPost = posts[(currentIndex + 1) % posts.length];

    return (
        <section className="blog-post section fade-in">
            <div className="blog-post-container">
                <Link className="back-link" to="/blog" state={{ scrollToId: "blog-grid-start" }}>
                    Terug naar blogoverzicht
                </Link>

                <div className="post-meta">{post.date} ● {post.readTime} leestijd</div>
                <h1>{post.title}</h1>

                <div className="post-image">
                    <ManagedImage
                        src={post.image || post.fallbackImage}
                        fallbackSrc={post.fallbackImage}
                        alt={post.title}
                        loading="eager"
                    />
                </div>

                <div className="post-content">
                    {post.content.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                    ))}
                </div>

                {posts.length > 1 && (
                    <div className="post-related">
                        <div className="post-related-label">Lees ook</div>
                        <div className="post-related-grid">
                            <Link className="post-related-card" to={`/blog/${prevPost.slug}`}>
                                <span className="post-related-kicker">Nog een artikel</span>
                                <h2>{prevPost.title}</h2>
                                <p>{prevPost.excerpt}</p>
                            </Link>
                            <Link className="post-related-card" to={`/blog/${nextPost.slug}`}>
                                <span className="post-related-kicker">Of lees ook</span>
                                <h2>{nextPost.title}</h2>
                                <p>{nextPost.excerpt}</p>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default BlogPost;
