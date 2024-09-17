let tableEntries = [
    // { type: 1, name: "income", amount: 25000, description: "Monthly Salary" },
    // { type: 0, name: "rent", amount: 18000, description: "Apartment Rent" },
    // { type: 0, name: "food", amount: 5000, description: "Groceries" },
];

// Function to update data expense summary
function updateSummary() {
    let totalIncome = tableEntries.reduce((t, e) => {
        if (e.type === 1) t += e.amount;
        return t;
    }, 0);
    let totalExpense = tableEntries.reduce((ex, e) => {
        if (e.type === 0) ex += e.amount;
        return ex;
    }, 0);
    updatedInc.innerText = totalIncome;
    updatedExp.innerText = totalExpense;
    updatedBal.innerText = totalIncome - totalExpense;
}

// Function to add new entry to the dataset and expense table 
function addItem() {
    let type = itemType.value;
    let name = document.getElementById("name");
    let amount = document.getElementById("amount");
    let description = document.getElementById("description"); // Get the description

    // Input validation
    if (name.value === "" || Number(amount.value) === 0)
        return alert("Incorrect Input");
    if (Number(amount.value) <= 0)
        return alert("Incorrect amount! can't add negative");

    // Push new data
    tableEntries.push({
        type: Number(type),
        name: name.value,
        amount: Number(amount.value),
        description: description.value, // Add description
    });

    updateTable();
    name.value = "";
    amount.value = 0;
    description.value = ""; // Clear description field
}

// Function to load all entries in the expense table
function loadItems(e, i) {
    let cls;

    let table = document.getElementById("table");
    let row = table.insertRow(i + 1);
    let cell0 = row.insertCell(0);
    let cell1 = row.insertCell(1);
    let cell2 = row.insertCell(2);
    let cell3 = row.insertCell(3); // Description cell
    let c4 = row.insertCell(4);
    let c5 = row.insertCell(5);
    let c6 = row.insertCell(6);
    
    cell0.innerHTML = i + 1;
    cell1.innerHTML = e.name;
    cell2.innerHTML = e.amount;
    cell3.innerHTML = e.description; // Display description

    // Add delete button
    c5.innerHTML = "&#9746;";
    c5.classList.add("zoom");
    c5.addEventListener("click", () => del(e));

    // Add edit button
    c6.innerHTML = "&#9998;";
    c6.classList.add("zoom");
    c6.addEventListener("click", () => editItem(e));

    if (e.type == 0) {
        cls = "red";
        c4.innerHTML = "&#10138;"; // Expense icon
        row.style.backgroundColor = "lightcoral"; // Set background for expense
    } else {
        cls = "green";
        c4.innerHTML = "&#10136;"; // Income icon
        row.style.backgroundColor = "lightgreen"; // Set background for income
    }
    c4.style.color = cls;
}

// Clear the table before updating
function remove() {
    while (table.rows.length > 1) table.deleteRow(-1);
}

// Function to delete a specific entry
function del(el) {
    remove();
    tableEntries = tableEntries.filter((e) => e.name !== el.name);
    updateTable();
    updateSummary();
}

// Function to edit a specific entry
function editItem(el) {
    let name = document.getElementById("name");
    let amount = document.getElementById("amount");
    let type = document.getElementById("itemType");
    let description = document.getElementById("description"); // Edit description

    // Set the current values in the form fields
    name.value = el.name;
    amount.value = el.amount;
    type.value = el.type;
    description.value = el.description; // Set description

    // Remove the old entry
    del(el);
}

// Filter function based on the selected filter option
function applyFilter(entries) {
    const filter = document.querySelector('input[name="filter"]:checked').value;
    
    if (filter === "income") {
        return entries.filter(e => e.type === 1);
    } else if (filter === "expense") {
        return entries.filter(e => e.type === 0);
    } else {
        return entries; // Return all entries if filter is set to "all"
    }
}

// To render all entries
function updateTable() {
    remove();
    const filteredEntries = applyFilter(tableEntries); // Apply filter
    filteredEntries.map((e, i) => {
        loadItems(e, i);
    });
    updateSummary();
}

// Event listener for radio button change
document.querySelectorAll('input[name="filter"]').forEach((radio) => {
    radio.addEventListener("change", updateTable);
});

updateTable();