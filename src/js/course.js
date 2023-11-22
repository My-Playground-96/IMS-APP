const form = document.querySelector('#regForm');
const idInput = document.querySelector('#txt-id');
const nameInput = document.querySelector('#txt-name');
const durationInput = document.querySelector('#txt-address');
const btnNewCourse = document.querySelector('.btn-new-user');
console.log(btnNewCourse.innerHTML);
const btnSave = document.querySelector('.btn-success');
const btnClear = document.querySelector('.btn-warning');
const tableBody = document.querySelector('.userTableBody');
let isUpdateMode = false;
let CourseID;
// const {API_URL} = process.env;

loadAllCourses();

function loadAllCourses(){
    fetch(`http://localhost:8080/courses`).then(res=>{
        if(res.ok){
            res.json().then(coursesList =>{
                coursesList.forEach(course =>{
                    CourseID = course.courseId+1;
                    addCourseToTable(course);
                })
            })
        }else{
            alert("Failed to load the courses list!")
        }
    }).catch(err =>{
        alert("Something went wrong!");
    })
};

function addCourseToTable(course){
    const tableBody = document.querySelector('.userTableBody');
    //Create a new row for the user
    const newRow = tableBody.insertRow();
    newRow.innerHTML = `
      <td>${course.courseId}</td>
      <td>${course.courseName}</td>
      <td>${course.durationInMonths}</td>
      <td>
        <i class="bi bi-pencil me-2" title="Edit"></i>
        <i class="bi bi-trash" title="Delete"></i>
      </td>
    `;

    console.log(course.id)

    //Append the row to the table
    // tableBody.appendChild(newRow);

    form.reset();
}

btnSave.addEventListener('click', (e) => {
    e.preventDefault();
    const name = nameInput.value;
    const duration = parseInt(durationInput.value);
    const id = idInput.value;
    console.log(id);
    // Validate the inputs
    if (validateForm()) {
        if (isUpdateMode) {

            fetch(`http://localhost:8080/courses/${id}`,{
                method:"PATCH",
                headers:{
                    "content-Type":"application/json"
                },
                body:JSON.stringify({
                    courseName : name,
                    durationInMonths: duration})
            }).then(res =>{
                if(res.ok){
                    updateUserInTable();
                    isUpdateMode = false;
                }else{
                    alert("Failed to create course")
                }
            }).catch(err=>{
                alert("Something went wrong! Try again later..")
            })

        }else{
            fetch("http://localhost:8080/courses",{
                method:"POST",
                headers:{
                    "content-Type":"application/json"
                },
                body:JSON.stringify({
                    courseName : name,
                    durationInMonths: duration})
            }).then(res =>{
                if(res.ok){
                    let newCourse = new Course(CourseID,nameInput.value.trim(), durationInput.value.trim());
                    console.log(newCourse);

                    // Add the new user to the table
                    addCourseToTable(newCourse);

                    // Clear the form inputs
                    form.reset();

                    nameInput.disabled = true;
                    durationInput.disabled = true;
                }else{
                    alert("Failed to create course")
                }
            }).catch(err=>{
                alert("Something went wrong! Try again later..")
            })
                // Create a new user object
            
        }
       
    }
});

function validateForm(){
    return validateName() && validateDuration();
}

//Validate the name input
function validateName(){
    const nameValue = nameInput.value.trim();
    const nameRegex = /^[a-zA-Z\s]+$/;

    if(nameValue === ''){
        showError(nameInput, 'Name is required');
        return false;
    }else if (!nameRegex.test(nameValue)){
        showError(nameInput,'Invalid Name! Only letters and white spaces are allowed');
        return false;
    }else {
        hideError(nameInput);
        return true;
    }
}
//Validate the address input
function validateDuration(){
    const durationValue = durationInput.value.trim();

    if(!/^\d+$/.test(durationInput.value)){
        showError(durationInput, 'Duration should be Integer');
        return false;
    }else {
        hideError(durationInput);
        return true;
    }
}

//Event listners for delete users

tableBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('bi-trash')) { 
        // Get the selected row and remove it
        const selectedRow = e.target.closest('tr');
        const id= selectedRow.querySelector("td:first-child").textContent;

        fetch(`http://localhost:8080/courses/${id}`,{
            method:"DELETE"
        }).then(res=>{
            if(res.ok){
                selectedRow.remove();
                alert('successfully delete the course!')
            }else{
                alert('Failed to delete!')
            }
        }).catch(err=>{
            alert("Failed to delete.try again later!")
        })

        

        // If no rows are left, show the "No Data Found" row
        // const rows = us.q
        if (tableBody.childElementCount < 1) {
            const newRow = document.createElement('tr');
            newRow.classList.add('no-data');
            const newCell = document.createElement('td');
            newCell.classList.add('text-center', 'py-5', 'no-data-found');
            newCell.setAttribute('colspan','4');
            // newCell.setAttribute('padding', '5px')
            newCell.innerText = 'No data found!';
            newRow.append(newCell);
            tableBody.append(newRow);
            // newRow.innerHTML = `
            //   <td colspan="4" class="text-center py-5">No Data Found!</td>
            // `;
        }
    }
});

//Create user class
class Course {
    static lastId = 0;

    courseId;
    courseName;
    durationInMonths;

    constructor(courseId,courseName, durationInMonths) {
        this.courseId = courseId;
        this.courseName = courseName;
        this.durationInMonths = durationInMonths;
        
        console.log(`New user created with ID: ${this.id}`);
    }
    static formatId(id){
        return String(id).padStart(3, "0");
    }
    static generateNewId(){
        return 'C' + User.formatId(User.lastId + 1);
    }
}


btnNewCourse.addEventListener('click', ()=> {

    //New ID generated automatically
    // const newUser = new User('','');
    idInput.value = CourseID;
    console.log(idInput.value);
    nameInput.disabled = false;
    durationInput.disabled = false;
});

let isEditMode = false;

//Event listners for input validation
nameInput.addEventListener('input', validateName);
durationInput.addEventListener('input', validateDuration);



//Show error messages
function showError(inputField, errorMessage) {
    inputField.classList.add("is-invalid");
    const errorContainer = document.getElementById(`${inputField.id}-error`);
    errorContainer.textContent = errorMessage;
    errorContainer.style.display = 'block';
}

//Hide error message
function hideError(inputField) {
    inputField.classList.remove("is-invalid");
    const errorContainer = document.getElementById(`${inputField.id}-error`);
    errorContainer.textContent = '';
    errorContainer.style.display = 'none';
}

//Add user details into the table

tableBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('bi-pencil')) {
        // Get the selected row
        const selectedRow = e.target.closest('tr');

        // Extract user details from the row
        const courseId = selectedRow.querySelector('td:first-child').textContent;
        const courseName = selectedRow.querySelector('td:nth-child(2)').textContent;
        const duration = selectedRow.querySelector('td:nth-child(3)').textContent;

        // Update form values
        idInput.value = courseId;
        nameInput.value = courseName;
        durationInput.value = duration;

        // Enable name and address fields
        nameInput.disabled = false;
        durationInput.disabled = false;

        // Change button text to 'Update'
        btnSave.textContent = 'Update';

        // Set update mode to true
        isUpdateMode = true;
    }
});

function updateUserInTable() {
    const tableBody = document.querySelector('.userTableBody');
    const rows = tableBody.querySelectorAll('tr');

    for (const row of rows) {
        const userId = row.cells[0].textContent;

        if (userId === idInput.value) {
            // Update the Name and Address in the table
            row.cells[1].textContent = nameInput.value.trim();
            row.cells[2].textContent = durationInput.value.trim();
            break; // Exit the loop once the row is updated
        }
    }

    // Reset the form and button text
    form.reset();
    btnSave.textContent = 'Save';

    // Disable name and address fields
    nameInput.disabled = true;
    durationInput.disabled = true;
}

//Search functionality
const txtSearch = document.querySelector('.txt-search');
txtSearch.addEventListener('input', ()=> {
    const searchQueary = txtSearch.value.trim().toLowerCase();
    filterTableRows(searchQueary);
});

function filterTableRows(query){
    const rows = document.querySelectorAll('.userTableBody tr:not(.no-data');
    rows.forEach(row => {
        const userId = row.querySelector('td:first-child').textContent.toLowerCase();
        console.log(userId);
        const userName = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
        const userAddress = row.querySelector('td:nth-child(3)').textContent.toLowerCase();

        if (userId.includes(query) || userName.includes(query) || userAddress.includes(query)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }


    });
}
