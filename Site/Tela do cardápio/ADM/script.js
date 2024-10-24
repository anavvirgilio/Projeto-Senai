//Página do cardápio

document.getElementById('uploadButton').addEventListener('click', function() {
    const fileInput = document.getElementById('fileInput');
    const imgCardapio = document.getElementById('imgCardapio');
    const message = document.getElementById('message');

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            imgCardapio.src = e.target.result;
            imgCardapio.hidden = false;
            message.classList.add('hidden');
        };

        reader.readAsDataURL(file);
    } else {
        message.classList.remove('hidden');
    }
});


