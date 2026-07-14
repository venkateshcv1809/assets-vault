import { updateRoute } from "../core/router.js";
import {
    state,
    setSelectedAsset,
} from "../core/state.js";
import { render } from "../main.js";
import { renderPagination } from "./pagination.js";
import { renderAsset } from "./renderers.js";

function getAssets() {
    let assets = state.catalog.assets;
    if (state.selectedCategory) {
        assets = assets.filter(asset =>
            asset.category === state.selectedCategory
        );
    }

    if (state.searchQuery) {
        const query = state.searchQuery;
        assets = assets.filter(asset =>
            asset.name.toLowerCase().includes(query) ||
            asset.source.toLowerCase().includes(query)
        );
    }
    return assets;

}

export function renderExplorer() {
    const assets = getAssets();
    const grid = document.getElementById("asset-grid");
    grid.replaceChildren();
    const start = (state.currentPage - 1) * state.pageSize;

    const visible = assets.slice(
        start,
        start + state.pageSize
    );

    for (const asset of visible) {
        grid.appendChild(createAssetCard(asset));
    }

    renderPagination(
        assets.length
    );
}

function createAssetCard(asset) {
    const card = document.createElement("article");
    card.className = "asset-card";
    card.classList.toggle(
        "is-selected",
        state.selectedAsset?.id === asset.id
    );
    const preview = document.createElement("div");
    preview.className = "asset-card-preview";
    preview.appendChild(
        renderAsset(asset, {
            compact: true
        })
    );
    const name = document.createElement("div");
    name.className = "asset-card-name";
    name.textContent = asset.name;
    const source = document.createElement("div");
    source.className = "asset-card-source";
    source.textContent = asset.source;

    card.append(
        preview,
        name,
        source
    );

    card.addEventListener("click", () => {
        setSelectedAsset(asset);
        updateRoute();
        render();
    });

    return card;
}