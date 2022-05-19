// top level DOM elements
const header = document.querySelector("header");
const main = document.getElementById("main");
const photographerSticker = document.getElementsByClassName("photographer__sticker")[0];
const contactModal = document.getElementById("contact_modal");

function displayModal(modal) {
    header.setAttribute("aria-hidden", "true");
    main.setAttribute("aria-hidden", "true");
    photographerSticker.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "hidden"; // ADD THIS LINE
	modal.style.display = "grid";
    if (modal.id == "contact_modal") {
        document.getElementById("fname").focus();
    }
}

function closeModal(modal) {
    header.setAttribute("aria-hidden", "false");
    main.setAttribute("aria-hidden", "false");
    photographerSticker.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "auto"; // ADD THIS LINE
    modal.style.display = "none";
    if (modal.id == "lightbox_modal") {
        document.getElementById("lightbox_medium").remove();
    }
}

// for this exercise, submitting the modal is equivalent to showing the field values in the console and clearing them
function submitModal(e) {
    e.preventDefault();
    console.log(document.getElementById("fname").value);
    console.log(document.getElementById("lname").value);
    console.log(document.getElementById("email").value);
    console.log(document.getElementById("message").value);
    closeModal(contactModal);

    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
}

// get form DOM elements
const contactButton = document.getElementById("contact_button");
const modalCloseIcon = document.getElementById("close_modal");
const submitButton = document.getElementById("submit_button");

// event handlers
contactButton.addEventListener("click", displayModal.bind(null, contactModal));
modalCloseIcon.addEventListener("click", closeModal.bind(null, contactModal));
submitButton.addEventListener("click", submitModal);