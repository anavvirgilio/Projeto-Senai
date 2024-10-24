/*Página de Faltas do aluno*/


const calendarElement = document.getElementById('calendar');
const selectedDaysElement = document.getElementById('selected-days');
const selectedInfoElement = document.getElementById('selected-info');
const monthSelector = document.getElementById('month-selector');
const yearSelector = document.getElementById('year-selector');
const loadCalendarButton = document.getElementById('load-calendar');

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
