import { state } from "./core/state.js";
import { loadCatalog } from "./core/api.js";
import { initializeSearch } from "./components/search.js";
import { renderSidebar } from "./components/sidebar.js";
import { renderExplorer } from "./components/explorer.js";
import { renderPreview } from "./components/preview.js";

function render() {
    renderSidebar();
    renderExplorer();
    renderPreview();
}

function showError(error) {
    console.error(error);
    document.body.innerHTML = `
        <main class="application-error">
            <h1>Unable to load asset catalog</h1>
            <p>Please regenerate the catalog and refresh the page.</p>
        </main>
    `;
}

async function initializeApplication() {
    try {
        const catalog = await loadCatalog();
        state.catalog = catalog;
        initializeSearch();
        render();
    } catch (error) {
        showError(error);
    }
}

window.addEventListener(
    "DOMContentLoaded",
    () => {
        void initializeApplication();
    },
    { once: true }
);

export {
    render,
};