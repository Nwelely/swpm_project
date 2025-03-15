document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");

    // Check if user is already logged in
    if (getLoggedInUser()) {
        window.location.href = "index.html"; // Redirect if already logged in
    }

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent form submission

            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();

            // Get users from localStorage
            const users = JSON.parse(localStorage.getItem("users")) || [];

            // Find matching user
            const user = users.find(user => user.username === username && user.password === password);

            if (user) {
                localStorage.setItem("loggedInUser", username); // Store logged-in user
               
                window.location.href = "index.html"; // Redirect to home page
            } else {
                alert("Invalid username or password!");
            }
        });
    }

    // Redirect signup link properly
    const signupLink = document.getElementById("signup-link");
    if (signupLink) {
        signupLink.addEventListener("click", function () {
            window.location.href = "signup.html";
        });
    }
});

// Function to get logged-in user
function getLoggedInUser() {
    return localStorage.getItem("loggedInUser");
}

// Function to toggle password visibility
function togglePassword() {
    const passwordField = document.getElementById("password");
    passwordField.type = passwordField.type === "password" ? "text" : "password";
}
function showSignup() {
    // Redirect to signup.html (Change the filename if needed)
    window.location.href = "signup.html";
}