document.addEventListener('DOMContentLoaded', () => {
    const input_nota = document.getElementById('input_nota');
    const addNota = document.getElementById('addNota');
    const container_notas = document.getElementById('container_notas');

    // Função para criar uma nova nota
    function createNoteElement(text) {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.innerHTML = `
            <span id="texto_nota">${text}</span>
            <button class="delete-btn">X</button>
        `;
        return noteElement;
    }

    // Função para adicionar uma nova nota
    function addNote() {
        const text = input_nota.value.trim();
        if (text) {
            const noteElement = createNoteElement(text);
            container_notas.appendChild(noteElement);
            noteElement.classList.add('fade-in'); // Adiciona a classe de animação
            input_nota.value = '';
        }
    }

    // Adiciona uma nota ao clicar no botão
    addNota.addEventListener('click', addNote);

    // Adiciona uma nota ao pressionar Enter
    input_nota.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addNote();
        }
    });

    // Remove a nota ao clicar no botão de excluir
    container_notas.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-btn')) {
            event.target.parentElement.remove();
        }
    });
});
