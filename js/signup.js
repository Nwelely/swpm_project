document.getElementById("signup-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevents form submission

    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm-password").value;

    // Basic Validation
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters long!");
        return;
    }

    // Save User Data (In Local Storage for Testing)
    let user = {
        username: username,
        email: email,
        password: password
    };

    localStorage.setItem("user", JSON.stringify(user));

    alert("Sign Up Successful! Redirecting to login...");
    window.location.href = "index.html"; // Redirect to login page
});

// Toggle Password Visibility
function togglePassword(fieldId) {
    let passwordField = document.getElementById(fieldId);
    passwordField.type = passwordField.type === "password" ? "text" : "password";
}
function showSignup() {
    // Redirect to signup.html (Change the filename if needed)
    window.location.href = "signup.html";
}
