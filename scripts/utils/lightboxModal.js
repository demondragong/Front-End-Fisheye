// get DOM elements
const mediaSection = document.getElementsByClassName("media_section")[0];
const lightboxModal = document.getElementById("lightbox_modal");
const lightboxCloseIcon = document.getElementById("lightbox_close");
const lightboxPreviousIcon = document.getElementById("lightbox_previous");
const lightboxNextIcon = document.getElementById("lightbox_next");
const lightboxMediumTitle = document.getElementById("lightbox_title");


// populate modal with clone of element to show and same title
function populateModal(elementToShow) {
    const medium = elementToShow.cloneNode();
    medium.id = "lightbox_medium";
    if (elementToShow.tagName == "VIDEO") {
        medium.controls = true;
    }
    lightboxModal.prepend(medium);
    lightboxMediumTitle.textContent = elementToShow.nextElementSibling.querySelector(".medium__title").textContent;
}

function focusOnMedium() {
    document.getElementById("lightbox_medium").focus();
}

// lightbox navigation functions
function showPreviousMedium() {
    const currentMediaSrc = document.getElementById("lightbox_medium").getAttribute("src");
    const currentMedia = document.querySelector(`.media_section [src='${currentMediaSrc}']`);
    const mediaCollection = document.querySelectorAll(".media_section .medium__img");
    const mediumIndex = [...mediaCollection].indexOf(currentMedia);
    let newMedium;
    // if this is not the first element in the collection get the previous one, if it is the first get the last one
    if (mediumIndex > 0) {
        newMedium = mediaCollection[mediumIndex - 1];
    } else {
        newMedium = mediaCollection[mediaCollection.length -1];
    }
    // delete element that was shown in the lightbox
    document.getElementById("lightbox_medium").remove();
    populateModal(newMedium);
}

function showNextMedium() {
    const currentMediaSrc = document.getElementById("lightbox_medium").getAttribute("src");
    const currentMedia = document.querySelector(`.media_section [src='${currentMediaSrc}']`);
    const mediaCollection = document.querySelectorAll(".media_section .medium__img");
    const mediumIndex = [...mediaCollection].indexOf(currentMedia);
    let newMedium;
    // if this is not the last element in the collection get the next one, if it is the last get the first one
    if (mediumIndex < mediaCollection.length - 1) {
        newMedium = mediaCollection[mediumIndex + 1];
    } else {
        newMedium = mediaCollection[0];
    }
    // delete element that was shown in the lightbox
    document.getElementById("lightbox_medium").remove();
    populateModal(newMedium);
}

// function to handle modal keyboard navigation
function handleKeyboardNav(event) {
    switch (event.key) {
        case 'Escape':
            closeModal(lightboxModal);
            document.getElementById("lightbox_medium").remove();
            document.removeEventListener("keydown", handleKeyboardNav);
            break;
        case 'ArrowLeft':
            showPreviousMedium();
            break;
        case 'ArrowRight':
            showNextMedium();
            break;
        default:
            break;
    }
}


// EVENT LISTENERS
// navigate in and close the lightbox carousel - with the mouse
lightboxCloseIcon.addEventListener("click", function() {
    closeModal(lightboxModal);
    document.getElementById("lightbox_medium").remove();
    document.removeEventListener("keydown", handleKeyboardNav);   
});
lightboxPreviousIcon.addEventListener("click", showPreviousMedium);
lightboxNextIcon.addEventListener("click", showNextMedium);


// handle lightbox opening when user clicks on a picture
mediaSection.addEventListener("click", function(event) {
    let target = event.target;
    // show modal if the user clicked on an image
    if(target.className == 'medium__img') {
        // clone the element the user clicked into the modal
        populateModal(target);
        displayModal(lightboxModal);
        focusOnMedium();
        // event handlers to navigate in an close the  lightbox carousel - with keyboard
        document.addEventListener("keydown", handleKeyboardNav)
    }
})

// handle lightbox opening when user presses enter while focusing on a picture
mediaSection.addEventListener("keydown", function(event) {
    if(event.key == 'Enter') {
        // clone the element the user pressed enter on into the modal
        populateModal(document.activeElement);
        displayModal(lightboxModal);
        focusOnMedium();
        // event handlers to navigate in an close the  lightbox carousel - with keyboard
        document.addEventListener("keydown", handleKeyboardNav)
    }
})
