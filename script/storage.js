'use strict';
// Lưu thông tin pet lên Local Storage
let saveToStorage = function () {
    localStorage.setItem('petArr', JSON.stringify(petArr));
}
// Lấy dữ liêu Local Storage hiển thị thông tin lên web  
const getFormStorage = function () {
    if (localStorage.getItem('petArr')) {
        petArr = JSON.parse(localStorage.getItem('petArr'));
        renderTableData(petArr);
    } else {
        petArr = [];
    }
}

// Lưu thông tin Breed của Pet 
let saveBreed = function () {
    localStorage.setItem('petBreed', JSON.stringify(petBreed))
}
// Lấy dữ liêu Local Storage hiển thị thông tin lên web  
const getFormBreed = function () {  
    if (localStorage.getItem('petBreed')) {
        petBreed= JSON.parse(localStorage.getItem('petBreed'));
        renderTableBreed(petBreed);
    } else {
        petBreed = [];
    }
}