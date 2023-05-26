const inputDay = document.getElementById('day');
const inputMonth = document.getElementById('month');
const inputYear = document.getElementById('year');
const error = document.getElementById('input_error');

const button = document.querySelector('button');

const date = new Date();
const currentYear = date.getFullYear();
const currentDay = date.getDate();
const currentMonth = date.getMonth() + 1;

function isValidDate(day, month, year) {
    const testDate = new Date(year, month - 1, day);
    return (
      testDate.getDate() === day && testDate.getMonth() === month - 1 && testDate.getFullYear() === year
    );
  }

inputYear.addEventListener('input', function () {
    if ((inputYear && inputYear.value) > currentYear) {
        error.innerHTML = `Invalid Date: Year must be lower than ${currentYear}`;
        error.style.color = 'hsl(0, 100%, 67%)';
        return false;
    }
})

//calculation
button.addEventListener('click', function(e){

    const day = parseInt(inputDay.value);
    const month = parseInt(inputMonth.value);
    const year = parseInt(inputYear.value);

    let ageYears = currentYear - year;      //calculate in years
    let ageMonths = currentMonth - month;   // calculate in months
    let ageDays = currentDay - day;         // calculate in days
    
    const spanDay = document.getElementById('result_day');
    const spanMonth = document.getElementById('result_month');
    const spanYear = document.getElementById('result_year');
    
    e.preventDefault();

    if (!isValidDate(day, month, year)) {
        error.innerHTML = "Invalid Date";
        error.style.color = 'hsl(0, 100%, 67%)';
        spanDay.innerHTML = "- -";
        spanMonth.innerHTML = "- -";
        spanYear.innerHTML = "- -";
        return false;
    }

    if (ageDays < 0) {                                                                          // if currentDay before birthday -> 
        ageMonths--;                                                                            // decrease month by 1
        const prevMonthDays = new Date(currentYear, currentMonth - 1, 0).getDate();             //days in previous month -> 0 gets last day
        ageDays += prevMonthDays;                                                               // Add the number of days in the previous month to the age in years                                                         
    } 
    
    if (ageMonths < 0) {                                                                        // Adjust the age if the current month is before the birth month
        ageYears--;                                                                             // Decrease the years
        ageMonths += 12;                                                                        // Add 12 months to the age
    }

    let remainingDays = new Date(currentYear, currentMonth - 1, currentDay) - new Date(year, month - 1, day);
    remainingDays = Math.floor(remainingDays / (1000 * 60 * 60 * 24));                          // convert milliseconds to days 
    
    const remainingYears = Math.floor(remainingDays / 365);
    remainingDays -= remainingYears * 365;
    const remainingMonths = Math.floor(remainingDays / 30);
    remainingDays -= remainingMonths * 30;

    spanDay.innerHTML = remainingDays;
    spanMonth.innerHTML = remainingMonths;
    spanYear.innerHTML = remainingYears;
    })