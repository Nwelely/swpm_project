// Dummy user data (Replace this with actual backend authentication)
const users = [
    { username: "nour", email: "n@gmail.com", password: "1234567n" }, // Replace with actual user data", email: "example@example.com", password: "examplePassword" }
];

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent form submission

            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();

            // Check if the user exists
            const user = users.find(user => user.username === username && user.password === password);

            if (user) {
               
                window.location.href = "index.html"; // Redirect to the home page
            } else {
                alert("Invalid username or password!");
            }
        });
    }

    // Ensure sign-up link redirects properly
    const signupLink = document.querySelector("a[onclick='showSignup()']");
    if (signupLink) {
        signupLink.addEventListener("click", function () {
            window.location.href = "signup.html";
        });
    }
});

// Function to toggle password visibility
function togglePassword() {
    const passwordField = document.getElementById("password");
    passwordField.type = passwordField.type === "password" ? "text" : "password";
}

function showSignup() {
    // Redirect to signup.html (Change the filename if needed)
    window.location.href = "signup.html";
}