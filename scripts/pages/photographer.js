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
    likeButton.setAttribute("alt", "likes");

    const dailyRate = document.createElement('span');
    dailyRate.id = "daily-rate";
    dailyRate.textContent = `${photographer.price}€ / jour`;

    photographerSticker.append(totalLikes, likeButton, dailyRate);
}

// update modal with name of photographer
async function updateModalName(photographer) {
    const modalTitle = document.getElementById("modalTitle");
    const lineBreak = document.createElement("br");
    modalTitle.append(lineBreak, photographer.name);
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



    // media sorting (by number of likes, date and title)
    const sortButton = document.getElementById("sort-button");
    const sortList = document.getElementById("sort-list")

    function showListbox() {
        sortList.classList.toggle("hidden");
        sortButton.classList.toggle("hidden");
        sortButton.setAttribute("aria-expanded", "true");
      }
      
    function hideListbox() {
        sortList.classList.toggle("hidden");
        sortButton.classList.toggle("hidden");
        sortButton.removeAttribute("aria-expanded");
      }


    sortButton.addEventListener("click", showListbox);

    // media sorting with click
    sortList.addEventListener("click", function(event) {
        // change l'ordre des media sur la page
        sortMedia(event.target.id);
        // change le texte visible sur le bouton
        sortButton.textContent=event.target.textContent;
        // puts the selected criteria at the top of the list
        sortList.prepend(document.getElementById(event.target.id));
        // hide list and show button
        hideListbox();
    })

    // media sorting with keyboard
    sortList.addEventListener("keydown", function(event) {
        if(event.key == 'Enter') {
            // change l'ordre des media sur la page
            sortMedia(document.activeElement.id);
            // change le texte visible sur le bouton
            sortButton.textContent=document.activeElement.textContent;
            // puts the selected criteria at the top of the list
            sortList.prepend(document.getElementById(document.activeElement.id));
            // hide list and show button
            hideListbox();
        } else if (event.key == 'Escape') {
            hideListbox();
        }
    })

    function sortMedia(sortingCriteria) {
        var list = document.querySelector('.media_section');
        [...list.children]
            .sort((a,b)=> {
                switch(sortingCriteria) {
                    case 'sortbylikes':
                        return b.dataset.mediumLikes - a.dataset.mediumLikes;
                    case 'sortbydate':
                        return a.dataset.mediumDate>b.dataset.mediumDate?1:-1;
                    case 'sortbytitle':
                        return a.dataset.mediumTitle>b.dataset.mediumTitle?1:-1;
                    default:
                        console.log('Sort criteria not known')
                }
            })
            .forEach(node=>list.appendChild(node));
    }



    // CONTACT MODAL
    // event listeners to trap focus in contact modal
    const ModalTabBarrierTop = document.getElementsByClassName("ModalTabBarrier")[0];
    ModalTabBarrierTop.addEventListener("focus", function() {
            document.getElementById("close_modal").focus();
        })

    const ModalTabBarrierBottom = document.getElementsByClassName("ModalTabBarrier")[1];
    ModalTabBarrierBottom.addEventListener("focus", function() {
            document.getElementById("fname").focus();
        })

}

init();


