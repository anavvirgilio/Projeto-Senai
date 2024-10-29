// Faltas do Aluno

const calendarElement = document.getElementById('calendar');
const selectedDaysElement = document.getElementById('selected-days');
const selectedInfoElement = document.getElementById('selected-info');
const monthSelector = document.getElementById('month-selector');
const yearSelector = document.getElementById('year-selector');
const loadCalendarButton = document.getElementById('load-calendar');

const userId = 'usuario_logado'; // Substitua pelo ID do usuário logado
const selectedEntries = []; // Array para armazenar as entradas selecionadas (data, aula)

// Preenche o seletor de meses
for (let i = 0; i < 12; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = new Date(0, i).toLocaleString('pt-BR', { month: 'long' });
    monthSelector.appendChild(option);
}

// Preenche o seletor de anos
const currentYear = new Date().getFullYear();
for (let i = currentYear - 10; i <= currentYear + 10; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    yearSelector.appendChild(option);
}

// Carrega as entradas de faltas do localStorage
function loadEntries() {
    const entries = JSON.parse(localStorage.getItem(userId)) || [];
    entries.forEach(entry => {
        selectedEntries.push(entry);
    });
    updateSelectedDays();
}

// Cria o calendário
function createCalendar(month, year) {
    calendarElement.innerHTML = ''; // Limpa o calendário anterior

    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Total de dias no mês
    const firstDay = new Date(year, month, 1).getDay(); // Primeiro dia do mês

    for (let i = 0; i < firstDay; i++) {
        calendarElement.innerHTML += '<div class="day"></div>'; // Espaços em branco para dias antes do primeiro
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'day';
        dayElement.innerHTML = `<strong>${day}</strong>`;
        
        // Adiciona aulas
        for (let aula = 1; aula <= 6; aula++) {
            const aulaElement = document.createElement('div');
            aulaElement.className = 'aula';
            aulaElement.innerHTML = `Aula ${aula}`;
            dayElement.appendChild(aulaElement);
            
            // Adiciona evento de clique para mudar a cor da aula
            aulaElement.onclick = (event) => {
                event.stopPropagation(); // Evita que o clique na aula propague para o dia
                aulaElement.classList.toggle('selected'); // Muda a cor da aula selecionada
                const selectedEntry = {
                    day,
                    month: month + 1,
                    year,
                    aula
                };
                const entryString = `${selectedEntry.day}/${selectedEntry.month}/${selectedEntry.year} - Aula ${selectedEntry.aula}`;
                
                if (!selectedEntries.some(entry => entry === entryString)) {
                    selectedEntries.push(entryString);
                    saveEntriesToLocalStorage(entryString); // Salva a entrada no localStorage
                    updateSelectedDays();
                }
                displaySelectedInfo(day, month, year);
            };
        }

        // Adiciona evento de clique para o dia
        dayElement.onclick = () => {
            displaySelectedInfo(day, month, year);
        };

        calendarElement.appendChild(dayElement);
    }
}

function updateSelectedDays() {
    selectedDaysElement.innerHTML = '<h2>Dias Selecionados:</h2>' + selectedEntries.map(entry => `<p>${entry}</p>`).join('');
}

function displaySelectedInfo(day, month, year) {
    const monthName = new Date(year, month).toLocaleString('pt-BR', { month: 'long' });
    selectedInfoElement.innerHTML = `Você selecionou: ${day} de ${monthName} de ${year}`;
}

// Salva as entradas de faltas no localStorage
function saveEntriesToLocalStorage(entry) {
    const entries = JSON.parse(localStorage.getItem(userId)) || [];
    entries.push(entry);
    localStorage.setItem(userId, JSON.stringify(entries));
}

// Carrega o calendário quando o botão é clicado
loadCalendarButton.onclick = () => {
    const month = parseInt(monthSelector.value);
    const year = parseInt(yearSelector.value);
    createCalendar(month, year);
};

// Inicializa o calendário para o mês e ano atuais
monthSelector.value = new Date().getMonth();
yearSelector.value = currentYear;
createCalendar(monthSelector.value, yearSelector.value);
loadEntries(); // Carrega as entradas ao iniciar


document.addEventListener('DOMContentLoaded', () => {
    const input_nota = document.getElementById('input_nota');
    const addNota = document.getElementById('addNota');
    const container_notas = document.getElementById('container_notas');

    const userId = 'usuario_logado'; // Substitua pelo ID do usuário logado

    // Carrega as notas do localStorage
    function loadNotes() {
        const notes = JSON.parse(localStorage.getItem(userId)) || [];
        notes.forEach(note => {
            const noteElement = createNoteElement(note);
            container_notas.appendChild(noteElement);
        });
    }

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

            // Salva a nota no localStorage
            saveNoteToLocalStorage(text);
        }
    }

    // Função para salvar a nota no localStorage
    function saveNoteToLocalStorage(note) {
        const notes = JSON.parse(localStorage.getItem(userId)) || [];
        notes.push(note);
        localStorage.setItem(userId, JSON.stringify(notes));
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
            const noteElement = event.target.parentElement;
            const noteText = noteElement.querySelector('#texto_nota').textContent;
            removeNoteFromLocalStorage(noteText); // Remove do localStorage
            noteElement.remove();
        }
    });

    // Função para remover a nota do localStorage
    function removeNoteFromLocalStorage(note) {
        let notes = JSON.parse(localStorage.getItem(userId)) || [];
        notes = notes.filter(n => n !== note);
        localStorage.setItem(userId, JSON.stringify(notes));
    }

    // Carrega as notas quando a página é carregada
    loadNotes();
});
