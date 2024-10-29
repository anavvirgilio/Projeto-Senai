// Boletim aluno


document.addEventListener('DOMContentLoaded', function() {
    const imgBoletim = document.getElementById('imgBoletim');
    const message = document.getElementById('message');
    const fetchBoletimButton = document.getElementById('fetchBoletimButton');
    const studentIdInput = document.getElementById('studentId');

    fetchBoletimButton.addEventListener('click', function() {
        const studentId = studentIdInput.value;
        let boletins = JSON.parse(localStorage.getItem('boletins')) || {};
        const boletimImage = boletins[studentId];

        if (boletimImage) {
            imgBoletim.src = boletimImage;
            imgBoletim.hidden = false;
            message.classList.add('hidden');
        } else {
            message.classList.remove('hidden');
            message.textContent = "Boletim não encontrado para o ID informado.";
        }
    });
});


