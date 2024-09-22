const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function AddTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;

        // Add a new task (li) to the list container
        listContainer.appendChild(li);

        // Create a span element for the close (×) button
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // Unicode for × symbol
        span.classList.add("close"); // Optional: add a class to the span
        li.appendChild(span);

        // Save the updated task list to localStorage
        saveData();
    }
    inputBox.value = ""; // Clear the input box after adding the task
}

// Add event listener for handling clicks on the list container
listContainer.addEventListener("click", function (e) {
    // Check if an li element was clicked to toggle the checked class
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData(); // Save data after toggling the checked state
    }
    // Check if a span (× button) was clicked to remove the parent li
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData(); // Save data after removing the task
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");

    // Reattach event listeners to all existing list items
    const closeButtons = listContainer.getElementsByClassName("close");
    for (let i = 0; i < closeButtons.length; i++) {
        closeButtons[i].addEventListener("click", function () {
            this.parentElement.remove();
            saveData(); // Save data after removing the task
        });
    }
    
    // Reattach click events to list items for checking/unchecking tasks
    const listItems = listContainer.getElementsByTagName("li");
    for (let i = 0; i < listItems.length; i++) {
        listItems[i].addEventListener("click", function () {
            this.classList.toggle("checked");
            saveData(); // Save data after toggling checked state
        });
    }
}

// Call the function to show tasks on page load
showTask();



