import {
    state,
} from "../core/state.js";
import { render } from "../main.js";
import { updateRoute } from "../core/router.js";

export function renderSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.replaceChildren();
    sidebar.appendChild(
        createButton(
            "All",
            null,
            state.selectedCategory === null
        )
    );

    for (const category of state.catalog.categories) {
        sidebar.appendChild(
            createButton(
                `${category.name} (${category.count})`,
                category.id,
                category.id === state.selectedCategory
            )
        );
    }
}

function createButton(label, category, active) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "sidebar-item";
    button.textContent = label;
    button.classList.toggle("is-active", active);

    button.addEventListener("click", () => {
        state.selectedCategory = category;
        state.selectedAsset = null;
        document
            .getElementById("sidebar-panel")
            ?.classList.remove("is-open");
        state.currentPage = 1;
        updateRoute();
        render();
    });

    return button;
}