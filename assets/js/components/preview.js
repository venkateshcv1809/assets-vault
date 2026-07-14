import { state } from "../core/state.js";
import { updateRoute } from "../core/router.js";
import { renderAsset } from "./renderers.js";

export function renderPreview() {
    const previewContainer = document.getElementById("asset-preview");
    const panel = document.querySelector(".app-preview");
    previewContainer.replaceChildren();
    if (!state.selectedAsset) {
        panel.classList.remove("is-open");
        previewContainer.appendChild(createEmptyPreview());
        updateRoute();
        return;
    } else {
        panel.classList.add("is-open");
    }

    updateRoute();
    const container = document.createElement("div");
    container.className = "preview";
    container.appendChild(renderAsset(state.selectedAsset));
    container.appendChild(createInformation(state.selectedAsset));
    previewContainer.appendChild(container);
}

function createEmptyPreview() {
    const container = document.createElement("div");
    container.className = "preview-empty";
    container.innerHTML = `
        <h3>No asset selected</h3>
        <p>Select an asset from the explorer.</p>
    `;

    return container;
}

function createInformation(asset) {
    const section = document.createElement("section");
    section.className = "preview-information";
    section.innerHTML = `
        <h2>${asset.name}</h2>

        <table>
            <tr>
                <th>Category</th>
                <td>${asset.category}</td>
            </tr>

            <tr>
                <th>Source</th>
                <td>${asset.source}</td>
            </tr>

            <tr>
                <th>Extension</th>
                <td>${asset.extension}</td>
            </tr>

            <tr>
                <th>Renderer</th>
                <td>${asset.renderer}</td>
            </tr>

            <tr>
                <th>Path</th>
                <td>${asset.path}</td>
            </tr>
        </table>

        <div class="preview-actions">
            <a
                href="${asset.path}"
                target="_blank"
                rel="noopener">
                Open
            </a>

            <a
                href="${asset.path}"
                download>
                Download
            </a>
        </div>
    `;

    return section;
}