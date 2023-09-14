let isAdding = false;
let records = JSON.parse(localStorage.getItem("records")) || [];

function saveRecords() {
    localStorage.setItem("records", JSON.stringify(records));
}

function addData() {
    if (isAdding) {
        return;
    }

    isAdding = true;

    const textInput = document.getElementById("text-input").value.trim();
    const dropdownValue = document.getElementById("dropdown").value;

    if (textInput === "") {
        showModal("Alert....! Please enter a text value.");
        isAdding = false;
        return;
    }

    if (recordExists(textInput)) {
        showModal("Alert....! Data already exists.");
        isAdding = false;
        return;
    }

    const record = {
        text: textInput,
        option: dropdownValue,
        value: "",
    };

    records.push(record);

    document.getElementById("text-input").value = "";
    document.getElementById("dropdown").selectedIndex = 0;
    refreshInputField();
    refreshResults();

    setTimeout(() => {
        isAdding = false;
    }, 100);
}

function refreshResults() {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";

    for (let i = 0; i < records.length; i++) {
        const record = records[i];
        const recordDiv = document.createElement("div");

        const infoDiv = document.createElement("div");
        infoDiv.className = "info-field";
        infoDiv.textContent = `${record.text}`;
        const inputContainer = document.createElement("div");
        inputContainer.className = "input-container";


        if (record.option === "Date") {
            const dateInput = document.createElement("input");
            dateInput.type = "date";
            dateInput.name = "date-input";
            dateInput.value = record.value;
            inputContainer.prepend(dateInput);
        } else if (record.option === "Datetime") {
            const datetimeInput = document.createElement("input");
            datetimeInput.type = "datetime-local";
            datetimeInput.name = "datetime-input";
            datetimeInput.value = record.value;
            inputContainer.prepend(datetimeInput);
        } else if (record.option === "Text") {
            const textInput = document.createElement("input");
            textInput.type = "text";
            textInput.name = "text-input";
            textInput.value = record.value;
            inputContainer.prepend(textInput);
        } else if (record.option === "Number") {
            const numberInput = document.createElement("input");
            numberInput.type = "number";
            numberInput.name = "number-input";
            numberInput.value = record.value;
            inputContainer.prepend(numberInput);
        } else if (record.option === "Range") {
            const rangeInput = document.createElement("input");
            rangeInput.type = "range";
            rangeInput.name = "range-input";
            rangeInput.value = record.value;
            inputContainer.prepend(rangeInput);
        } else if (record.option === "Color") {
            const colorInput = document.createElement("input");
            colorInput.type = "color";
            colorInput.name = "color-input";
            colorInput.value = record.value;
            inputContainer.prepend(colorInput);
        } else if (record.option === "Email") {
            const emailInput = document.createElement("input");
            emailInput.type = "email";
            emailInput.name = "email-input";
            emailInput.placeholder = "Enter your email";
            inputContainer.appendChild(emailInput);
        } else if (record.option === "Submit") {
            const submitButton = document.createElement("button");
            submitButton.textContent = "Submit";
            submitButton.type = "submit";
            submitButton.style.width = "100px";
            submitButton.style.height = "40px";
            submitButton.style.backgroundColor = "#007bff";
            submitButton.style.color = "#ffffff";
            submitButton.style.border = "none";
            inputContainer.appendChild(submitButton);
        }
        // parentElement.insertBefore(newElement, parentElement.childNodes[2]);
        // recordDiv.insertBefore(infoDiv, recordDiv.childNodes[4])
        // recordDiv.insertBefore(inputContainer, recordDiv.childNodes[2])

        // recordDiv.insertAdjacentElement("afterbegin", infoDiv);
        // recordDiv.insertAdjacentElement("afterbegin", inputContainer);

        recordDiv.appendChild(infoDiv);
        recordDiv.appendChild(inputContainer);

        const buttonContainer = document.createElement("div");
        buttonContainer.className = "button-container";

        const saveButton = document.createElement("button");
        saveButton.textContent = "Save";
        saveButton.className = "record-button";
        saveButton.addEventListener("click", function (event) {
            event.preventDefault();
            saveData(record);
        });

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.className = "delete-button";
        removeButton.addEventListener("click", function () {
            records.splice(i, 1);
            localStorage.setItem("records", JSON.stringify(records));
            refreshResults();
        });

        buttonContainer.appendChild(saveButton);
        buttonContainer.appendChild(removeButton);

        recordDiv.appendChild(buttonContainer);
        resultDiv.prepend(recordDiv);
    }
}

function resetForm() {
    document.getElementById("text-input").value = "";
    document.getElementById("dropdown").selectedIndex = 0;
    document.getElementById("input-container").innerHTML = "";
}

function showModal(message) {
    const modal = document.getElementById("message-modal");
    const messageText = document.getElementById("message-text");
    const closeButton = document.getElementById("close-modal");

    messageText.textContent = message;

    modal.style.display = "block";
    closeButton.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
}

function recordExists(text) {
    return records.some(record => record.text === text);
}

function saveData(record) {
    const inputElement = record.option === "Submit"
        ? document.querySelector(".input-container button[type='submit']")
        : document.querySelector(`.input-container input[name='${record.option.toLowerCase()}-input']`);

    if (inputElement) {
        const updatedValue = inputElement.value;
        record.value = updatedValue;
        saveRecords();
        refreshResults();
    }
}

document.addEventListener("DOMContentLoaded", function () {

    refreshResults();

    const addButton = document.getElementById("add-button");
    const dropdown = document.getElementById("dropdown");

    addButton.addEventListener("click", function (event) {
        event.preventDefault();
        addData();
    });

    dropdown.addEventListener("change", function () {
        refreshInputField();
    });
});
function refreshInputField() {
    const dropdownValue = document.getElementById("dropdown").value;
    const inputContainer = document.getElementById("input-container");
    inputContainer.innerHTML = "";
}