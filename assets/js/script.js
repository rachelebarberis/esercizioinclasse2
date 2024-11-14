const now = new Date();
const getYear = now.getFullYear();
const getMonth = now.getMonth();
const meetingForm= document.querySelector('form');
const appointments = [];

const monthNames = [
    'Gennaio', 
    'Febbraio', 
    'Marzo', 
    'Aprile', 
    'Maggio', 
    'Giugno', 
    'Luglio', 
    'Agosto', 
    'Settembre', 
    'Ottobre', 
    'Novembre', 
    'Dicembre',
];
const dayNames = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab',];

document.addEventListener('load', init());

function init() {
    printCurrentMonth();
    dayInThisMonth();
    createDays(dayInThisMonth());
    const nowDate = now.getDate();
    if(appointments[nowDate].length > 0) { 
        showAppointments(nowDate); //mostra eventuali appuntamenti
    } else {
        const appointmentsDiv =document.getElementById('appointments');
        appointmentsDiv.style.display='none';

    }
}
//nome del mese 
function printCurrentMonth () {
    const title = document.querySelector('h1');
    const currentMonth = monthNames[getMonth];
    title.innerText = currentMonth;
}

//calcolo numero di giorni per griglia e array

function dayInThisMonth () {
    const lastDayInTheMonth= new Date(getYear, getMonth + 1, 0) //imposta lo zero del mese successivo che non esiste e di conseguenza è l'ultimo del mese in corso (es:lo zero dicembre 2024 equivale al 30 novembre 2024)
    const numberOfDays =lastDayInTheMonth.getDate(); //restitusce il numero del giorno
    console.log(lastDayInTheMonth);
    console.log(numberOfDays);
    return numberOfDays; //perche mi serve in giro
}

function createDays(daysNumber) {
    const calendarDiv=document.getElementById('calendar');
    for (let i = 0; i < daysNumber; i++) {
        appointments.push([]);

        //creazione griglia
        const dayCellDiv = document.createElement('div');
        dayCellDiv.classList.add('day');
        //le celle devono essere cliccabili
        dayCellDiv.addEventListener('click', function() {
            unselectAllDays();
            dayCellDiv.classList.add('selected');
            changeMeetingSection(i); //modifica per poter inserire nuovi appuntamenti
            if(appointments[i].length > 0) { 
                showAppointments(i); //mostra eventuali appuntamenti
            } else {
                const appointmentsDiv =document.getElementById('appointments');
                appointmentsDiv.style.display='none'; //nascondi il div appuntamenti
            }
        });

        const cellValue= document.createElement('h3')
        const thisDate= i + 1;
        if (thisDate == now.getDate()) {
            dayCellDiv.classList.add('currentDay');
        }

        let thisDay = new Date (now.getFullYear(), now.getMonth(), thisDate);
            if (thisDay.getDay() === 0) {
                cellValue.classList.add('sunday');
            }

        //nome del giorno
        let dayNumber = thisDay.getDay();
        let dayName = dayNames[dayNumber];
        cellValue.innerText = `${dayName} ${i + 1}`;

        dayCellDiv.appendChild(cellValue);
        calendarDiv.appendChild(dayCellDiv);

    }
}

function unselectAllDays() {
    const previousSelected = document.querySelector('.selected');
    if (previousSelected) {
        previousSelected.classList.remove('selected');
    }
}

function changeMeetingSection(dayDate) {
    const newMeetingDay = document.getElementById('newMeetingDay');
    newMeetingDay.innerText = dayDate + 1;
    newMeetingDay.classList.add('hasDay');
}

function showAppointments(dayDate) {
    const dayAppointments= appointments[dayDate];
    const appointmentsList=document.querySelector('#appointments ul');
    appointmentsList.innerHTML='';
    dayAppointments.forEach((appointment) => {
        const newLi =document.createElement('li');
        newLi.innerText = appointment;
        appointmentsList.appendChild(newLi);
    });

    const appointmentsDiv =document.getElementById('appointments');
    appointmentsDiv.style.display ='block';
}

meetingForm.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(e) {
    e.preventDefault();
    const selectedDay = document.getElementById('newMeetingDay').innerText;
    const meetingTime= document.getElementById('newMeetingTime').value;
    const meetingName= document.getElementById('newMeetingName').value;
    const meetingString = `${meetingTime} - ${meetingName}`;
    const dayIndex = parseInt(selectedDay)- 1;
    
    appointments[dayIndex].push(meetingString);
    meetingForm.reset();
    showAppointments(dayIndex);


const dot = document.createElement('span');
dot.classList.add('dot');
const selectedCell= document.querySelector('.selected');
if(!selectedCell.querySelector('.dot')) {
    selectedCell.appendChild(dot);
}

}