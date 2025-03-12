document.addEventListener("DOMContentLoaded", loadHabits);

function addHabit() {
    let habitInput = document.getElementById("habit-input");
    let habitText = habitInput.value.trim();
    
    if (habitText === "") return;

    let habit = {
        name: habitText,
        completed: false
    };

    let habits = JSON.parse(localStorage.getItem("habits")) || [];
    habits.push(habit);
    localStorage.setItem("habits", JSON.stringify(habits));

    habitInput.value = "";
    loadHabits();
}

function loadHabits() {
    let habits = JSON.parse(localStorage.getItem("habits")) || [];
    let habitList = document.getElementById("habit-list");
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
    let habits = JSON.parse(localStorage.getItem("habits")) || [];
    habits[index].completed = !habits[index].completed;
    localStorage.setItem("habits", JSON.stringify(habits));
}

function deleteHabit(index) {
    let habits = JSON.parse(localStorage.getItem("habits")) || [];
    habits.splice(index, 1);
    localStorage.setItem("habits", JSON.stringify(habits));
    loadHabits();
}
