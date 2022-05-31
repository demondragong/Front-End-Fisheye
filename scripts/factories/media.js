function mediaFactory(data) {
    const { title, id, photographerId, image, video, likes, date } = data;
    
    const picture = image ? `assets/media/${photographerId}/${image}`
                           : `assets/media/${photographerId}/${video}`;

    function getMediaCardDOM() {
        // create image or video element accordingly
        let mediumPicture;
        if (image) {
            mediumPicture = document.createElement( 'img' );
        } else {
            mediumPicture = document.createElement( 'video' );
        }
        mediumPicture.className = "medium__img";
        mediumPicture.setAttribute("src", picture);
        mediumPicture.setAttribute("alt", "");
        mediumPicture.tabIndex = 0;
        
        // medium title
        const mediumTitle = document.createElement( 'h2' );
        mediumTitle.classList = "medium__title";
        mediumTitle.textContent = title;
        
        // medium likes
        const mediumLikes = document.createElement( 'p' );
        mediumLikes.classList = "medium__likes";
        mediumLikes.textContent = likes;

        // medium heart button
        const likeButton = document.createElement('img');
        likeButton.className = "like-button";
        likeButton.setAttribute("src", "assets/icons/heart.svg");
        likeButton.setAttribute("alt", "");

        // medium legend
        const legend = document.createElement( 'div' );
        legend.className = "medium__legend";
        legend.append(mediumTitle, mediumLikes, likeButton);

        // create container and append all relevent
        const container = document.createElement( 'div' );
        container.className = "medium";
        container.id = id;
        container.setAttribute("data-medium-title", title);
        container.setAttribute("data-medium-likes", likes);
        container.setAttribute("data-medium-date", date);
        container.append(mediumPicture, legend);

        return container
        
    }

    return { title, picture, getMediaCardDOM }
}

