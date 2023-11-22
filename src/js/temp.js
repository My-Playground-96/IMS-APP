const txtNameElm = document.querySelector("#txt-name");
const txtContactElm = document.querySelector("#txt-contact");
const btnElm = document.querySelector("#btn-add");
const {API_BASE_URL} = process.env;

btnElm.addEventListener("click",()=>{
    const name = txtNameElm.value.trim();
    const contact = txtContactElm.value.trim();

    if(!/^[A-Za-z ]+$/.test(name)){
        txtNameElm.focus();
        txtNameElm.select();
        return;
    }
    else if(!/^\d{3}-\d{7}$/.test(contact)){
        txtContactElm.focus();
        txtContactElm.select();
        return;
    }
    // Todo save the teacher

    fetch(`${API_URL}/teachers`,{
        method:"POST",
        headers: {
            "content-Type":"application/json"
        },
        body: JSON.stringify({name,contact})
    }).then(res=>{
        if(res.status === 201){
            res.json().then(teacher =>{
                createNewRow(teacher);
                txtNameElm.value='';
                txtContactElm.value = '';
                txtNameElm.focus();
            })
        }else{
            alert("failed to create a teacher")
        }
    }).catch(err=>{
        alert("Something went wrong");
    })
});

function createNewRow(teacher){
    const trElm = document.createElement('tr');
    document.querySelector('#tbl tbody').append(trElm);

    trElm.innerHTML = `
        <tr>
            <td>${teacher.id}</td>
            <td>${teacher.name}</td>
            <td>${teacher.contact}</td>
            <td><button class="delete btn btn-danger">Delete</button></td>
        </tr>`
}

function loardAllTeachers(){
    // Todo retrive teacher list from the back end
}

