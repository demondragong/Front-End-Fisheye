function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM(type) {

        // image
        const img = document.createElement( 'img' );
        img.className = "photographer__img";
        img.setAttribute("src", picture);
        img.setAttribute("alt", name)
        
        // photographer's name
        const h2 = document.createElement( 'h2' );
        h2.classList = "photographer__name"
        h2.textContent = name;

        // photographer's location : city, country
        const locationString = city + ", " + country;
        const location = document.createElement( 'p' );
        location.classList = "photographer__location"
        location.textContent = locationString;
        
        // photographer's quote
        const quote = document.createElement( 'p' );
        quote.classList = "photographer__tagline"
        quote.textContent = tagline;
        
        // photographer's daily rate
        const dailyRateString = price + "€/jour";
        const dailyRate = document.createElement( 'p' );
        dailyRate.classList = "photographer__rate"
        dailyRate.textContent = dailyRateString;
        

        if (type=="square") {

            // link to photographer page
            const a = document.createElement( 'a' );
            a.classList = "photographer__link";
            const url = "/photographer.html" + "?id=" + id;
            a.setAttribute("href", url);
            a.appendChild(img);
            a.appendChild(h2);

            // photographer details
            const section = document.createElement( 'section' );
            section.classList = "photographer__details";
            section.appendChild(location);
            section.appendChild(quote);
            section.appendChild(dailyRate);

            // append all relevant elements to an article element
            const article = document.createElement( 'article' );
            article.id = id;
            article.appendChild(a);
            article.appendChild(section);

            return article

        } else {

            // photographer details
            const div = document.createElement( 'div' );
            div.classList = "photographer__details";
            div.appendChild(h2);
            div.appendChild(location);
            div.appendChild(quote);

            // contact button
            const button = document.getElementById('contact_button');

            // create container and append all relevent
            const container = document.createElement( 'section' );
            container.className = "photographer__header";
            container.appendChild(div);
            container.appendChild(button);
            container.appendChild(img);

            return container

        }
        
    }

    return { name, picture, getUserCardDOM }
}

