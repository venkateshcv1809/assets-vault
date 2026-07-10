/**
 * Assets Vault
 *
 * Personal asset explorer.
 */

'use strict';

document.addEventListener('DOMContentLoaded', initializeApplication);

/* ==========================================================
 * Application
 * ========================================================== */

function initializeApplication() {
    initializeSidebar();
    initializeSearch();

    console.info('Assets Vault initialized.');
}

/* ==========================================================
 * Sidebar
 * ========================================================== */

function initializeSidebar() {
    const items = document.querySelectorAll('.sidebar-item');

    items.forEach((item) => {
        item.addEventListener('click', () => {

            items.forEach((button) => {
                button.classList.remove('is-active');
            });

            item.classList.add('is-active');
        });
    });
}

/* ==========================================================
 * Search
 * ========================================================== */

function initializeSearch() {
    const search = document.querySelector('.app-search');

    search.addEventListener('input', (event) => {
        console.log(`Searching: ${event.target.value}`);
    });
}