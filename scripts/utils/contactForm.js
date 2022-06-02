// get DOM elements
const contactModal = document.getElementById("contact_modal");
const contactButton = document.getElementById("contact_button");
const modalCloseIcon = document.getElementById("close_modal");
const submitButton = document.getElementById("submit_button");
const ModalTabBarrierTop = document.getElementsByClassName("ModalTabBarrier")[0];
const ModalTabBarrierBottom = document.getElementsByClassName("ModalTabBarrier")[1];  

function focusOnFirstname() {
    document.getElementById("fname").focus();
}

function focusOnExitButton() {
    document.getElementById("close_modal").focus();
}


// EVENT LISTENERS
contactButton.addEventListener("click", function() {
    displayModal(contactModal);
    focusOnFirstname();
});
modalCloseIcon.addEventListener("click", closeModal.bind(null, contactModal));
submitButton.addEventListener("click", submitModal);
contactModal.addEventListener("keydown", function(event) {
    if(event.key=='Escape') {
        closeModal(contactModal);
    }
});

// trap focus in contact modal
ModalTabBarrierTop.addEventListener("focus", focusOnExitButton);
ModalTabBarrierBottom.addEventListener("focus", focusOnFirstname);





// FORM VALIDATION AND SUBMISSION


// get form DOM elements
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const message = document.getElementById("message");


// display an error message below the form field
function showErrorMessage(element, message) {
  element.nextElementSibling.textContent = message;
  element.className = 'text-control invalid';
}

// clear the error message below the form field
function clearErrorMessage(element) {
  element.nextElementSibling.textContent = '';
  element.className = 'text-control';
}

// check field is not empty
function checkFieldNotEmpty(field) {
  let valid = false;
  if (field.value.length >= 1) {
    clearErrorMessage(field);
    valid = true;
  } else {
    showErrorMessage(field, `Veuillez entrer au moins 1 caractère pour le champ ${field.labels[0].textContent}.`);
  }
  return valid;
}

// check email field for correct format
function checkEmail() {
  let valid = false;
  // email regular expression
  const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (emailRegExp.test(email.value)) {
    clearErrorMessage(email);
    valid = true;
  } else {
    showErrorMessage(email, "Veuillez entrer une adresse email valide.");
  }
  return valid;
}


// delay the execution of the validation functions to improve form perfomance and prevent from sending error messages immediately to the user
const debounce = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {
      // cancel the previous timer
      if (timeoutId) {
          clearTimeout(timeoutId);
      }
      // setup a new timer
      timeoutId = setTimeout(() => {
          fn.apply(null, args)
      }, delay);
  };
};

// for this exercise, submitting the modal is equivalent to showing the field values in the console and clearing them
function submitModal(e) {
    // prevent the form from submitting
    e.preventDefault();
    // call each individual function to validate the form fields
    let isFirstNameValid = checkFieldNotEmpty(fname),
        isLastNameValid = checkFieldNotEmpty(lname),
        isEmailValid = checkEmail(),
        isMessageValid = checkFieldNotEmpty(message);

    // determine if the form is valid. The form is valid only if all fields are valid.    
    let isFormValid = isFirstNameValid &&
                        isLastNameValid &&
                        isEmailValid &&
                        isMessageValid;

    // submit to the server if the form is valid. For this exercise: we'll simply console log and clear the form fiels
    if (isFormValid) {
        console.log(fname.value);
        console.log(lname.value);
        console.log(email.value);
        console.log(message.value);
        closeModal(contactModal);

        fname.value = "";
        lname.value = "";
        email.value = "";
        message.value = "";
    }
}  

// event listeners on individual form fields
fname.addEventListener('input', debounce(checkFieldNotEmpty.bind(null, fname)));
lname.addEventListener('input', debounce(checkFieldNotEmpty.bind(null, lname)));
email.addEventListener('input', debounce(checkEmail));
message.addEventListener('input', debounce(checkFieldNotEmpty.bind(null, message)))