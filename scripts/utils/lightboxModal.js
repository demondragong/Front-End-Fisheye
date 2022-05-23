// get lightbox DOM elements
const lightboxModal = document.getElementById("lightbox_modal");
const lightboxCloseIcon = document.getElementById("lightbox_close");
const lightboxPreviousIcon = document.getElementById("lightbox_previous");
const lightboxNextIcon = document.getElementById("lightbox_next");
const lightboxMediumTitle = document.getElementById("lightbox_title");


// handle lightbox opening when user clicks on a picture
const mediaSection = document.getElementsByClassName("media_section")[0];
mediaSection.addEventListener("click", function(event) {
    let target = event.target;
    // show modal if the user clicked on an image
    if(target.className == 'medium__img') {
        // clone the element the user clicked into the modal
        const medium = target.cloneNode();
        medium.id = "lightbox_medium";
        lightboxModal.prepend(medium);
        lightboxMediumTitle.textContent = target.nextElementSibling.querySelector(".medium__title").textContent;
        displayModal(lightboxModal);
    }
})

// handle lightbox opening when user presses enter while focusing on a picture
mediaSection.addEventListener("keydown", function(event) {
    if(event.key == 'Enter') {
        // clone the element the user pressed enter on into the modal
        const medium = document.activeElement.cloneNode();
        medium.id = "lightbox_medium";
        lightboxModal.prepend(medium);
        lightboxMediumTitle.textContent = document.activeElement.nextElementSibling.querySelector(".medium__title").textContent;
        displayModal(lightboxModal);
    }
})

// lightbox navigation functions
function showPreviousMedium() {
    const currentMediaSrc = document.getElementById("lightbox_medium").getAttribute("src");
    const currentMedia = document.querySelector(`.media_section [src='${currentMediaSrc}']`);
    const mediaCollection = document.querySelectorAll(".media_section .medium__img");
    const mediumIndex = [...mediaCollection].indexOf(currentMedia);
    let newMedium;
    // if this is not the first element in the collection get the previous one, if it is the first get the last one
    if (mediumIndex > 0) {
        newMedium = mediaCollection[mediumIndex - 1].cloneNode();
        lightboxMediumTitle.textContent = mediaCollection[mediumIndex - 1].nextElementSibling.querySelector(".medium__title").textContent;
    } else {
        newMedium = mediaCollection[mediaCollection.length -1].cloneNode();
        lightboxMediumTitle.textContent = mediaCollection[mediaCollection.length -1].nextElementSibling.querySelector(".medium__title").textContent;
    }
    // delete element that was shown in the lightbox
    document.getElementById("lightbox_medium").remove();
    // prepend new element
    newMedium.id = "lightbox_medium";
    lightboxModal.prepend(newMedium);
}

function showNextMedium() {
    const currentMediaSrc = document.getElementById("lightbox_medium").getAttribute("src");
    const currentMedia = document.querySelector(`.media_section [src='${currentMediaSrc}']`);
    const mediaCollection = document.querySelectorAll(".media_section .medium__img");
    const mediumIndex = [...mediaCollection].indexOf(currentMedia);
    let newMedium;
    // if this is not the last element in the collection get the next one, if it is the last get the first one
    if (mediumIndex < mediaCollection.length - 1) {
        newMedium = mediaCollection[mediumIndex + 1].cloneNode();
        lightboxMediumTitle.textContent = mediaCollection[mediumIndex + 1].nextElementSibling.querySelector(".medium__title").textContent;
    } else {
        newMedium = mediaCollection[0].cloneNode();
        lightboxMediumTitle.textContent = mediaCollection[0].nextElementSibling.querySelector(".medium__title").textContent;
    }
    // delete element that was shown in the lightbox
    document.getElementById("lightbox_medium").remove();
    // prepend new element
    newMedium.id = "lightbox_medium";
    lightboxModal.prepend(newMedium);
}

// event handlers to navigate in an close the  lightbox carousel - on click
lightboxCloseIcon.addEventListener("click", closeModal.bind(null, lightboxModal));
lightboxPreviousIcon.addEventListener("click", showPreviousMedium);
lightboxNextIcon.addEventListener("click", showNextMedium);

// // event handlers to navigate in an close the  lightbox carousel - with keyboard
// document.addEventListener("keydown", function(event) {
//     switch (event.key) {
//         case 'Escape':
//             closeModal(lightboxModal);
//             break;
//         case 'ArrowLeft':
//             showPreviousMedium();
//             break;
//         case 'ArrowRight':
//             showNextMedium();
//             break;
//         default:
//             break;
//     }
// })

