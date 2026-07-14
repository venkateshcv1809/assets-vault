import { state } from "../core/state.js";
import { updateRoute } from "../core/router.js";
import { render } from "../main.js";

export function initializeSearch() {
    const input = document.getElementById("search");
    input.value = state.searchQuery;
    input.addEventListener("input", () => {
        state.searchQuery =
            input.value.trim().toLowerCase();
        state.currentPage = 1;
        state.selectedAsset = null;
        updateRoute();
        render();
    });

}