import {
    state,
    setSelectedAsset,
    setSelectedCategory,
} from "../core/state.js";
import { render } from "../main.js";

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
        setSelectedCategory(category);
        setSelectedAsset(null);
        render();
    });

    return button;
}