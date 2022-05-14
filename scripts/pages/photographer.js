// get photographer based on id from the json file
async function getPhotographer(id) {
    
    const photographer = await fetch("data/photographers.json")
                            .then(res => res.json())
                            .then(res => res.photographers.filter(photographer => photographer.id == id)[0])
                            .catch(err => console.log('an error occurs', err))
    return photographer
}

// get and return data about media from the json file
async function getMedia(id) {
    
    const media = await fetch("data/photographers.json")
                            .then(res => res.json())
                            .then(res => res.media.filter(medium => medium.photographerId == id))
                            .catch(err => console.log('an error occurs', err))
    return ({media: media})
}

// add photographer card to the page
async function updatePhotographerData(photographer) {
    const photographerPageMain = document.getElementById("main");
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM("horizontal");
    photographerPageMain.prepend(userCardDOM);
}

// add media cards to the page
async function displayData(media) {
    const mediaSection = document.querySelector(".media_section");

    media.forEach((medium) => {
        const mediaModel = mediaFactory(medium);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        mediaSection.appendChild(mediaCardDOM);
    });
}

// count total likes
function getTotalLikes(media) {
    let totalLikes = 0;

    media.forEach((medium) => {
        totalLikes += medium.likes;
    });

    return totalLikes
}

// update photographer sticker
async function updatePhotographerSticker(photographer, media) {
    const photographerSticker = document.querySelector(".photographer__sticker");

    const totalLikes = document.createElement('span');
    totalLikes.id = "total-likes";
    totalLikes.textContent = getTotalLikes(media);

    // medium heart button
    const likeButton = document.createElement('img');
    likeButton.className = "total-like-button";
    likeButton.setAttribute("src", "assets/icons/heart.svg");
    likeButton.setAttribute("alt", "");

    const dailyRate = document.createElement('span');
    dailyRate.id = "daily-rate";
    dailyRate.textContent = `${photographer.price}€ / jour`;

    photographerSticker.append(totalLikes, likeButton, dailyRate);
}

// update modal with name of photographer
async function updateModalName(photographer) {
    const modalH2 = document.querySelector(".modal h2");
    const lineBreak = document.createElement("br");
    modalH2.append(lineBreak, photographer.name);
}

// increment like counters
function incrementCounter() {
    const totalLikes = document.getElementById("total-likes");
    totalLikes.textContent = parseInt(totalLikes.textContent) + 1;
}

// function to run on page load
async function init() {
    // get photographer whose id matches the url
    let params = (new URL(document.location)).searchParams;
    let urlId = params.get('id');
    const photographer = await getPhotographer(urlId);

    // add photographer card to page
    updatePhotographerData(photographer);

    // add photographer media
    const { media } = await getMedia(urlId);
    displayData(media);

    // add sticker with price and total likes
    updatePhotographerSticker(photographer, media);
    updateModalName(photographer);

    // handle likes incrementation when user clicks on hearts below pictures
    const mediaSection = document.getElementsByClassName("media_section")[0];
    mediaSection.addEventListener("click", function(event) {
        let target = event.target;

        // increment counters if the element clicked is a like button that the user hasn't clicked already
        if(target.className == 'like-button' && target.getAttribute("already-liked") != "true") { 

            // increment media likes
            const mediaLikes = target.previousSibling;
            mediaLikes.textContent = parseInt(mediaLikes.textContent) + 1;

            // increment total likes
            const totalLikes = document.getElementById("total-likes");
            totalLikes.textContent = parseInt(totalLikes.textContent) + 1;

            target.setAttribute("already-liked", "true");
        }
    });

}

init();