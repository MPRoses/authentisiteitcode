import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import './../css/BlogPost.css';
import { useBlogPost } from '../hooks/useBlogPost';
import ManagedImage from './ManagedImage';

function formatFileSize(bytes) {
    if (!bytes || bytes <= 0) {
        return '';
    }

    if (bytes < 1024 * 1024) {
        return `${Math.round(bytes / 1024)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileName(post) {
    if (post.documentName) {
        return post.documentName;
    }

    if (!post.documentUrl) {
        return '';
    }

    const parts = post.documentUrl.split('/');
    const rawName = parts[parts.length - 1] || '';
    return rawName.split('?')[0];
}

function getDownloadHref(post) {
    if (!post.documentUrl) {
        return '';
    }

    const fileName = post.documentName || getFileName(post) || 'document.pdf';
    const separator = post.documentUrl.includes('?') ? '&' : '?';
    return `${post.documentUrl}${separator}download=${encodeURIComponent(fileName)}`;
}

function BlogPost() {
    const { slug } = useParams();
    const { post, posts, isLoading } = useBlogPost(slug);

    if (isLoading) {
        return (
            <section className="blog-post section">
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
    const documentFileName = getFileName(post);
    const documentFileSize = formatFileSize(post.documentSizeBytes);
    const documentDownloadHref = getDownloadHref(post);
    const documentTitle = post.documentLabel?.trim() || 'Handreiking als PDF';

    return (
        <section className="blog-post section">
            <div className="blog-post-container">
                <Link className="back-link" to="/blog" state={{ scrollToId: 'blog-grid-start' }}>
                    Terug naar blogoverzicht
                </Link>

                <div className="post-meta">{post.date} {'\u2022'} {post.readTime} leestijd</div>
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

                {post.documentUrl && (
                    <div className="post-document">
                        <div className="post-document-copy">
                            <div className="post-document-label">Document</div>
                            <h2>{documentTitle}</h2>
                            <p>
                                Download de bijlage om deze informatie offline te bewaren of te delen.
                            </p>
                            {(documentFileName || documentFileSize) && (
                                <div className="post-document-meta">
                                    {documentFileName}
                                    {documentFileName && documentFileSize ? ' \u2022 ' : ''}
                                    {documentFileSize}
                                </div>
                            )}
                        </div>
                        <a
                            className="post-document-button"
                            href={documentDownloadHref}
                            download={documentFileName || 'document.pdf'}
                        >
                            Download
                        </a>
                    </div>
                )}

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
