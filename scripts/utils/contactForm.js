// get DOM elements
const contactModal = document.getElementById("contact_modal");
const contactButton = document.getElementById("contact_button");
const modalCloseIcon = document.getElementById("close_modal");
const submitButton = document.getElementById("submit_button");
const ModalTabBarrierTop = document.getElementsByClassName("ModalTabBarrier")[0];
const ModalTabBarrierBottom = document.getElementsByClassName("ModalTabBarrier")[1];


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

function focusOnFirstname() {
    document.getElementById("fname").focus();
}

function focusOnExitButton() {
    document.getElementById("close_modal").focus();
}


// EVENT LISTENERS
contactButton.addEventListener("click", function() {
    displayModal(contactModal);
    focusOnFirstname();
});
modalCloseIcon.addEventListener("click", closeModal.bind(null, contactModal));
submitButton.addEventListener("click", submitModal);
contactModal.addEventListener("keydown", function(event) {
    if(event.key=='Escape') {
        closeModal(contactModal);
    }
});

// trap focus in contact modal
ModalTabBarrierTop.addEventListener("focus", focusOnExitButton);
ModalTabBarrierBottom.addEventListener("focus", focusOnFirstname);