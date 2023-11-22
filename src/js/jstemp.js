const txtName = document.querySelector('#txt-name');
const txtContact = document.querySelector("#txt-contact");
const btnAdd = document.querySelector('#btn-add');
// const {API_BASE_URL} = process.env;

btnAdd.addEventListener('click', () => {

    const name = txtName.value.trim();  // Fix the typo here
    const contact = txtContact.value.trim();

    if (!/[A-Za-z ]+$/.test(name)) {
        txtName.focus();
        txtName.select();
        return;
    } else if (!/^\d{3}-\d{7}$/.test(contact)) {
        txtContact.focus();
        txtContact.select();
        return;
    }

    // Todo: save the teacher
    fetch(`${API_BASE_URL}/teachers`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            contact

        })
    }).then((res) => {
        if(res.ok){
            res.json().then((teacher) => createTeacher(teacher));
            txtName.value = '';
            txtContact.value = '';
            txtName.focus();
        }else {
            alert('Failed to create')
        }
    }).catch(() => {
        alert("Something went wrong");
    })
});

console.log('sahan');

function loadAllTeachers() {
    // Todo: receive teacher list from the back end
}

function createTeacher(teacher) {
    const row = document.createElement('tr');
    document.querySelector('#tbl tbody').append(row);

    row.innerHTML = `
        <tr>
            <td>${teacher.id}</td>
            <td>${teacher.name}</td>
            <td>${teacher.contact}</td>
            <td><button class= 'delete btn btn-danager'>Delete</button></td>
        </tr>
    `
}
//Add teacher to table
btnAdd.addEventListener('click', async() => {
    const name = txtName.value.trim();
    const contact = txtContact.value.trim();

    if (!name || !contact) {
        alert('Please enter valid data.');
        return;
    }
    const teacherData = {
        name: name,
        contact: contact
    };

    try {

        //Send a post request to the backend
        const response = await fetch(`${API_URL}/teachers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(teacherData),
        });
        if (!response.ok) {
            throw new Error('Failed to add the teacher.');
        }
        //Idf response is sucessfull, update the frontend table
        const newTeacher = await response.json();
        createTeacher(newTeacher);
        txtName.value = '';
        txtContact.value = '';
        txtName.focus();
    }catch(error){
        console.error('Error:', error.message);
        alert('Something went wrong. Please try again.');
    }
})
