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
    // try to get the previous element, if there is none i.e. the lightbox is showing the first media, then get the last element
    try {
        const previousMediaSrc = currentMedia.parentElement.previousSibling.firstChild.getAttribute("src");
        document.getElementById("lightbox_medium").setAttribute("src", previousMediaSrc);
    } catch {
        const lastMediaSrc = document.getElementsByClassName("media_section")[0].lastChild.firstChild.getAttribute("src");
        document.getElementById("lightbox_medium").setAttribute("src", lastMediaSrc);
    }
})