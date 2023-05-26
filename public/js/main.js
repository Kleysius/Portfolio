const fileInput = document.querySelector('.file-input');
const fileName = document.querySelector('.file-name');
const previewImage = document.getElementById('preview-image');

fileInput.addEventListener('change', function () {
    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            previewImage.setAttribute('src', e.target.result);
        };
        reader.readAsDataURL(fileInput.files[0]);
        fileName.textContent = fileInput.files[0].name;
        previewImage.style.display = 'block';
    } else {
        previewImage.style.display = 'none';
        fileName.textContent = '';
    }
});