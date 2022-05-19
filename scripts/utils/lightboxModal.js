// get lightbox DOM elements
const lightboxModal = document.getElementById("lightbox_modal");
const lightboxCloseIcon = document.getElementById("lightbox_close");
const lightboxPreviousIcon = document.getElementById("lightbox_previous");
const lightboxNextIcon = document.getElementById("lightbox_next");


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
        // document.getElementById("lightbox_image").setAttribute("src", target.getAttribute("src"));
        displayModal(lightboxModal);
    }
})

// event handlers to open close and navigate in lightbox carousel
lightboxCloseIcon.addEventListener("click", closeModal.bind(null, lightboxModal));

lightboxPreviousIcon.addEventListener("click", function() {
    
    const currentMediaSrc = document.getElementById("lightbox_medium").getAttribute("src");
    const currentMedia = document.querySelector(`.media_section [src='${currentMediaSrc}']`);
    const mediaCollection = document.querySelectorAll(".media_section .medium__img");

    const mediumIndex = [...mediaCollection].indexOf(currentMedia);

    let newMedium;
    // if this is not the first element in the collection get the previous one, if it is the first get the last one
    if (mediumIndex > 0) {
        newMedium = mediaCollection[mediumIndex - 1].cloneNode();
    } else {
        newMedium = mediaCollection[mediaCollection.length -1].cloneNode();
    }
    // delete element that was shown in the lightbox
    document.getElementById("lightbox_medium").remove();
    // prepend new element
    newMedium.id = "lightbox_medium";
    lightboxModal.prepend(newMedium);
})

lightboxNextIcon.addEventListener("click", function() {
    
    const currentMediaSrc = document.getElementById("lightbox_medium").getAttribute("src");
    const currentMedia = document.querySelector(`.media_section [src='${currentMediaSrc}']`);
    const mediaCollection = document.querySelectorAll(".media_section .medium__img");

    const mediumIndex = [...mediaCollection].indexOf(currentMedia);

    let newMedium;
    // if this is not the last element in the collection get the next one, if it is the last get the first one
    if (mediumIndex < mediaCollection.length - 1) {
        newMedium = mediaCollection[mediumIndex + 1].cloneNode();
    } else {
        newMedium = mediaCollection[0].cloneNode();
    }
    // delete element that was shown in the lightbox
    document.getElementById("lightbox_medium").remove();
    // prepend new element
    newMedium.id = "lightbox_medium";
    lightboxModal.prepend(newMedium);
})