// Load Navbar Dynamically into index.html
fetch("nav.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("navbar-container").innerHTML = data;
    })
    .catch(error => console.error("Error loading navbar:", error));
    document.addEventListener("DOMContentLoaded", function () {
        const loggedInUser = localStorage.getItem("loggedInUser");
        const loginLink = document.getElementById("login-link");
        const logoutLink = document.getElementById("logout-link");
        const userNameDisplay = document.getElementById("user-name");
    
        if (loggedInUser) {
            loginLink.style.display = "none";
            logoutLink.style.display = "block";
            userNameDisplay.style.display = "block";
            userNameDisplay.innerText = `Welcome, ${loggedInUser}`;
        }
    });
    
    function logout() {
        localStorage.removeItem("loggedInUser");
       
        window.location.href = "login.html";
    }
    