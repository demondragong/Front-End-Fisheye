function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        article.id = id;
        
        // link to photographer page
        const a = document.createElement( 'a' );
        a.classList = "photographer__link";
        const url = "/photographer.html" + "?id=" + id;
        a.setAttribute("href", url);
        article.appendChild(a);

        // image
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", name)
        a.appendChild(img);
        
        // photographer's name
        const h2 = document.createElement( 'h2' );
        h2.classList = "photographer__name"
        h2.textContent = name;
        a.appendChild(h2);
        
        // photographer details
        const section = document.createElement( 'section' );
        section.classList = "photographer__details";
        article.appendChild(section);

        // photographer's location : city, country
        const locationString = city + ", " + country;
        const location = document.createElement( 'p' );
        location.classList = "photographer__location"
        location.textContent = locationString;
        section.appendChild(location);
        
        // photographer's quote
        const quote = document.createElement( 'p' );
        quote.classList = "photographer__tagline"
        quote.textContent = tagline;
        section.appendChild(quote);

        // photographer's daily rate
        const dailyRateString = price + "€/jour";
        const dailyRate = document.createElement( 'p' );
        dailyRate.classList = "photographer__rate"
        dailyRate.textContent = dailyRateString;
        section.appendChild(dailyRate);

        return (article);
    }
    return { name, picture, getUserCardDOM }
}

