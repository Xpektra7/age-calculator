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
  

  validateInput();

  const yearValue = year.value;
  const monthValue = month.value;
  const dayValue = day.value;


  if (validateInput()) {
    const birthTime = new Date(yearValue,monthValue-1,dayValue);
    
    const age = currentTime - birthTime;
    let yearAge = Math.floor(age/(3600 * 24 * 365 * 1000));
    let monthAge = ((Math.floor(age/(3600 * 2 * 365 * 1000))) % 12);
    let dayAge = Math.floor((age/(3600 * 24 * 1000)) % (365/12)) - 5;
    if (dayAge < 0){
      monthAge -= 1;
      dayAge += Math.floor(365/12);
    }

    ageYear.innerHTML = yearAge;
    ageMonth.innerHTML = monthAge;
    ageDay.innerHTML = dayAge;
  }       
}  