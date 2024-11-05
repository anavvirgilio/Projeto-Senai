// Faltas do Aluno

alert("Atenção: antes de adicionar suas faltas aperte o botão carregar calendário");

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
    selectedDaysElement.innerHTML = '<h2>Dias Selecionados:</h2>' +
        selectedEntries.map(entry => `
            <p>${entry} <button class="delete-falta-btn" onclick="deleteEntry('${entry}')">Excluir</button></p>
        `).join('');
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

// Função para excluir uma entrada de falta
function deleteEntry(entry) {
    // Remove do array de entradas selecionadas
    const index = selectedEntries.indexOf(entry);
    if (index > -1) {
        selectedEntries.splice(index, 1);
    }

    // Atualiza o localStorage
    const entries = JSON.parse(localStorage.getItem(userId)) || [];
    const updatedEntries = entries.filter(e => e !== entry);
    localStorage.setItem(userId, JSON.stringify(updatedEntries));

    // Atualiza a exibição dos dias selecionados
    updateSelectedDays();
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
