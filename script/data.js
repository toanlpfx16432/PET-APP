'use strict';
// Bắt sự kiên click Export tải về file thông tin Pet 
let petArr = JSON.stringify(JSON.parse(localStorage.getItem('petArr')), null, '\t');
const importBtn = document.getElementById('export-btn');
importBtn.addEventListener('click', function (e) {
    let blob = new Blob([petArr], {type: "text/plain;charset=utf-8"});  
    saveAs(blob, 'thucung.json');
  })

// Bắt sự kiện click Import dựa vào dữ liệu fiel nhập vào ô input để đọc file json và lưu về Loocal Storage
const fileSelector = document.getElementById('import-btn');
fileSelector.addEventListener('click', (event) => {
    var file = document.getElementById("input-file").files[0];
    if (file) {
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            localStorage.setItem('petArr', JSON.stringify(JSON.parse(reader.result)));
            alert('Successful Import')
        }
        reader.onerror = function (evt) {
            alert('Error')
        }
    }
});


