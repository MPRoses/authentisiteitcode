import React from 'react';
import { Link } from 'react-router-dom';
import './../css/Blog.css';
import { useBlogPosts } from '../hooks/useBlogPosts';
import ManagedImage from './ManagedImage';

function Blog() {
    const { posts, isLoading } = useBlogPosts();
    const featuredPost = posts[0];

    if (!featuredPost) {
        return (
            <section className="blog section fade-in">
                <div className="blog-container">
                    <div className="blog-header" id="alle-artikelen">
                        <div className="section-title">Alle artikelen</div>
                        <div className="section-bio">
                            {isLoading ? 'Blogartikelen laden...' : 'Er zijn momenteel nog geen blogartikelen beschikbaar.'}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="blog section fade-in">
            <div className="blog-container">
                <div className="blog-intro">
                    <div className="blog-intro-copy">
                        <div className="blog-eyebrow">Blog</div>
                        <div className="section-title">
                            Uitleg en houvast rond autisme en prikkelverwerking
                        </div>
                        <div className="section-bio">
                            In deze blog deel ik heldere uitleg, praktijkvoorbeelden en korte inzichten over autisme,
                            prikkelverwerking en passende ondersteuning. De artikelen zijn geschreven voor ouders,
                            professionals en iedereen die meer rust en richting zoeken in de dagelijkse praktijk.
                        </div>
                        <div className="blog-intro-actions">
                            <Link className="blog-intro-link clickable" to={`/blog/${featuredPost.slug}`}>
                                Lees nieuwste artikel
                            </Link>
                        </div>
                    </div>

                    <Link className="blog-intro-featured" to={`/blog/${featuredPost.slug}`}>
                        <div className="blog-intro-image">
                            <ManagedImage
                                src={featuredPost.image || featuredPost.fallbackImage}
                                fallbackSrc={featuredPost.fallbackImage}
                                alt={featuredPost.title}
                                loading="eager"
                            />
                        </div>
                        <div className="blog-intro-featured-content">
                            <div className="blog-intro-meta">{featuredPost.date} ● {featuredPost.readTime} leestijd</div>
                            <h2>{featuredPost.title}</h2>
                            <p>{featuredPost.excerpt}</p>
                        </div>
                    </Link>
                </div>

                <div className="blog-header" id="alle-artikelen">
                    <div className="section-title">Alle artikelen</div>
                </div>

                <div className="blog-grid">
                    {posts.map((post, index) => (
                        <Link
                            className="blog-card"
                            id={index === 0 ? "blog-grid-start" : undefined}
                            key={post.slug}
                            to={`/blog/${post.slug}`}
                        >
                            <div className="card-image">
                                <ManagedImage
                                    src={post.image || post.fallbackImage}
                                    fallbackSrc={post.fallbackImage}
                                    alt={post.title}
                                    loading="lazy"
                                />
                            </div>
                            <div className="card-content">
                                <div className="card-meta">
                                    <span>{post.date} ● {post.readTime} leestijd</span>
                                </div>
                                <h3>{post.title}</h3>
                                <p>{post.excerpt}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Blog;
