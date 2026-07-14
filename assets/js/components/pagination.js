import { state } from "../core/state.js";
import { render } from "../main.js";
import { updateRoute } from "../core/router.js";

export function renderPagination(totalItems) {

    const navigation =
        document.getElementById("pagination");

    navigation.replaceChildren();

    const totalPages =
        Math.max(
            1,
            Math.ceil(totalItems / state.pageSize)
        );

    if (state.currentPage > totalPages) {
        state.currentPage = totalPages;
    }

    navigation.appendChild(
        createButton(
            "←",
            state.currentPage - 1,
            state.currentPage === 1
        )
    );

    for (
        let page = 1;
        page <= totalPages;
        page++
    ) {

        navigation.appendChild(
            createButton(
                page,
                page,
                false,
                page === state.currentPage
            )
        );

    }

    navigation.appendChild(
        createButton(
            "→",
            state.currentPage + 1,
            state.currentPage === totalPages
        )
    );

}

function createButton(
    label,
    page,
    disabled,
    active = false
) {

    const button =
        document.createElement("button");

    button.type = "button";

    button.textContent = label;

    button.disabled = disabled;

    if (active) {
        button.classList.add("is-active");
    }

    button.addEventListener(
        "click",
        () => {

            state.currentPage = page;

            updateRoute();

            render();

        }
    );

    return button;

}