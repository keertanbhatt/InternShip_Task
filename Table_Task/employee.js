const alphanumericRegex = /^[a-z\d\-_\s]+$/i;
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
// const emailRegex =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
// const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
const phoneRegex = /^[0-9]+$/;


/**
 * Format date function to desired format
 * @param {any} dateStr
 * @returns {any}
 */

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * get employee from local storage
 * @returns {any}
 */
function getEmployeesFromLocalStorage() {
  return JSON.parse(localStorage.getItem("employees")) || [];
}

function setEmployeesInLocalStorage(employees) {
  localStorage.setItem("employees", JSON.stringify(employees));
}

/**
 * Check if employee is valid and apply specific validation on it
 * @returns {FormValid}
 */
function isEmployeeValid() {
  const inputs = document.querySelectorAll("input[required]");
  inputs.forEach((input) => {
    if (input.validity.valid) {
      input.classList.remove("error-border");
    } else {
      input.classList.add("error-border");
    }
  });
  let FormValid = true;
  const nameValue = document.getElementById("name").value.trim();
  const genderInputs = document.querySelectorAll('input[name="gender"]');
  const dobValue = new Date(document.getElementById("dob").value);
  const emailValue = document.getElementById("email").value.trim();
  const phoneValue = document.getElementById("phone").value.trim();

  let nameError = "";
  let genderError = "";
  let dobError = "";
  let emailError = "";
  let phoneError = "";
  let deleteError ="";

  if (nameValue === "") {
    nameError = "Name field is required.";
    FormValid = false;
  } else if (nameValue.length < 4 || nameValue.length > 20) {
    nameError = "Name field should be between 4 to 20 characters.";
    FormValid = false;
  } else if (!alphanumericRegex.test(nameValue)) {
    nameError = "Name field should contain only letters not special character!.";
    FormValid = false;
  }

  let genderSelected = false;
  genderInputs.forEach((input) => {
    if (input.checked) {
      genderSelected = true;
    }
  });
  if (!genderSelected) {
    genderError = "Please select a gender (Male or Female).";
    FormValid = false;
  }

  var startDate = new Date(11, 11, 1910);

  const currentDate = new Date();
  if (document.getElementById("dob").value.trim() === "") {
    dobError = "Date of birth field is required.";
    FormValid = false;
  }else if(dobValue < startDate){
    dobError = "Please enter a valid date. The date entered is not valid!";
    FormValid = false;
  }
   else if (!dobValue || dobValue > currentDate) {
    dobError = "Please enter a valid date. Future date is not allowed.";
    FormValid = false;
  }

  if (emailValue === "") {
    emailError = "Email field is required.";
    FormValid = false;
  } else if (!emailRegex.test(emailValue)) {
    emailError = "Please provide a valid email address.";
    FormValid = false;
  }
  // const cleanedPhoneNumber = phoneValue.replace(/[\s-]+/g,'');
  // if(phoneRegex.test(cleanedPhoneNumber)) {
  //   return true
  // }
  if (phoneValue !== "" && phoneValue.length < 10) {
    phoneError = "Phone number length should be 10 numbers.";
    FormValid = false;
  }else if (!phoneRegex.test(phoneValue)){
    phoneError = "Phone number should not include -";
    FormValid = false;
  }

  document.getElementById("name-error").textContent = nameError;
  document.getElementById("gender-error").textContent = genderError;
  document.getElementById("dob-error").textContent = dobError;
  document.getElementById("email-error").textContent = emailError;
  document.getElementById("phone-error").textContent = phoneError;

  return FormValid;
}
/**
 * get form input from the user
 * @returns {any}
 */

function getFormInputValues() {
  const name = document.getElementById("name").value;
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const dob = document.getElementById("dob").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const hobbies = Array.from(
    document.querySelectorAll('input[name="hobbie"]:checked')
  ).map((hobby) => hobby.value);

  return {
    name,
    gender,
    dob,
    email,
    phone,
    hobbies,
  };
}
let isEditMode = false;

/**
 * IF employee data is valid than show the submit button to submit the data
 * @returns {any}
 */
function submitForm() {
  event.preventDefault();

  if (isEmployeeValid()) {
    const employee = getFormInputValues();
    const employees = getEmployeesFromLocalStorage();

    if (isEditMode) {
      const editedIndex = document.getElementById("edit-index").value;
      employees[editedIndex] = employee;
      isEditMode = false;
    } else {
      employees.push(employee);
    }

    setEmployeesInLocalStorage(employees);
    document.getElementById("employeeForm").reset();
    document.querySelector(".submit-button").innerHTML = `
      <input type="submit" value="Submit" onclick="submitForm()">
    `;

    displayEmployees();
  }
}
/**
 * Edit employee details from the user input 
 * @param {any} index
 * @returns {any}
 */

function editEmployee(index) {
  const employees = getEmployeesFromLocalStorage();
  const employee = employees[index];

  document.getElementById("name").value = employee.name;
  document.querySelector(
    `input[name="gender"][value="${employee.gender}"]`
  ).checked = true;
  document.getElementById("dob").value = employee.dob;
  document.getElementById("email").value = employee.email;
  document.getElementById("phone").value = employee.phone;
  employee.hobbies.forEach((hobby) => { 
    document.querySelector(
      `input[name="hobbie"][value="${hobby}"]`
    ).checked = true;
  });

  const submitButton = document.querySelector(".submit-button");
  submitButton.innerHTML = `
    <div class="edit-cancel-buttons">
      <input type="hidden" id="edit-index" value="${index}">
      <button class="update-button" type="button" onclick="submitForm()">Update</button>
      <button class="cancel-button" type="button" onclick="cancelEdit()">Cancel</button>
    </div>
  `;

  isEditMode = false;

}

/**
 * cancel the edit when the button is clicked
 * @returns {any}
 */
function cancelEdit() {
  document.getElementById("employeeForm").reset();
  document.querySelector(".submit-button").innerHTML = `
    <input type="submit" value="Submit" onclick="submitForm()">
  `;

  isEditMode = false;
}
/**
 * Delete employee details 
 * @param {any} index
 * @returns {any}
 */

function deleteEmployeeData(index) {
  const employees = getEmployeesFromLocalStorage();
  const employee = employees[index];
  const employeeName = employee.name;

  const confirm = window.confirm(
    `Are you sure you want to delete ${employeeName}'s data?`
  );

  if (confirm) {
    employees.splice(index, 1);
    setEmployeesInLocalStorage(employees);
    displayEmployees();
  }
  document.getElementById("employeeForm").reset();
  const submitButton = document.querySelector(".submit-button");
  submitButton.innerHTML = `
    <div class="edit-cancel-buttons">
      <input type="hidden" id="edit-index" value="${index}">
      <button class="cancel-button" type="button" onclick="cancelEdit()">Cancel</button>
    </div>
  `;
}
/**
 * Display employee details 
 * @returns {any}
 */

function displayEmployees() {
  //local storage
  let employees = getEmployeesFromLocalStorage();

  const tableBody = document
    .getElementById("table")
    .getElementsByTagName("tbody")[0];

  tableBody.innerHTML = "";
 
  employees.forEach((employee, index) => {
    const hobbies = employee.hobbies.join(", ");
    const formattedDate = formatDate(employee.dob);
    const row = `
      <tr>
        <td>${employee.name}</td>
        <td>${employee.gender}</td> 
        <td>${formattedDate}</td>
        <td>${employee.email}</td>
        <td>${employee.phone}</td>
        <td>${hobbies}</td>
        <td class="actions"><button onclick="editEmployee(${index})" class="edit">Edit</button>
        <button onclick="deleteEmployeeData(${index})" class="delete">Delete</button></td>
      </tr>
    `;
    
    tableBody.innerHTML += row;
  });

}

document.addEventListener("DOMContentLoaded", displayEmployees);