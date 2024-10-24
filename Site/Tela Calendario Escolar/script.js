
// Página do calendário escolar

document.addEventListener('DOMContentLoaded', () => {
    const noteDateElement = document.getElementById('noteDate');
    const noteTextElement = document.getElementById('noteText');
    const addNoteBtn = document.getElementById('addNoteBtn');
    const notesList = document.getElementById('notesList');

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
            deleteBtn.classList.add('delete-btn'); // Estilo opcional

            // Adicionar evento ao botão de excluir
            deleteBtn.addEventListener('click', () => {
                notesList.removeChild(noteItem);
            });

            // Adicionar o botão ao item da nota
            noteItem.appendChild(deleteBtn);
            notesList.appendChild(noteItem);
            noteDateElement.value = '';
            noteTextElement.value = '';
        } else {
            alert('Por favor, preencha a data e a nota.');
        }
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


