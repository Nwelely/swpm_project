document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevents form submission

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // Dummy Authentication (Replace with actual backend logic)
    if (username === "user" && password === "1234") {
        alert("Login successful!");
        window.location.href = "dashboard.html"; // Redirect (change this as needed)
    } else {
        alert("Invalid username or password!");
    }
});

// Function to Toggle Password Visibility
function togglePassword() {
    let passwordField = document.getElementById("password");
    if (passwordField.type === "password") {
        passwordField.type = "text";
    } else {
        passwordField.type = "password";
    }
}

// Function to Handle Sign-Up Click
function showSignup() {
    // Redirect to signup.html (Change the filename if needed)
    window.location.href = "signup.html";
}

