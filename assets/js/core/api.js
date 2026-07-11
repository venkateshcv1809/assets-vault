const INDEX_URL = "data/index.json";

export async function loadCatalog() {
    const response = await fetch(INDEX_URL);

    if (!response.ok) {
        throw new Error(`Failed to load "${INDEX_URL}".`);
    }

    return response.json();
}