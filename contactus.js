function savePost(event) {
    event.preventDefault(); // Prevent the default form submission

    let n = document.getElementById("name").value;
    let e = document.getElementById("email").value;
    let nu = document.getElementById("number").value;
    let s = document.getElementById("subject").value;
    let m = document.getElementById("message").value;

    let data = {
        name: n,
        email: e,
        number: nu,
        subject: s,
        message: m
    };

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/posts", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(data)); // Send the data directly as a JSON string

    xhr.onload = function() {
        if (this.status == 201) {
            alert("Your query has send");
            document.getElementById("contact-form").reset(); // Reset form after submission
        } else {
            alert("Error saving post: " + this.status); // Handle errors
        }
    };

    xhr.onerror = function() {
        alert("Request failed. Please try again.");
    };
}