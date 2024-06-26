document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = 'https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-countries';
    const countryCardsContainer = document.getElementById('country-cards');
    const sortButton = document.getElementById('sort-population');

    // Fetch and display country data
    const fetchCountries = async (sort = false) => {
        let url = apiUrl;
        if (sort) {
            url += '?sort=population&order=desc';
        }
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data); // Log the entire response for debugging

            // Check and handle the structure of the response
            if (data && data.data && Array.isArray(data.data)) {
                displayCountries(data.data);
            } else {
                console.error('No countries data found in response', data);
            }
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    };

    // Display country data on the webpage
    const displayCountries = (countries) => {
        countryCardsContainer.innerHTML = '';
        countries.forEach(country => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <h2>Country: ${country.country}</h2>
                <p>Population: ${country.population}</p>
                <p>id: ${country.id}</p>
                <p>Rank: ${country.Rank}</p>
            `;
            countryCardsContainer.appendChild(card);
        });
    };

    // Event listener for sorting by population
    sortButton.addEventListener('click', () => {
        fetchCountries(true);
    });

    // Initial fetch
    fetchCountries();
});

