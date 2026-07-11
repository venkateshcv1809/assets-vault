import { setSearchQuery } from "../core/state.js";
import { render } from "../main.js";

export function initializeSearch() {
    const input = document.getElementById("search");
    input.addEventListener("input", handleSearchInput);
}

function handleSearchInput(event) {
    setSearchQuery(
        event.target.value.trim().toLowerCase()
    );
    render();
}