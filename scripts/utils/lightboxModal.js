function displayModal() {
    const modal = document.getElementById("lightbox_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("lightbox_modal");
    modal.style.display = "none";
}

// get DOM elements
const contactButton = document.getElementById("contact_button");
const modalCloseIcon = document.getElementById("close_modal");
const submitButton = document.getElementById("submit_button");

// event handlers
contactButton.addEventListener("click", displayModal);
modalCloseIcon.addEventListener("click", closeModal);
submitButton.addEventListener("click", submitModal);