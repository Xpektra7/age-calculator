const form = document.getElementById('form');
  
const day = document.getElementById('day');
const dayParent = document.getElementById('day').parentElement;
const dayMessage = document.getElementById('day').nextElementSibling;

const month = document.getElementById('month');
const monthParent = document.getElementById('month').parentElement;
const monthMessage = document.getElementById('month').nextElementSibling;

const year = document.getElementById('year');
const yearParent = document.getElementById('year').parentElement;
const yearMessage = document.getElementById('year').nextElementSibling;

const ageDay = document.getElementById('ageDay');
const ageMonth = document.getElementById('ageMonth');
const ageYear = document.getElementById('ageYear');

const currentTime = Date.now();
const currentYear = (new Date()).getFullYear();




form.addEventListener("submit", (e) => {
  
  e.preventDefault();

  calculateAge();
})

function validateInput() {


  if (month.value > 12) {
    setError(month,"Must be a valid month")
  } 
  else if(month.value == 0){
    setError(month,"This field is required.");
  }
  else {
    setSuccess(month);
  };

  if (year.value < 1) {
    setError(year,"This field is required.");
  }
  else if(year.value > currentYear ) {
    setError(year,"Year must be in past");
  }
   else {
    setSuccess(year);
  };

  if(day.value> 31){
    setError(day,"Must be a valid day");
  }
  else if(day.value === ""){
    setError(day,"This field is required.")
  }
  else if((month.value == (9 || 4 || 6 || 11)) & (day.value > 30)){
    setError(day,"Must be a valid day");
  }
  else if((month.value == 2) & (day.value > 29)){
    setError(day,"Must be a valid day");
  }
  else{
    setSuccess(day);
  };

  if ((month.parentElement.classList.contains('error')) || (year.parentElement.classList.contains('error')) || (year.parentElement.classList.contains('error'))) {
    return false;
  } else{
    return true;
  }
}

function setError(object,message) {
  object.parentElement.classList.add('error');
  object.nextElementSibling.innerHTML = message;
}
function setSuccess(object) {
  object.parentElement.classList.remove('error');
  object.nextElementSibling.innerHTML= "";
}
function calculateAge() {
  validateInput(); // Call to your validation function

  const yearValue = year.value;
  const monthValue = month.value;
  const dayValue = day.value;

  if (validateInput()) {
    const birthTime = new Date(yearValue, monthValue - 1, dayValue);
    const currentTime = new Date(); // Assuming this exists

    // Calculate the difference in years, months, and days
    let yearAge = currentTime.getFullYear() - birthTime.getFullYear();
    let monthAge = currentTime.getMonth() - birthTime.getMonth();
    let dayAge = currentTime.getDate() - birthTime.getDate();

    // Adjust month and day if the current date is earlier in the month/year
    if (dayAge < 0) {
      // Go to the previous month and adjust the day difference
      const previousMonth = new Date(currentTime.getFullYear(), currentTime.getMonth(), 0);
      dayAge += previousMonth.getDate(); // Add the days from the previous month
      monthAge--;
    }

    if (monthAge < 0) {
      // If the current month is earlier than the birth month, adjust year and month difference
      monthAge += 12; // Add 12 to month difference
      yearAge--; // Decrease the year by 1
    }

    // Output the results without changing your HTML
    ageYear.innerHTML = yearAge;
    ageMonth.innerHTML = monthAge;
    ageDay.innerHTML = dayAge;
  }
}
