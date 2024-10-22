document.getElementById('book-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission until validation passes
    
    // Correctly select inputs by their order, instead of using :nth-child
    let whereTo = document.querySelector('input[placeholder="Enter Name"]').value.trim();
    let guests = document.querySelector('input[placeholder="Number of Guests"]').value;
    let arrival = document.querySelectorAll('input[type="date"]')[0].value; // First date input
    let leaving = document.querySelectorAll('input[type="date"]')[1].value; // Second date input
    
    let errors = [];
    
    // Validate destination name
    if (whereTo === "") {
        errors.push("Please enter a destination.");
    }
    
    // Validate number of guests
    if (guests === "" || guests <= 0 || guests > 10) {
        errors.push("Please enter a valid number of guests (1-10).");
    }
    
    // Validate arrival and leaving dates
    let today = new Date();
    let arrivalDate = new Date(arrival);
    let leavingDate = new Date(leaving);

    if (arrival === "") {
        errors.push("Please select an arrival date.");
    } else if (arrivalDate <= today) {
        errors.push("Arrival date must be in the future.");
    }
    
    if (leaving === "") {
        errors.push("Please select a leaving date.");
    } else if (arrival !== "" && leaving !== "" && leavingDate <= arrivalDate) {
        errors.push("The leaving date must be at least one day after the arrival date.");
    }

    // If there are errors, display them
    if (errors.length > 0) {
        alert(errors.join("\n"));
    } else {
        // Prepare the data to be submitted
        let formData = {
            whereTo: whereTo,
            guests: guests,
            arrival: arrival,
            leaving: leaving
        };

        // Submit the form via fetch API
        fetch('http://localhost:3000/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            alert('Booking successful!');
            document.getElementById('book-form').reset(); // Clear the form after successful submission
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while processing the booking.');
        });
    }
});
