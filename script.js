const apiKey = 'pLbDwfOBTkUt99yiEyhlKIMIDtCAtL5KbXKX4igC'; 
const apiBaseUrl = 'https://api.nasa.gov/planetary/apod';

// Function to get the current image of the day
async function getCurrentImageOfTheDay() {
    const currentDate = new Date().toISOString().split("T")[0];
    try {
        const response = await fetch(`${apiBaseUrl}?api_key=${apiKey}&date=${currentDate}`);
        const data = await response.json();
        displayImage(data);
    } catch (error) {
        console.error('Error fetching current image:', error);
        displayError('Unable to fetch current image of the day.');
    }
}

// Function to get the image for a specific date
async function getImageOfTheDay(date) {
    try {
        const response = await fetch(`${apiBaseUrl}?api_key=${apiKey}&date=${date}`);
        const data = await response.json();
        displayImage(data);
        saveSearch(date);
        addSearchToHistory(date);
    } catch (error) {
        console.error('Error fetching image:', error);
        displayError('Unable to fetch image for the selected date.');
    }
}

// Display image in the current image container
function displayImage(data) {
    const imageContent = document.getElementById('image-content');
    if (data.media_type === 'image') {
        imageContent.innerHTML = `
            <h3>${data.title}</h3>
            <img src="${data.url}" alt="${data.title}">
            <p>${data.explanation}</p>
        `;
    } else {
        imageContent.innerHTML = '<p>Media type not supported.</p>';
    }
}

// Display an error message in the current image container
function displayError(message) {
    const imageContent = document.getElementById('image-content');
    imageContent.innerHTML = `<p>${message}</p>`;
}

// Save search date to local storage
function saveSearch(date) {
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    if (!searches.includes(date)) {
        searches.push(date);
        localStorage.setItem('searches', JSON.stringify(searches));
    }
}

//
