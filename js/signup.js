document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signup-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission

        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        let isValid = true;

        // Username validation: At least 3 characters, only letters and numbers
        if (!/^[a-zA-Z0-9]{3,}$/.test(username)) {
            alert("Username must be at least 3 characters long and contain only letters/numbers.");
            isValid = false;
        }

        // Email validation: Standard email format
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert("Enter a valid email address.");
            isValid = false;
        }

        // Password validation: At least 8 characters, one letter, one number
        //if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
           // alert("Password must be at least 8 characters long and include at least one letter and one number.");
          //  isValid = false;
//}

        // Confirm password validation
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            isValid = false;
        }

        if (!isValid) return;

        // Retrieve users from local storage (if any)
        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Check if username or email already exists
        if (users.some(user => user.username === username)) {
            alert("Username already exists. Please choose another one.");
            return;
        }
        if (users.some(user => user.email === email)) {
            alert("Email already exists. Please use another one.");
            return;
        }

        // Store new user
        const user = { username, email, password };
        users.push(user);

        localStorage.setItem("users", JSON.stringify(users)); // Save to local storage

        

        // Redirect to login page
        window.location.href = "../html/login.html";
    });
});

// Toggle password visibility
function togglePassword(id) {
    const passwordField = document.getElementById(id);
    passwordField.type = passwordField.type === "password" ? "text" : "password";
}
