// top level DOM elements
const header = document.querySelector("header");
const main = document.getElementById("main");
const photographerSticker = document.getElementsByClassName("photographer__sticker")[0];


// eslint-disable-next-line no-unused-vars
function displayModal(modal) {
    header.setAttribute("aria-hidden", "true");
    main.setAttribute("aria-hidden", "true");
    photographerSticker.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "hidden";
	modal.style.display = "grid";
}

// eslint-disable-next-line no-unused-vars
function closeModal(modal) {
    header.setAttribute("aria-hidden", "false");
    main.setAttribute("aria-hidden", "false");
    photographerSticker.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "auto";
    modal.style.display = "none";
}