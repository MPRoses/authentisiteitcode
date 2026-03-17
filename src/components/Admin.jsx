import React, { useEffect, useMemo, useRef, useState } from 'react';
import './../css/Admin.sass';

import { isSupabaseConfigured } from '../lib/supabase';
import {
    deletePostAdmin,
    getAdminSession,
    getAllPostsAdmin,
    savePostAdmin,
    signInAdmin,
    signOutAdmin,
    subscribeToAdminAuth,
    uploadPostImage,
} from '../services/adminBlogService';

function slugifyValue(value) {
    return value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function createEmptyPost() {
    return {
        id: '',
        slug: '',
        title: '',
        excerpt: '',
        contentText: '',
        imageUrl: '',
        dateLabel: '',
        readTime: '',
        sortOrder: 0,
        published: false,
    };
}

function mapPostToForm(post) {
    return {
        id: post.id,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        contentText: Array.isArray(post.content) ? post.content.join('\n\n') : '',
        imageUrl: post.imageUrl,
        dateLabel: post.dateLabel,
        readTime: post.readTime,
        sortOrder: post.sortOrder ?? 0,
        published: Boolean(post.published),
    };
}

function Admin() {
    const [session, setSession] = useState(null);
    const [isBooting, setIsBooting] = useState(true);
    const [posts, setPosts] = useState([]);
    const [selectedPostId, setSelectedPostId] = useState('new');
    const [formState, setFormState] = useState(createEmptyPost());
    const [newPostDraft, setNewPostDraft] = useState(createEmptyPost());
    const [authForm, setAuthForm] = useState({ email: '', password: '' });
    const [authError, setAuthError] = useState('');
    const [saveMessage, setSaveMessage] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadedImageName, setUploadedImageName] = useState('');
    const [newPostImageName, setNewPostImageName] = useState('');
    const selectedPostIdRef = useRef(selectedPostId);
    const newPostDraftRef = useRef(newPostDraft);
    const newPostImageNameRef = useRef(newPostImageName);

    useEffect(() => {
        selectedPostIdRef.current = selectedPostId;
    }, [selectedPostId]);

    useEffect(() => {
        newPostDraftRef.current = newPostDraft;
    }, [newPostDraft]);

    useEffect(() => {
        newPostImageNameRef.current = newPostImageName;
    }, [newPostImageName]);

    useEffect(() => {
        if (!isSupabaseConfigured) {
            setIsBooting(false);
            return undefined;
        }

        let isMounted = true;

        getAdminSession()
            .then((nextSession) => {
                if (isMounted) {
                    setSession(nextSession);
                    setIsBooting(false);
                }
            })
            .catch((error) => {
                console.error('Failed to read Supabase session:', error);
                if (isMounted) {
                    setIsBooting(false);
                }
            });

        const subscription = subscribeToAdminAuth((nextSession) => {
            setSession(nextSession);
        });

        return () => {
            isMounted = false;
            subscription.unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (!session) {
            setPosts([]);
            setSelectedPostId('new');
            setFormState(createEmptyPost());
            setNewPostDraft(createEmptyPost());
            setUploadedImageName('');
            setNewPostImageName('');
            return;
        }

        let isMounted = true;

        getAllPostsAdmin()
            .then((nextPosts) => {
                if (!isMounted) {
                    return;
                }

                setPosts(nextPosts);

                if (selectedPostIdRef.current === 'new') {
                    return;
                }

                if (nextPosts.length === 0) {
                    setSelectedPostId('new');
                    setFormState(newPostDraftRef.current);
                    setUploadedImageName(newPostImageNameRef.current);
                    return;
                }

                const matchingPost = nextPosts.find((post) => post.id === selectedPostIdRef.current) ?? nextPosts[0];
                setSelectedPostId(matchingPost.id);
                setFormState(mapPostToForm(matchingPost));
                setUploadedImageName('');
            })
            .catch((error) => {
                console.error('Failed to load admin posts:', error);
                if (isMounted) {
                    setSaveMessage('Posts laden is mislukt.');
                }
            });

        return () => {
            isMounted = false;
        };
    }, [session]);

    const selectedPost = useMemo(
        () => posts.find((post) => post.id === selectedPostId) ?? null,
        [posts, selectedPostId]
    );

    const updateFormState = (updater) => {
        setFormState((currentValue) => {
            const nextValue = typeof updater === 'function' ? updater(currentValue) : updater;

            if (selectedPostIdRef.current === 'new') {
                setNewPostDraft(nextValue);
            }

            return nextValue;
        });
    };

    const handleSelectPost = (postId) => {
        if (postId === 'new') {
            setSelectedPostId('new');
            setFormState(newPostDraft);
            setUploadedImageName(newPostImageName);
            setSaveMessage('');
            return;
        }

        const nextPost = posts.find((post) => post.id === postId);

        if (!nextPost) {
            return;
        }

        if (selectedPostIdRef.current === 'new') {
            setNewPostDraft(formState);
            setNewPostImageName(uploadedImageName);
        }

        setSelectedPostId(postId);
        setFormState(mapPostToForm(nextPost));
        setUploadedImageName('');
        setSaveMessage('');
    };

    const handleAuthSubmit = async (event) => {
        event.preventDefault();
        setAuthError('');

        try {
            await signInAdmin(authForm.email, authForm.password);
        } catch (error) {
            setAuthError(error.message || 'Inloggen is mislukt.');
        }
    };

    const handleSave = async (event) => {
        event.preventDefault();
        setIsSaving(true);
        setSaveMessage('');

        try {
            const savedPost = await savePostAdmin({
                id: formState.id || undefined,
                slug: formState.slug.trim(),
                title: formState.title.trim(),
                excerpt: formState.excerpt.trim(),
                content: formState.contentText
                    .split('\n')
                    .map((line) => line.trim())
                    .filter(Boolean),
                imageUrl: formState.imageUrl.trim(),
                dateLabel: formState.dateLabel.trim(),
                readTime: formState.readTime.trim(),
                sortOrder: Number(formState.sortOrder) || 0,
                published: formState.published,
            });

            const nextPosts = await getAllPostsAdmin();
            setPosts(nextPosts);
            setSelectedPostId(savedPost.id);
            setFormState(mapPostToForm(savedPost));
            setNewPostDraft(createEmptyPost());
            setNewPostImageName('');
            setUploadedImageName('');
            setSaveMessage('Opgeslagen.');
        } catch (error) {
            setSaveMessage(error.message || 'Opslaan is mislukt.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        setIsUploading(true);
        setSaveMessage('');

        try {
            const publicUrl = await uploadPostImage(file, formState.slug || formState.title);
            updateFormState((currentValue) => ({
                ...currentValue,
                imageUrl: publicUrl,
            }));
            setUploadedImageName(file.name);
            if (selectedPostIdRef.current === 'new') {
                setNewPostImageName(file.name);
            }
            setSaveMessage('Afbeelding geupload. Vergeet niet op te slaan.');
        } catch (error) {
            setSaveMessage(error.message || 'Uploaden van afbeelding is mislukt.');
        } finally {
            setIsUploading(false);
            event.target.value = '';
        }
    };

    const handleDelete = async () => {
        if (!selectedPost) {
            return;
        }

        const hasConfirmed = window.confirm(`Weet je het zeker? "${selectedPost.title}" wordt definitief verwijderd.`);

        if (!hasConfirmed) {
            return;
        }

        setIsDeleting(true);
        setSaveMessage('');

        try {
            await deletePostAdmin(selectedPost.id);
            const nextPosts = await getAllPostsAdmin();

            setPosts(nextPosts);
            setUploadedImageName('');

            if (nextPosts.length === 0) {
                setSelectedPostId('new');
                setFormState(createEmptyPost());
            } else {
                setSelectedPostId(nextPosts[0].id);
                setFormState(mapPostToForm(nextPosts[0]));
            }

            setSaveMessage('Blogartikel verwijderd.');
        } catch (error) {
            setSaveMessage(error.message || 'Verwijderen is mislukt.');
        } finally {
            setIsDeleting(false);
        }
    };

    if (!isSupabaseConfigured) {
        return (
            <section className="admin-page">
                <div className="admin-shell">
                    <h1>Admin</h1>
                    <p>Supabase is nog niet volledig geconfigureerd. Voeg de URL en anon key toe via `.env.local`.</p>
                </div>
            </section>
        );
    }

    if (isBooting) {
        return null;
    }

    if (!session) {
        return (
            <section className="admin-page">
                <div className="admin-shell admin-auth-shell">
                    <h1>Admin</h1>
                    <p>Log in met je Supabase account om blogartikelen te beheren.</p>

                    <form className="admin-auth-form" onSubmit={handleAuthSubmit}>
                        <label>
                            <span>E-mail</span>
                            <input
                                type="email"
                                value={authForm.email}
                                onChange={(event) => setAuthForm((currentValue) => ({
                                    ...currentValue,
                                    email: event.target.value,
                                }))}
                                required
                            />
                        </label>

                        <label>
                            <span>Wachtwoord</span>
                            <input
                                type="password"
                                value={authForm.password}
                                onChange={(event) => setAuthForm((currentValue) => ({
                                    ...currentValue,
                                    password: event.target.value,
                                }))}
                                required
                            />
                        </label>

                        {authError && <div className="admin-message is-error">{authError}</div>}

                        <button className="admin-primary-button" type="submit">
                            Inloggen
                        </button>
                    </form>
                </div>
            </section>
        );
    }

    return (
        <section className="admin-page">
            <div className="admin-shell">
                <div className="admin-header">
                    <div>
                        <div className="admin-eyebrow">Beheer</div>
                        <h1>Blogbeheer</h1>
                    </div>

                    <button className="admin-secondary-button" type="button" onClick={signOutAdmin}>
                        Uitloggen
                    </button>
                </div>

                <div className="admin-layout">
                    <aside className="admin-sidebar">
                        <button
                            className={`admin-post-list-item${selectedPostId === 'new' ? ' is-active' : ''}`}
                            type="button"
                            onClick={() => handleSelectPost('new')}
                        >
                            Nieuw blogartikel
                        </button>

                        {posts.map((post) => (
                            <button
                                key={post.id}
                                className={`admin-post-list-item${selectedPostId === post.id ? ' is-active' : ''}`}
                                type="button"
                                onClick={() => handleSelectPost(post.id)}
                            >
                                <span>{post.title}</span>
                                <small>{post.slug}</small>
                            </button>
                        ))}
                    </aside>

                    <div className="admin-editor">
                        <form className="admin-form" onSubmit={handleSave}>
                            <div className="admin-form-grid">
                                <label className="admin-field admin-field-full">
                                    <span>Titel</span>
                                    <input
                                        type="text"
                                        value={formState.title}
                                        onChange={(event) => updateFormState((currentValue) => ({
                                            ...currentValue,
                                            title: event.target.value,
                                            slug: slugifyValue(event.target.value),
                                        }))}
                                        required
                                    />
                                </label>

                                <label className="admin-field">
                                    <span>URL</span>
                                    <input
                                        type="text"
                                        value={formState.slug}
                                        readOnly
                                    />
                                    <small>Wordt automatisch gemaakt vanuit de titel.</small>
                                </label>

                                <label className="admin-field">
                                    <span>Leestijd</span>
                                    <input
                                        type="text"
                                        value={formState.readTime}
                                        onChange={(event) => updateFormState((currentValue) => ({
                                            ...currentValue,
                                            readTime: event.target.value,
                                        }))}
                                    />
                                </label>

                                <label className="admin-field">
                                    <span>Datum</span>
                                    <input
                                        type="text"
                                        value={formState.dateLabel}
                                        onChange={(event) => updateFormState((currentValue) => ({
                                            ...currentValue,
                                            dateLabel: event.target.value,
                                        }))}
                                    />
                                </label>

                                <label className="admin-field">
                                    <span>Sorteervolgorde</span>
                                    <input
                                        type="number"
                                        value={formState.sortOrder}
                                        onChange={(event) => updateFormState((currentValue) => ({
                                            ...currentValue,
                                            sortOrder: event.target.value,
                                        }))}
                                    />
                                </label>

                                <label className="admin-field admin-field-full">
                                    <span>Korte intro</span>
                                    <textarea
                                        rows="3"
                                        value={formState.excerpt}
                                        onChange={(event) => updateFormState((currentValue) => ({
                                            ...currentValue,
                                            excerpt: event.target.value,
                                        }))}
                                    />
                                </label>

                                <label className="admin-field admin-field-full">
                                    <span>Upload afbeelding</span>
                                    <input type="file" accept="image/*" onChange={handleImageUpload} />
                                    {uploadedImageName && <small>Geuploade afbeelding: {uploadedImageName}</small>}
                                </label>

                                <label className="admin-field admin-field-full">
                                    <span>Inhoud</span>
                                    <textarea
                                        rows="18"
                                        value={formState.contentText}
                                        onChange={(event) => updateFormState((currentValue) => ({
                                            ...currentValue,
                                            contentText: event.target.value,
                                        }))}
                                    />
                                    <small>Zet elke paragraaf op een nieuwe regel. Lege regels worden genegeerd.</small>
                                </label>

                                <label className="admin-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={formState.published}
                                        onChange={(event) => updateFormState((currentValue) => ({
                                            ...currentValue,
                                            published: event.target.checked,
                                        }))}
                                    />
                                    <span>Gepubliceerd</span>
                                </label>
                            </div>

                            {saveMessage && <div className="admin-message">{saveMessage}</div>}

                            <div className="admin-actions">
                                <button className="admin-primary-button" type="submit" disabled={isSaving}>
                                    {isSaving ? 'Opslaan...' : 'Opslaan'}
                                </button>

                                <button
                                    className="admin-danger-button"
                                    type="button"
                                    onClick={handleDelete}
                                    disabled={!selectedPost || isDeleting}
                                >
                                    {isDeleting ? 'Verwijderen...' : 'Verwijderen'}
                                </button>

                                {isUploading && <span className="admin-uploading">Afbeelding uploaden...</span>}
                                {selectedPost && <span className="admin-selected-slug">Actieve URL: {selectedPost.slug}</span>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Admin;
