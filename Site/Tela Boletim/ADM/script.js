//Página do boletim

document.getElementById('uploadButton').addEventListener('click', function() {
    const fileInput = document.getElementById('fileInput');
    const imgBoletim = document.getElementById('imgBoletim');
    const message = document.getElementById('message');

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            imgBoletim.src = e.target.result;
            imgBoletim.hidden = false;
            message.classList.add('hidden');
        };

        reader.readAsDataURL(file);
    } else {
        message.classList.remove('hidden');
    }
});



