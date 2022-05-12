// get photographer based on id from the json file
async function getPhotographer(id) {
    
    const photographer = await fetch("data/photographers.json")
                            .then(res => res.json())
                            .then(res => res.photographers.filter(photographer => photographer.id == id)[0])
                            .catch(err => console.log('an error occurs', err))
    return photographer
}

// add photographer card to the page
async function updatePhotographerData(photographer) {
    const photographerPageMain = document.getElementById("main");
    const photographerModel = photographerFactory(photographer);
    
    const userCardDOM = photographerModel.getUserCardDOM("horizontal");
    photographerPageMain.appendChild(userCardDOM);

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
}

init();

