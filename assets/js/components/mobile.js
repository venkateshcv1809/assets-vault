const MOBILE_WIDTH = 700;

export function initializeMobile() {
    const toggle = document.getElementById("sidebar-toggle");
    const sidebar = document.getElementById("sidebar-panel");

    if (!toggle || !sidebar) {
        return;
    }

    toggle.addEventListener("click", () => {
        sidebar.classList.toggle("is-open");
    });
    document.addEventListener("click", event => {
        if (window.innerWidth > MOBILE_WIDTH) {
            return;
        }
        if (
            sidebar.contains(event.target) ||
            toggle.contains(event.target)
        ) {
            return;
        }
        sidebar.classList.remove("is-open");
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > MOBILE_WIDTH) {
            sidebar.classList.remove("is-open");
        }
    });

}