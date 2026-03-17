import React, { useEffect, useState } from 'react';
import './../css/ManagedImage.sass';

function ManagedImage({ src, fallbackSrc, alt, loading = 'lazy' }) {
    const [resolvedSrc, setResolvedSrc] = useState(src || fallbackSrc || '');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const primarySrc = src || '';
        const backupSrc = fallbackSrc || '';

        setResolvedSrc(primarySrc || backupSrc || '');
        setIsLoaded(false);

        const tryLoad = (source, onError) => {
            if (!source) {
                onError();
                return;
            }

            const image = new Image();

            image.onload = () => {
                if (!isMounted) {
                    return;
                }

                setResolvedSrc(source);
                setIsLoaded(true);
            };

            image.onerror = () => {
                if (!isMounted) {
                    return;
                }

                onError();
            };

            image.src = source;
        };

        tryLoad(primarySrc || backupSrc, () => {
            if (backupSrc && backupSrc !== primarySrc) {
                tryLoad(backupSrc, () => {
                    if (!isMounted) {
                        return;
                    }

                    setResolvedSrc(backupSrc || '');
                    setIsLoaded(true);
                });
                return;
            }

            setResolvedSrc(primarySrc || backupSrc || '');
            setIsLoaded(true);
        });

        return () => {
            isMounted = false;
        };
    }, [fallbackSrc, src]);

    return (
        <>
            {!isLoaded && (
                <div className="managed-image-loader" aria-hidden="true">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            )}
            {resolvedSrc && (
                <img
                    className={`managed-image${isLoaded ? ' is-loaded' : ''}`}
                    src={resolvedSrc}
                    alt={alt}
                    loading={loading}
                />
            )}
        </>
    );
}

export default ManagedImage;
