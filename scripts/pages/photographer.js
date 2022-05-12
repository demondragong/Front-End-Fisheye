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

// update photographer sticker
async function updatePhotographerSticker(photographer) {
    const photographerSticker = document.querySelector(".photographer__sticker");
    photographerSticker.textContent = photographer.price + "€ / jour";
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

async function init() {
    // get photographers data
    let params = (new URL(document.location)).searchParams;
    let urlId = params.get('id');
    console.log(urlId);

    // find photographer whose id matches
    const photographer = await getPhotographer(urlId);
    console.log(photographer);

    // add photographer card to page
    updatePhotographerData(photographer);
    updatePhotographerSticker(photographer);

    const { media } = await getMedia(urlId);
    displayData(media);
}

init();

