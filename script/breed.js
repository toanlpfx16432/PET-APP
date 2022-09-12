'use strict';

let petBreed  = []; // mảng chứa breed của pet.

// Hàm hiển thị thông tin breed.
function renderTableBreed (pet) {
    const tableBreed = document.getElementById('tbody');
    tableBreed.innerHTML = '';
    for(let i = 0; i < pet.length; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `<tr>
                            <td scope="col">${i + 1}</td>
                            <td scope="col"">${pet[i].breed}</td>
                            <td scope="col"">${pet[i].type}</td>
                            <td scope="col""><button type="button" class="btn btn-danger" onclick='deleteBreed(${i})'>Delete</button></td>
                        </tr>`;
        tableBreed.appendChild(row)
    }
}
// Bắt sự kiện click button submit 
const submitBreed = document.getElementById('submit-btn');
submitBreed.addEventListener('click', function (e) {
    const breedInput = document.getElementById('input-breed');
    const typeInput = document.getElementById('input-type');
    const data = {
        breed: breedInput.value,
        type: typeInput.value,
    }
    // Validate form 
    if(data.breed === '') {
        alert('Please input for Breed!');
        return
    }
    if (data.type === 'Select Type') {
        alert('Please select Type!');
        return;
    }

    petBreed.push(data);// thêm dữ liệu vào mảng.
    saveBreed(); // lưu vào localStorage
    renderTableBreed(petBreed); // gọi hàm hiển thị 
});

// Hàm xóa Breed
function deleteBreed(x) {
    if (confirm('Are you sure?')) {
            petBreed.splice(x, 1);
            renderTableBreed(petBreed);
            saveBreed();
    }
}