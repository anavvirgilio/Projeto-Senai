// Página do calendário escolar

document.addEventListener('DOMContentLoaded', () => {
    const noteDateElement = document.getElementById('noteDate');
    const noteTextElement = document.getElementById('noteText');
    const addNoteBtn = document.getElementById('addNoteBtn');
    const notesList = document.getElementById('notesList');

    // Simulação de identificação do usuário (exemplo: ID do usuário após login)
    const userId = "usuario123"; // Substitua com o ID real do usuário após login

    //const userId = localStorage.getItem("userId");

    // Carregar notas do localStorage ao iniciar
    loadNotes(userId);

    // Função para adicionar nota
    function addNote() {
        const date = noteDateElement.value;
        const text = noteTextElement.value;
        if (date && text) {
            const noteItem = document.createElement('li');
            noteItem.textContent = `${date}: ${text}`;

            // Criar botão de excluir
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Excluir';
            deleteBtn.style.marginLeft = '10px';
            deleteBtn.classList.add('delete-btn');

            // Adicionar evento ao botão de excluir
            deleteBtn.addEventListener('click', () => {
                notesList.removeChild(noteItem);
                saveNotes(userId);
            });

            // Adicionar o botão ao item da nota
            noteItem.appendChild(deleteBtn);
            notesList.appendChild(noteItem);
            
            // Limpar campos de entrada
            noteDateElement.value = '';
            noteTextElement.value = '';

            // Salvar notas no localStorage
            saveNotes(userId);
        } else {
            alert('Por favor, preencha a data e a nota.');
        }
    }

    // Função para salvar notas no localStorage para um usuário específico
    function saveNotes(userId) {
        const notes = [];
        notesList.querySelectorAll('li').forEach(noteItem => {
            const text = noteItem.firstChild.textContent;
            notes.push(text);
        });
        localStorage.setItem(`notes_${userId}`, JSON.stringify(notes));
    }

    // Função para carregar notas do localStorage para um usuário específico
    function loadNotes(userId) {
        const savedNotes = JSON.parse(localStorage.getItem(`notes_${userId}`)) || [];
        savedNotes.forEach(note => {
            const noteItem = document.createElement('li');
            noteItem.textContent = note;

            // Criar botão de excluir
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Excluir';
            deleteBtn.style.marginLeft = '10px';
            deleteBtn.classList.add('delete-btn'); 

            // Adicionar evento ao botão de excluir
            deleteBtn.addEventListener('click', () => {
                notesList.removeChild(noteItem);
                saveNotes(userId);
            });

            noteItem.appendChild(deleteBtn);
            notesList.appendChild(noteItem);
        });
    }

    addNoteBtn.addEventListener('click', addNote);

    generateCalendario();
});

// Calendário

document.addEventListener('DOMContentLoaded', () => {
    const mesAnteriorButton = document.getElementById('mesAnterior');
    const proximoMesButton = document.getElementById('proximoMes');
    const mesAnoDisplay = document.getElementById('mesAno');
    const calendarBody = document.getElementById('calendarBody');

    let currentDate = new Date();

    function renderCalendar(date) {
        calendarBody.innerHTML = '';

        const year = date.getFullYear();
        const month = date.getMonth();

        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const startDay = firstDayOfMonth.getDay();
        const endDate = lastDayOfMonth.getDate();

        mesAnoDisplay.textContent = `${date.toLocaleString('pt-BR', { month: 'long' })} ${year}`;

        let day = 1;
        for (let i = 0; i < 6; i++) { 
            const row = document.createElement('tr');
            for (let j = 0; j < 7; j++) { 
                const cell = document.createElement('td');
                if (i === 0 && j < startDay) {
                    cell.textContent = '';
                } else if (day > endDate) {
                    cell.textContent = '';
                } else {
                    cell.textContent = day;
                    day++;
                }
                row.appendChild(cell);
            }
            calendarBody.appendChild(row);
        }
    }

    function changeMonth(offset) {
        currentDate.setMonth(currentDate.getMonth() + offset);
        renderCalendar(currentDate);
    }

    mesAnteriorButton.addEventListener('click', () => changeMonth(-1));
    proximoMesButton.addEventListener('click', () => changeMonth(1));

    renderCalendar(currentDate);
});
