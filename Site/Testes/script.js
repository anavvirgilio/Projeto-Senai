// Página de anotações do adm


document.addEventListener('DOMContentLoaded', () => {
  const input_nota = document.getElementById('input_nota');
  const addNota = document.getElementById('addNota');
  const container_notas = document.getElementById('container_notas');

  // Simulação de ID de usuário após o login
  const userId = localStorage.getItem("userId") || "usuario123"; // Substitua com o ID real após login
  localStorage.setItem("userId", userId); // Armazenar o ID do usuário

  // Carregar notas ao iniciar
  loadNotes(userId);

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

          // Salvar nota no localStorage
          saveNote(userId, text);
      }
  }

  // Função para salvar notas no localStorage
  function saveNote(userId, note) {
      const existingNotes = JSON.parse(localStorage.getItem(`notes_${userId}`)) || [];
      existingNotes.push(note);
      localStorage.setItem(`notes_${userId}`, JSON.stringify(existingNotes));
  }

  // Função para carregar notas do localStorage
  function loadNotes(userId) {
      const savedNotes = JSON.parse(localStorage.getItem(`notes_${userId}`)) || [];
      savedNotes.forEach(note => {
          const noteElement = createNoteElement(note);
          container_notas.appendChild(noteElement);
      });
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
          const noteText = event.target.previousElementSibling.textContent;
          event.target.parentElement.remove();
          removeNoteFromStorage(userId, noteText); // Remove nota do localStorage
      }
  });

  // Função para remover nota do localStorage
  function removeNoteFromStorage(userId, noteText) {
      const existingNotes = JSON.parse(localStorage.getItem(`notes_${userId}`)) || [];
      const updatedNotes = existingNotes.filter(note => note !== noteText);
      localStorage.setItem(`notes_${userId}`, JSON.stringify(updatedNotes));
  }
});

