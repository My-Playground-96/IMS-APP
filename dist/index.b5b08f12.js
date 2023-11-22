const form = document.querySelector("#regForm");
const idInput = document.querySelector("#txt-id");
const nameInput = document.querySelector("#txt-name");
const contactInput = document.querySelector("#txt-contact");
const btnNewUser = document.querySelector(".btn-new-user");
console.log(btnNewUser.innerHTML);
const btnSave = document.querySelector(".btn-success");
const btnClear = document.querySelector(".btn-warning");
const tableBody = document.querySelector(".userTableBody");
let isUpdateMode = false;
// const { API_URL } = process.env;
const API_URL = "http://localhost:8080"; // Set your API URL here
//Create user class
class User {
    static lastId = 0;
    name;
    contact;
    constructor(name, contact){
        this.name = name;
        this.contact = contact;
        User.lastId++;
    }
}
//Disable input fields on page load
idInput.disabled = true;
nameInput.disabled = true;
contactInput.disabled = true;
loadTeachers();
//Load all the details
async function loadTeachers() {
    try {
        const response = await fetch(`${API_URL}/teachers`);
        if (!response.ok) throw new Error("Failed to fetch teachers");
        const teachers = await response.json();
        console.log(teachers);
        displayTeachers(teachers);
    } catch (error) {
        console.error(error);
        alert("Failed to load teachers. Please try again.");
    }
}
function displayTeachers(teachers) {
    tableBody.innerHTML = "";
    if (teachers.length === 0) {
        const noDataRow = document.createElement("tr");
        noDataRow.innerHTML = '<td colspan="4" class="text-center py-5 no-data-found">No Data Found!</td>';
        tableBody.append(noDataRow);
        return;
    }
    teachers.forEach((teacher)=>{
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="d-flex justify-content-center">${teacher.id}</td>
            <td>${teacher.name}</td>
            <td>${teacher.contact}</td>
            <td class="d-flex justify-content-center">
                <i class="bi bi-pencil me-2" title="Edit"></i>
                <i class="bi bi-trash" title="Delete"></i>
            </td>
        `;
        tableBody.appendChild(row);
    });
}
btnNewUser.addEventListener("click", async ()=>{
    try {
        // Fetch the last added teacher's ID from the backend
        const response = await fetch(`${API_URL}/teachers`);
        if (!response.ok) throw new Error("Failed to fetch teachers");
        const teachers = await response.json();
        // Find the maximum ID from the teachers array
        const maxId = teachers.reduce((max, teacher)=>Math.max(max, teacher.id), 0);
        // Set the new ID in the ID input field
        idInput.value = maxId + 1;
        // Enable the input fields when the button is clicked
        nameInput.disabled = false;
        contactInput.disabled = false;
    } catch (error) {
        console.error(error);
        alert("Failed to load teachers. Please try again.");
    }
});
//Validate the data inputs
//Event listners for input validation
nameInput.addEventListener("input", validateName);
contactInput.addEventListener("input", validateAddress);
function validateForm() {
    return validateName() && validateAddress();
}
//Validate the name input
function validateName() {
    const nameValue = nameInput.value.trim();
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (nameValue === "") {
        showError(nameInput, "Name is required");
        return false;
    } else if (!nameRegex.test(nameValue)) {
        showError(nameInput, "Invalid Name! Only letters and white spaces are allowed");
        return false;
    } else {
        hideError(nameInput);
        return true;
    }
}
//Validate the address input
function validateAddress() {
    const contactValue = contactInput.value.trim();
    if (contactValue === "") {
        showError(contactInput, "Address is required");
        return false;
    } else if (contactValue.length < 4) {
        showError(contactInput, "Address must be at least 4 characters long");
        return false;
    } else {
        hideError(contactInput);
        return true;
    }
}
//Show error messages
function showError(inputField, errorMessage) {
    inputField.classList.add("is-invalid");
    const errorContainer = document.getElementById(`${inputField.id}-error`);
    errorContainer.textContent = errorMessage;
    errorContainer.style.display = "block";
}
//Hide error message
function hideError(inputField) {
    inputField.classList.remove("is-invalid");
    const errorContainer = document.getElementById(`${inputField.id}-error`);
    errorContainer.textContent = "";
    errorContainer.style.display = "none";
}
//Add teacher to table
btnSave.addEventListener("click", async ()=>{
    const name = nameInput.value.trim();
    const contact = contactInput.value.trim();
    const teacherData = {
        name: name,
        contact: contact
    };
    if (validateForm()) try {
        let response;
        if (isUpdateMode) {
            // If in update mode, send a PATCH request to update the teacher
            response = await fetch(`${API_URL}/teachers/${idInput.value}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(teacherData)
            });
            if (!response.ok) throw new Error("Failed to update the teacher.");
            updateTeacherInTable();
            isUpdateMode = false;
        } else {
            response = await fetch(`${API_URL}/teachers`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(teacherData)
            });
            if (!response.ok) throw new Error("Failed to add the teacher.");
            // If the request is successful, update the frontend table
            const newTeacher = await response.json();
            addTeacherToTable(newTeacher);
            // Clear the form inputs
            form.reset();
            nameInput.disabled = true;
            contactInput.disabled = true;
            alert("Teacher added successfully!");
        }
    } catch (error) {
        console.error("Error:", error.message);
        alert("Something went wrong. Please try again.");
    }
});
// Function to add a teacher to the table
function addTeacherToTable(teacher) {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${teacher.id}</td>
        <td>${teacher.name}</td>
        <td>${teacher.contact}</td>
        <td>
            <i class="bi bi-pencil me-2" title="Edit"></i>
            <i class="bi bi-trash" title="Delete"></i>
        </td>
    `;
    tableBody.appendChild(newRow);
    // If the "No Data Found" row exists, remove it
    const noDataRow = document.querySelector(".no-data");
    if (noDataRow) noDataRow.remove();
}
tableBody.addEventListener("click", (e)=>{
    if (e.target.classList.contains("bi-pencil")) {
        // Get the selected row
        const selectedRow = e.target.closest("tr");
        // Extract user details from the row
        const userId = selectedRow.querySelector("td:first-child").textContent;
        const userName = selectedRow.querySelector("td:nth-child(2)").textContent;
        const userAddress = selectedRow.querySelector("td:nth-child(3)").textContent;
        // Update form values
        idInput.value = userId;
        nameInput.value = userName;
        contactInput.value = userAddress;
        // Enable name and address fields
        nameInput.disabled = false;
        contactInput.disabled = false;
        // Change button text to 'Update'
        btnSave.textContent = "Update";
        // Set update mode to true
        isUpdateMode = true;
    }
});
//Update table function
function updateTeacherInTable() {
    const tableBody = document.querySelector(".userTableBody");
    const rows = tableBody.querySelectorAll("tr");
    for (const row of rows){
        const userId = row.cells[0].textContent;
        if (userId === idInput.value) {
            // Update the Name and Address in the table
            row.cells[1].textContent = nameInput.value.trim();
            row.cells[2].textContent = contactInput.value.trim();
            break; // Exit the loop once the row is updated
        }
    }
    // Reset the form and button text
    form.reset();
    btnSave.textContent = "Save";
    // Disable name and address fields
    nameInput.disabled = true;
    contactInput.disabled = true;
}
//Delete a teacher
tableBody.addEventListener("click", async (e)=>{
    if (e.target.classList.contains("bi-trash")) {
        // Get the selected row and remove it
        const selectedRow = e.target.closest("tr");
        const teacherId = selectedRow.querySelector("td:first-child").textContent;
        console.log(teacherId);
        try {
            const response = await fetch(`${API_URL}/teachers/${teacherId}`, {
                method: "DELETE"
            });
            if (!response.ok) throw new Error("Failed to delete the teacher.");
            selectedRow.remove();
            // If no rows are left, show the "No Data Found" row
            if (tableBody.childElementCount < 1) {
                const newRow = document.createElement("tr");
                newRow.classList.add("no-data");
                const newCell = document.createElement("td");
                newCell.classList.add("text-center", "py-5", "no-data-found");
                newCell.setAttribute("colspan", "4");
                newCell.innerText = "No data found!";
                newRow.append(newCell);
                tableBody.append(newRow);
            }
        // alert('Teacher deleted successfully!');
        } catch (error) {
            console.error("Error:", error.message);
            alert("Failed to delete the teacher. Please try again.");
        }
    }
});
//Search teachers
const txtSearch = document.querySelector(".txt-search");
txtSearch.addEventListener("input", ()=>{
    const searchQueary = txtSearch.value.trim().toLowerCase();
    filterTableRows(searchQueary);
});
function filterTableRows(query) {
    const rows = document.querySelectorAll(".userTableBody tr:not(.no-data");
    rows.forEach((row)=>{
        const userId = row.querySelector("td:first-child").textContent.toLowerCase();
        console.log(userId);
        const userName = row.querySelector("td:nth-child(2)").textContent.toLowerCase();
        const userContact = row.querySelector("td:nth-child(3)").textContent.toLowerCase();
        if (userId.includes(query) || userName.includes(query) || userContact.includes(query)) row.style.display = "";
        else row.style.display = "none";
    });
}
// Handle the "Enter" key press event on the form
form.addEventListener("keydown", async (e)=>{
    if (e.key === "Enter") {
        // Prevent the default form submission behavior
        e.preventDefault();
        // Trigger the "Save" button click event
        btnSave.click();
    }
});

//# sourceMappingURL=teachers.b5b08f12.js.map
