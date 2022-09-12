'use strict';
// Hàm hiển thị thông tin Pet
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
                            </td>
                        </tr>`;
        tableBodyEl.appendChild(row)
    }
}
// Bắt sự kiện click nút Search
const findBtn = document.getElementById('find-btn');
findBtn.addEventListener('click', function (e) {
    let petArr = JSON.parse(localStorage.getItem('petArr'));// Lấy dữ liệu pet trên Local Storage

    const idSearch = document.getElementById('input-id').value;
    const nameSearch = document.getElementById('input-name').value;
    const typeSearch = document.getElementById('input-type').value;
    const breedSearch = document.getElementById('input-breed').value;
    const vaccinatedInput = document.getElementById('input-vaccinated').checked;
    const dewormedInput = document.getElementById('input-dewormed').checked;
    const sterilizedInput = document.getElementById('input-sterilized').checked;

    // Check điều kiện Search
    if (idSearch === '' && nameSearch === '' && typeSearch === 'Select Type' && breedSearch === 'Select Breed' && vaccinatedInput == false && dewormedInput == false && sterilizedInput == false) {
        const tableBodyEl = document.getElementById('tbody');
        tableBodyEl.innerHTML = '';
    } else {
        let typePetSearch = typeSearch ==='Select Type' ? '' : typeSearch;
        let breedPetSearch = breedSearch ==='Select Breed' ? '' : breedSearch; 
        let vaccinatedSearch = vaccinatedInput === true ? vaccinatedInput.toString() : '';
        let dewormedSearch = dewormedInput === true ? dewormedInput.toString() : '';
        let sterilizedSearch = sterilizedInput === true ? sterilizedInput.toString() : '';
        let PetSearch = petArr.filter((value) => value.id.toUpperCase().includes(idSearch.toUpperCase())&& value.name.toUpperCase().includes(nameSearch.toUpperCase()) && (value.type.includes(typePetSearch)) && (value.breed.includes(breedPetSearch)) && value.vaccinated.toString().includes(vaccinatedSearch) && value.dewormed.toString().includes(dewormedSearch) && value.sterilized.toString().includes(sterilizedSearch));
        renderTableData(PetSearch);
    }
})

// Hàm hiển thị các option Breed
const renderBreed = function () {
    let petBreed = JSON.parse(localStorage.getItem('petBreed'));
    for(let i = 0; i < petBreed.length; i++) {  
        const option = document.createElement('option');
        option.innerHTML = `${petBreed[i].breed}`
        document.getElementById('input-breed').appendChild(option)
    }
}
     