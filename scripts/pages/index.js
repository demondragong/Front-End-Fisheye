// get and return data about photographers from the json file
async function getPhotographers() {
    
    const photographers = await fetch("data/photographers.json")
                            .then(res => res.json())
                            .then(res => res.photographers)
                            .catch(err => console.log('an error occurs', err))
    return ({photographers: photographers})
}

// add photographers cards to the page
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM("square");
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // get photographers data
    const { photographers } = await getPhotographers();
    // add photographers cards to page
    displayData(photographers);
}

init();

