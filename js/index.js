document.addEventListener("DOMContentLoaded", function () {
    const loggedInUser = getLoggedInUser();

    if (!loggedInUser) {
        alert("Please log in to manage your habits.");
        window.location.href = "login.html";
        return;
    }

    loadHabits();

    // Show day name when date changes
    const dateInput = document.getElementById("habit-date");
    const dayNameSpan = document.getElementById("habit-day-name");

    dateInput.addEventListener("change", function () {
        const selectedDate = this.value;
        if (selectedDate) {
            const date = new Date(selectedDate);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
            dayNameSpan.textContent = dayName;
        } else {
            dayNameSpan.textContent = "";
        }
    });
});

function addHabit() {
    const habitInput = document.getElementById("habit-input");
    const dateInput = document.getElementById("habit-date");
    const habitText = habitInput.value.trim();
    const habitDate = dateInput.value;

    if (habitText === "" || habitDate === "") return;

    const loggedInUser = getLoggedInUser();
    if (!loggedInUser) return;

    let userHabits = JSON.parse(localStorage.getItem(`habits_${loggedInUser}`)) || [];
    const habit = { name: habitText, completed: false, date: habitDate };
    userHabits.push(habit);

    localStorage.setItem(`habits_${loggedInUser}`, JSON.stringify(userHabits));

    habitInput.value = "";
    dateInput.value = "";
    document.getElementById("habit-day-name").textContent = "";

    loadHabits();
}

function toggleHabit(index) {
    const loggedInUser = getLoggedInUser();
    if (!loggedInUser) return;

    let habits = JSON.parse(localStorage.getItem(`habits_${loggedInUser}`)) || [];
    habits[index].completed = !habits[index].completed;
    localStorage.setItem(`habits_${loggedInUser}`, JSON.stringify(habits));
    loadHabits();
}

function deleteHabit(index) {
    const loggedInUser = getLoggedInUser();
    if (!loggedInUser) return;

    let habits = JSON.parse(localStorage.getItem(`habits_${loggedInUser}`)) || [];
    habits.splice(index, 1);
    localStorage.setItem(`habits_${loggedInUser}`, JSON.stringify(habits));
    loadHabits();
}

function loadHabits() {
    const loggedInUser = getLoggedInUser();
    if (!loggedInUser) return;

    let habits = JSON.parse(localStorage.getItem(`habits_${loggedInUser}`)) || [];
    habits.sort((a, b) => new Date(a.date) - new Date(b.date));

    const habitList = document.getElementById("habit-list");
    habitList.innerHTML = "";

    habits.forEach((habit, index) => {
        const habitDiv = document.createElement("div");
        habitDiv.classList.add("habit-item");

        const topRow = document.createElement("div");
        topRow.classList.add("habit-controls");

        const label = document.createElement("label");
        label.textContent = habit.name;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = habit.completed;
        checkbox.onchange = () => toggleHabit(index);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = () => deleteHabit(index);

        topRow.appendChild(label);
        topRow.appendChild(checkbox);
        topRow.appendChild(deleteBtn);

        const dateRow = document.createElement("div");
        dateRow.classList.add("habit-date");

        const dateLabel = document.createElement("label");
        dateLabel.textContent = "Date:";

        const dateInput = document.createElement("input");
        dateInput.type = "date";
        dateInput.value = habit.date || new Date().toISOString().split('T')[0];
        dateInput.onchange = (e) => {
            habits[index].date = e.target.value;
            localStorage.setItem(`habits_${loggedInUser}`, JSON.stringify(habits));
            loadHabits();
        };

        const daySpan = document.createElement("span");
        daySpan.classList.add("day-name");

        if (habit.date) {
            const date = new Date(habit.date);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
            daySpan.textContent = ` (${dayName})`;
        }

        dateRow.appendChild(dateLabel);
        dateRow.appendChild(dateInput);
        dateRow.appendChild(daySpan);

        habitDiv.appendChild(topRow);
        habitDiv.appendChild(dateRow);

        habitList.appendChild(habitDiv);
    });
}

function getLoggedInUser() {
    return localStorage.getItem("loggedInUser");
}
