const state = {
    catalog: null,
    selectedCategory: null,
    selectedAsset: null,
    searchQuery: "",
};

function resetState() {
    state.selectedCategory = null;
    state.selectedAsset = null;
    state.searchQuery = "";
}

function setCatalog(catalog) {
    state.catalog = catalog;
    resetState();
}

function setSelectedCategory(category) {
    state.selectedCategory = category;
}

function setSelectedAsset(asset) {
    state.selectedAsset = asset;
}

function setSearchQuery(query) {
    state.searchQuery = query.trim();
}

export {
    state,
    resetState,
    setCatalog,
    setSelectedCategory,
    setSelectedAsset,
    setSearchQuery,
};