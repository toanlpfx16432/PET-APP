'use strict';

// Khởi tạo mảng chứa dữ liệu
let petArr = [];
// Hàm giao diện thông tin pet
function renderTableData(pet) {
    const tableBodyEl = document.getElementById('tbody');
    tableBodyEl.innerHTML = '';

    for(let i = 0; i < pet.length; i++) {       
        // Các biến hiển thị ngày tháng
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; // Tháng 1 là 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
        dd = '0' + dd;
        } 
        if (mm < 10) {
        mm = '0' + mm;
        } 
        today = dd + '/' + mm + '/' + yyyy;

        const row = document.createElement('tr');
        row.innerHTML = `<tr>
                            <th scope="row">${pet[i].id}</th>
                            <td>${pet[i].name}</td>   
                            <td>${pet[i].age}</td>
                            <td>${pet[i].type}</td>
                            <td>${pet[i].weight} kg</td>
                            <td>${pet[i].length} cm</td>
                            <td>${pet[i].breed}</td>
                            <td><i class="bi bi-square-fill" style="color: ${pet[i].color}"></i></td>
                            <td><i class="bi ${pet[i].vaccinated ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}"></i></td>
                            <td><i class="bi ${pet[i].dewormed ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}"></i></td>
                            <td><i class="bi ${pet[i].sterilized ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}"></i></td>
                            <td>${today}</td>
                            <td><button type="button" class="btn btn-danger" onclick='deletePet(${i})'>Delete</button>
                            </td>
                        </tr>`;
        tableBodyEl.appendChild(row)
    }
}

// Các biến dữ liệu nhập vào
const idInput = document.getElementById('input-id');
const nameInput = document.getElementById('input-name');
const ageInput = document.getElementById('input-age');
const typeInput = document.getElementById('input-type');
const weightInput = document.getElementById('input-weight');
const lengthInput = document.getElementById('input-length');
const colorInput = document.getElementById('input-color-1');
const breedInput = document.getElementById('input-breed');
const vaccinatedInput = document.getElementById('input-vaccinated');
const dewormedInput = document.getElementById('input-dewormed');
const sterilizedInput = document.getElementById('input-sterilized');

// Sự kiện click Submit, lấy dữ liệu
const submitBtn = document.getElementById('submit-btn');
submitBtn.addEventListener('click', function (e) {
     
    // Tạo Object chứa dữ liệu
    const data = {
        id: idInput.value,
        name: nameInput.value,
        age: parseInt(ageInput.value),
        type: typeInput.value,
        weight: parseInt(weightInput.value),
        length: parseInt(lengthInput.value),
        color: colorInput.value,
        breed: breedInput.value,
        vaccinated: vaccinatedInput.checked,
        dewormed: dewormedInput.checked,
        sterilized: sterilizedInput.checked,
        date: new Date(),
        
    }
    // Validate dữ liệu hợp lệ
    if (data.id === '' ) {
        alert('Please input for ID!');
        return; 
    }  

    const findId = petArr.every(function(pet, index) {
        return pet.id !== data.id;
    })
    if (!findId) {
        alert('ID must unique!');
        return;
    }

    if (data.name == '') {
        alert('Please input for Name!');
        return;
    }

    if (data.age < 1 || data.age > 15 || isNaN(data.age) == true ) {
        alert('Age must be between 1 and 15!');
        return;
    }

    if (data.type === 'Select Type') {
        alert('Please select Type!');
        return;
    }

    if (data.weight < 1 || data.weight > 15 || isNaN(data.weight) == true) {
        alert('Weight must be between 1 and 15!');
        return;
    }

    if (data.length < 1 || data.length > 100 || isNaN(data.length) == true) {
        alert('Length must be between 1 and 100!');
        return;
    }

    if (data.breed === 'Select Breed') {
        alert('Please select Breed!');
        return;
    }

    petArr.push(data); // thêm dữ liệu vừa nhập vào mảng
    saveToStorage();// lưu vào LocalStorage.

    // Gọi hàm hiển thị dữ liệu ra giao diện người dùng.
    renderTableData(petArr);

    // Xóa dữ liệu vừa nhập trên form.
    idInput.value = '';
    nameInput.value = '';
    ageInput.value = '';
    typeInput.value = 'Select Type';
    weightInput.value = '';
    lengthInput.value = '';
    colorInput.value = '#000000' ;
    breedInput.value = 'Select Breed';
    vaccinatedInput.checked = false;
    dewormedInput.checked = false;
    sterilizedInput.checked = false;
}); 

// Hàm xóa 1 hàng thông tin pet
function deletePet(x) {
    if (confirm('Are you sure?')) {
            petArr.splice(x, 1);
            renderTableData(petArr);
            document.getElementById(`healthy-btn`).textContent = 'Show Healthy Pet';
            healthyCheck = false;
            saveToStorage();
    }
}

// Sự kiện click button healthy 
let healthyPet;
let healthyCheck = false;
const healthyBtn = document.getElementById('healthy-btn');
healthyBtn.addEventListener('click', function (e) {
    healthyPet = petArr.filter((pet) => pet.vaccinated === true && pet.dewormed === true && pet.sterilized === true);
    
    if (healthyCheck) {
        document.getElementById(`healthy-btn`).textContent = 'Show Healthy Pet';
        renderTableData(petArr);
        healthyCheck = false;
    } else {
        document.getElementById(`healthy-btn`).textContent = 'Show All Pet';
        renderTableData(healthyPet);
        healthyCheck = true;
    }
});

// Bổ sung Animation cho Sidebar
document.querySelector('#sidebar').addEventListener('click', function (e) {
    this.classList.toggle('active');
})

// Hàm hiển thị option Breed
const renderBreed = function (x) {
    let petBreed = JSON.parse(localStorage.getItem('petBreed'));
    let optionDog = petBreed.filter((dog) => dog.type === 'Dog');
    let optionCat = petBreed.filter((cat) => cat.type === 'Cat');
    breedInput.innerHTML = `<option>Select Breed</option>`;
    if (typeInput.value === 'Dog') {
        for(let i = 0; i < optionDog.length; i++) {  
            const option = document.createElement('option');
            option.innerHTML = `${optionDog[i].breed}`
            breedInput.appendChild(option)
        }
    } else if (typeInput.value === 'Cat') {
        for(let i = 0; i < optionCat.length; i++) {  
            const option = document.createElement('option');
            option.innerHTML = `${optionCat[i].breed}`
            breedInput.appendChild(option)
        }
    }
}
