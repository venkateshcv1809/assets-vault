/**
 * Asset renderers.
 */

const RENDERERS = {
    image: renderImage,
    svg: renderImage,
    font: renderFont,
    lottie: renderLottie,
};

export function renderAsset(asset, options = {}) {

    const renderer =
        RENDERERS[asset.renderer] ?? renderGeneric;

    return renderer(asset, options);

}

function renderImage(asset, { compact = false } = {}) {

    const image = document.createElement("img");

    image.src = asset.path;
    image.alt = asset.name;
    image.loading = "lazy";

    if (compact) {

        image.style.width = "72px";
        image.style.height = "72px";
        image.style.objectFit = "contain";

    }

    return image;

}

function renderFont(asset, { compact = false } = {}) {

    const family = asset.id.replace(/[^\w-]/g, "-");

    ensureFontFace(family, asset.path);

    const preview = document.createElement("div");

    preview.className = "font-preview";
    preview.style.fontFamily = family;

    if (compact) {

        preview.textContent = "Aa";
        preview.style.fontSize = "2rem";

        return preview;

    }

    preview.innerHTML = `
        <h2>${asset.name}</h2>

        <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>

        <p>abcdefghijklmnopqrstuvwxyz</p>

        <p>0123456789</p>

        <p>The quick brown fox jumps over the lazy dog.</p>
    `;

    return preview;

}

function ensureFontFace(family, path) {

    const id = `font-${family}`;

    if (document.getElementById(id)) {
        return;
    }

    const style = document.createElement("style");

    style.id = id;

    style.textContent = `
        @font-face {
            font-family: "${family}";
            src: url("${path}");
        }
    `;

    document.head.appendChild(style);

}

function renderLottie(asset, { compact = false } = {}) {

    const player = document.createElement("dotlottie-player");

    player.src = asset.path;

    player.autoplay = true;
    player.loop = true;

    if (compact) {

        player.style.width = "72px";
        player.style.height = "72px";

    } else {

        player.style.width = "240px";
        player.style.height = "240px";

    }

    return player;

}

function renderGeneric(asset, { compact = false } = {}) {

    if (compact) {

        const span = document.createElement("span");

        span.textContent = "📄";

        return span;

    }

    const preview = document.createElement("pre");

    preview.className = "preview-placeholder";

    preview.textContent = `Preview unavailable

Renderer : ${asset.renderer}
Extension : ${asset.extension}
Path      : ${asset.path}`;

    return preview;

}