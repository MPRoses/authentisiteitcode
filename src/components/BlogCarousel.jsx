import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './../css/BlogCarousel.css';
import { useBlogPosts } from '../hooks/useBlogPosts';
import ManagedImage from './ManagedImage';

function BlogCarousel() {
    const { posts, isLoading } = useBlogPosts();
    const [activeIndex, setActiveIndex] = useState(0);
    const safeActiveIndex = activeIndex >= posts.length ? 0 : activeIndex;
    const activePost = posts[safeActiveIndex];
    const nextIndex = safeActiveIndex === posts.length - 1 ? 0 : safeActiveIndex + 1;
    const nextPost = posts[nextIndex];

    const goToNext = () => {
        setActiveIndex((currentIndex) => (
            currentIndex === posts.length - 1 ? 0 : currentIndex + 1
        ));
    };

    if (posts.length === 0 || !activePost || !nextPost) {
        return (
            <section className="blog-carousel section fade-in">
                <div className="blog-carousel-container">
                    <div className="blog-carousel-copy">
                        <div className="blog-carousel-eyebrow">Uit de blog</div>
                        <div className="section-title">Praktische inzichten voor thuis, school en begeleiding</div>
                        <div className="section-bio">
                            {isLoading ? 'Blogartikelen laden...' : 'Er zijn momenteel nog geen blogartikelen beschikbaar.'}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="blog-carousel section fade-in">
            <div className="blog-carousel-container">
                <div className="blog-carousel-copy">
                    <div className="blog-carousel-eyebrow">Uit de blog</div>
                    <div className="section-title">Praktische inzichten voor thuis, school en begeleiding</div>
                    <div className="section-bio">
                        Korte artikelen met heldere uitleg over autisme, prikkelverwerking en ondersteuning
                        die in de praktijk werkt.
                    </div>
                    <div className="blog-carousel-actions">
                        <Link className="blog-carousel-link clickable" to={`/blog/${activePost.slug}`}>
                            Lees dit artikel
                        </Link>
                    </div>
                </div>

                <div className="blog-carousel-panel">
                    <Link className="blog-carousel-card" to={`/blog/${activePost.slug}`}>
                        <div className="blog-carousel-image">
                            <ManagedImage
                                src={activePost.image || activePost.fallbackImage}
                                fallbackSrc={activePost.fallbackImage}
                                alt={activePost.title}
                                loading="lazy"
                            />
                        </div>
                        <div className="blog-carousel-card-content">
                            <div className="blog-carousel-meta">{activePost.date} ● {activePost.readTime} leestijd</div>
                            <h3>{activePost.title}</h3>
                            <p>{activePost.excerpt}</p>
                        </div>
                    </Link>

                    {posts.length > 1 && (
                        <div className="blog-carousel-controls">
                            <div className="blog-carousel-dots">
                                {posts.map((post, index) => (
                                    <button
                                        key={post.slug}
                                        className={`blog-carousel-dot clickable${index === safeActiveIndex ? ' is-active' : ''}`}
                                        type="button"
                                        onClick={() => setActiveIndex(index)}
                                        aria-label={`Ga naar artikel ${index + 1}: ${post.title}`}
                                    />
                                ))}
                            </div>

                            <button
                                className="blog-carousel-next clickable"
                                type="button"
                                onClick={goToNext}
                                aria-label={`Lees ook: ${nextPost.title}`}
                            >
                                <span className="blog-carousel-next-label">Lees ook</span>
                                <span className="blog-carousel-next-title">{nextPost.title}</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default BlogCarousel;
