let currentSlide = 0;
let hotels = []; // Initialize an empty array for hotels

function showSlide(index) {
    const slides = document.querySelectorAll('.card');
    const totalSlides = slides.length;

    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }

    const slideWidth = slides[0].clientWidth;
    document.querySelector('.card-container').style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

window.onload = function () {
    fetchHotels(); // Fetch hotels data on window load
};

function fetchHotels() {
    fetch('db.json') // Adjust the path if necessary
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            hotels = data.hotels; // Assign the fetched data to the hotels array
            displayHotels(hotels); // Display the hotels
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function displayHotels(hotels) {
    let cont = document.getElementById('cont');
    cont.innerHTML = '';
    hotels.forEach(hotel => { // Change fruits to hotels
        let div = document.createElement('div');  
        div.classList.add('hotel-card', 'mt-5', 'mb-5', 'ml-3', 'col-4', 'col-sm-3', 'col-md-2');
        div.innerHTML = `<div>${hotel.name}</div>
                         <div>${hotel.location}</div>
                         <div>Pickup Date: ${hotel.pickupDate}</div>
                         <div>Return Date: ${hotel.returnDate}</div>
                         <div>Guests: ${hotel.guests}</div>`; // Display more hotel info
        cont.appendChild(div);
    });
}

function searchHotels() {
    let query = document.getElementById('location').value.toLowerCase();
    let result = hotels.filter(hotel => hotel.location.toLowerCase().includes(query)); // Search by location
    displayHotels(result);   
}

function clearSearch() {
    displayHotels(hotels); // Change displayFHotel to displayHotels
}
