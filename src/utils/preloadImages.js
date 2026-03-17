const retainedImages = new Map();

export function preloadImages(sources) {
    sources.forEach((source) => {
        if (!source || retainedImages.has(source)) {
            return;
        }

        const image = new Image();
        image.src = source;

        const decodePromise = image.decode
            ? image.decode().catch(() => {})
            : Promise.resolve();

        retainedImages.set(source, { image, decodePromise });
    });
}
