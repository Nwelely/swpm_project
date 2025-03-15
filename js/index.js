document.addEventListener("DOMContentLoaded", function () {
    const loggedInUser = getLoggedInUser();

    if (!loggedInUser) {
        alert("Please log in to manage your habits.");
        window.location.href = "login.html"; // Redirect if not logged in
        return;
    }

    loadHabits();
});

function addHabit() {
    const habitInput = document.getElementById("habit-input");
    const habitText = habitInput.value.trim();

    if (habitText === "") return;

    const loggedInUser = getLoggedInUser();
    if (!loggedInUser) return;

    let userHabits = JSON.parse(localStorage.getItem(`habits_${loggedInUser}`)) || [];
    
    const habit = { name: habitText, completed: false };
    userHabits.push(habit);

    localStorage.setItem(`habits_${loggedInUser}`, JSON.stringify(userHabits));

    habitInput.value = "";
    loadHabits();
}

function loadHabits() {
    const loggedInUser = getLoggedInUser();
    if (!loggedInUser) return;

    let habits = JSON.parse(localStorage.getItem(`habits_${loggedInUser}`)) || [];
    const habitList = document.getElementById("habit-list");
    habitList.innerHTML = "";

    habits.forEach((habit, index) => {
        let habitDiv = document.createElement("div");
        habitDiv.classList.add("habit");

        let habitLabel = document.createElement("label");
        habitLabel.innerText = habit.name;

        let habitCheckbox = document.createElement("input");
        habitCheckbox.type = "checkbox";
        habitCheckbox.checked = habit.completed;
        habitCheckbox.addEventListener("change", () => toggleHabit(index));

        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "X";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", () => deleteHabit(index));

        habitDiv.appendChild(habitLabel);
        habitDiv.appendChild(habitCheckbox);
        habitDiv.appendChild(deleteBtn);

        habitList.appendChild(habitDiv);
    });
}

function toggleHabit(index) {
    const loggedInUser = getLoggedInUser();
    if (!loggedInUser) return;

    let habits = JSON.parse(localStorage.getItem(`habits_${loggedInUser}`)) || [];
    habits[index].completed = !habits[index].completed;
    localStorage.setItem(`habits_${loggedInUser}`, JSON.stringify(habits));
}

function deleteHabit(index) {
    const loggedInUser = getLoggedInUser();
    if (!loggedInUser) return;

    let habits = JSON.parse(localStorage.getItem(`habits_${loggedInUser}`)) || [];
    habits.splice(index, 1);
    localStorage.setItem(`habits_${loggedInUser}`, JSON.stringify(habits));
    
    loadHabits();
}

// Helper function to get the logged-in user
function getLoggedInUser() {
    return localStorage.getItem("loggedInUser");
}
