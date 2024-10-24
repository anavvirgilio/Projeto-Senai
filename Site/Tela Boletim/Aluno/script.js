// Simulação de recebimento do cardápio
document.addEventListener('DOMContentLoaded', function() {
    const imgBoletim = document.getElementById('imgBoletim');
    const message = document.getElementById('message');

    // Aqui você pode definir a imagem do cardápio
    const boletimImage = 'caminho/para/imagem_do_boletim.jpg'; // Altere para a URL real da imagem

    if (boletimImage) {
        imgBoletim.src = boletimImage;
        imgBoletim.hidden = false;
        message.classList.add('hidden');
    } else {
        message.classList.remove('hidden');
    }
});
