function mediaFactory(data) {
    const { title, id, photographerId, image, video, likes } = data;
    
    const picture = image ? `assets/media/${photographerId}/${image}`
                           : `assets/media/${photographerId}/${video}`;

    function getMediaCardDOM() {
        let mediumPicture;
        if (image) {
            // medium image
            mediumPicture = document.createElement( 'img' );
            mediumPicture.className = "medium__img";
            mediumPicture.setAttribute("src", picture);
            mediumPicture.setAttribute("alt", title);
        } else {
            // medium video
            mediumPicture = document.createElement( 'video' );
            mediumPicture.className = "medium__img";
            // mediumPicture.setAttribute("preload", "none")
            // mediumPicture.controls = true;
            mediumPicture.setAttribute("src", picture);
            mediumPicture.setAttribute("alt", title);
        }
        
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
        container.append(mediumPicture, legend);

        return container
        
    }

    return { title, picture, getMediaCardDOM }
}

