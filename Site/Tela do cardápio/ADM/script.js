

// Página do cardápio adm

document.addEventListener('DOMContentLoaded', function () {
    const imgCardapio = document.getElementById('imgCardapio');
    const message = document.getElementById('message');

    // Carrega a imagem armazenada no localStorage, se existir
    const savedImage = localStorage.getItem('cardapioImage');
    if (savedImage) {
        imgCardapio.src = savedImage;
        imgCardapio.hidden = false;
        message.classList.add('hidden');
    }

    document.getElementById('uploadButton').addEventListener('click', function () {
        const fileInput = document.getElementById('fileInput');

        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const reader = new FileReader();

            reader.onload = function (e) {
                imgCardapio.src = e.target.result;
                imgCardapio.hidden = false;
                message.classList.add('hidden');

                // Salva a imagem no localStorage
                localStorage.setItem('cardapioImage', e.target.result);
            };

            reader.readAsDataURL(file);
        } else {
            message.classList.remove('hidden');
        }
    });
});



