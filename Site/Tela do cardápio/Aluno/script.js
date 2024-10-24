// Simulação de recebimento do cardápio
document.addEventListener('DOMContentLoaded', function() {
    const imgCardapio = document.getElementById('imgCardapio');
    const message = document.getElementById('message');

    // Aqui você pode definir a imagem do cardápio
    const cardapioImage = 'caminho/para/imagem_do_cardapio.jpg'; // Altere para a URL real da imagem

    if (cardapioImage) {
        imgCardapio.src = cardapioImage;
        imgCardapio.hidden = false;
        message.classList.add('hidden');
    } else {
        message.classList.remove('hidden');
    }
});
