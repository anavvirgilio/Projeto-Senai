//Página do boletim adm


document.getElementById('uploadButton').addEventListener('click', function() {
    const fileInput = document.getElementById('fileInput');
    const studentId = document.getElementById('studentId').value;
    const imgBoletim = document.getElementById('imgBoletim');
    const message = document.getElementById('message');

    if (fileInput.files.length > 0 && studentId) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            // Simulando o armazenamento do boletim em uma "base de dados"
            const boletimImage = e.target.result;
            let boletins = JSON.parse(localStorage.getItem('boletins')) || {};
            boletins[studentId] = boletimImage; // Armazenando com o ID do aluno
            localStorage.setItem('boletins', JSON.stringify(boletins)); // Atualizando o localStorage
            imgBoletim.src = boletimImage;
            imgBoletim.hidden = false;
            message.classList.add('hidden');
        };

        reader.readAsDataURL(file);
    } else {
        message.classList.remove('hidden');
    }
});





