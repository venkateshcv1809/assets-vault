import { state } from "./state.js";

export function loadRoute() {

    const params = new URLSearchParams(window.location.search);

    state.selectedCategory =
        params.get("category");

    state.searchQuery =
        params.get("search") ?? "";

    state.currentPage =
        Number(params.get("page") ?? 1);

}

export function updateRoute() {

    const params = new URLSearchParams();

    if (state.selectedCategory) {
        params.set(
            "category",
            state.selectedCategory
        );
    }

    if (state.searchQuery) {
        params.set(
            "search",
            state.searchQuery
        );
    }

    if (state.currentPage > 1) {
        params.set(
            "page",
            state.currentPage
        );
    }

    if (state.selectedAsset) {
        params.set(
            "asset",
            state.selectedAsset.id
        );
    }

    const url =
        `${location.pathname}?${params.toString()}`;

    history.replaceState(
        null,
        "",
        url
    );

}