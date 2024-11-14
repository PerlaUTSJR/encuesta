function toggleImage() {
    const icon = document.getElementById("addButtonIcon");
    const originalImage = "/public/img/add-button.png";
    const newImage = "/public/img/plus.png";

    icon.src = (icon.src.endsWith(originalImage)) ? newImage : originalImage;
    addQuestion(); // Llama a la función para agregar una pregunta al hacer clic
}

//Inicia Stepper
let currentStep = 1;
const totalSteps = 3;

function showStep(step) {
    // Mostrar solo el contenido del paso actual
    for (let i = 1; i <= totalSteps; i++) {
        document.getElementById(`step-${i}`).classList.toggle("active", i === step);
        document.querySelector(`.step[data-step="${i}"]`).classList.toggle("active", i === step);
    }

    // Actualizar estado de botones
    document.getElementById("prevBtn").style.display = step === 1 ? "none" : "inline-block";
    document.getElementById("nextBtn").textContent = step === totalSteps ? "Finalizar" : "Siguiente";
}

function validateStep(step) {
    let isValid = true;
    
    if (step === 1) {
        const nomEncuesta = document.getElementById("nomEncuesta");
        const descEncuesta = document.getElementById("descEncuesta");

        if (!nomEncuesta.value.trim()) {
            isValid = false;
            nomEncuesta.classList.add("is-invalid");
        } else {
            nomEncuesta.classList.remove("is-invalid");
        }

        if (!descEncuesta.value.trim()) {
            isValid = false;
            descEncuesta.classList.add("is-invalid");
        } else {
            descEncuesta.classList.remove("is-invalid");
        }
    }

    if (step === 2) {
        const pregunta = document.getElementById("pregunta");
        const tipoEntrada = document.getElementById("tipoEntrada");

        if (!pregunta.value.trim()) {
            isValid = false;
            pregunta.classList.add("is-invalid");
        } else {
            pregunta.classList.remove("is-invalid");
        }

        if (!tipoEntrada.value) {
            isValid = false;
            tipoEntrada.classList.add("is-invalid");
        } else {
            tipoEntrada.classList.remove("is-invalid");
        }
    }

    return isValid;
}

function nextStep() {
    if (validateStep(currentStep)) {
        if (currentStep < totalSteps) {
            currentStep++;
            showStep(currentStep);
        } else {
            alert("Formulario completado");
            // Aquí puedes agregar la acción final, como enviar el formulario.
        }
    } else {
        alert("Por favor, completa todos los campos requeridos.");
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    showStep(currentStep);
});

//Fin stepper

//Función para añadir preguntas
function addQuestion() {
    const questionsContainer = document.getElementById("questionsContainer");

    const questionWrapper = document.createElement("div");
    questionWrapper.classList.add("question-wrapper", "mb-4");

    const questionLabel = document.createElement("label");
    questionLabel.textContent = "Nueva Pregunta:";
    questionLabel.classList.add("form-label");

    const questionInput = document.createElement("input");
    questionInput.type = "text";
    questionInput.classList.add("form-control", "mb-2");
    questionInput.placeholder = "Escribe la pregunta";

    const typeLabel = document.createElement("label");
    typeLabel.textContent = "Tipo de Entrada";
    typeLabel.classList.add("form-label");

    const typeSelect = document.createElement("select");
    typeSelect.classList.add("form-control", "mb-2");
    typeSelect.innerHTML = `
        <option value="">Selecciona un tipo</option>
        <option value="radio">Radio Button</option>
        <option value="checkbox">Checkbox</option>
        <option value="text">Campo de Texto</option>
        <option value="number">Campo Numérico</option>
        <option value="textarea">Área de Texto</option>
    `;

    const optionsContainer = document.createElement("div");
    optionsContainer.classList.add("options-container");

    typeSelect.addEventListener("change", function() {
        const selectedType = typeSelect.value;
        optionsContainer.innerHTML = "";

        if (selectedType === "radio") addOptionFields(optionsContainer, "radio");
        if (selectedType === "checkbox") addOptionFields(optionsContainer, "checkbox");
        if (selectedType === "text") addOptionFields(optionsContainer, "text");
        if (selectedType === "number") addOptionFields(optionsContainer, "number");
        if (selectedType === "textarea") addOptionFields(optionsContainer, "textarea");
    });

    questionWrapper.appendChild(questionLabel);
    questionWrapper.appendChild(questionInput);
    questionWrapper.appendChild(typeLabel);
    questionWrapper.appendChild(typeSelect);
    questionWrapper.appendChild(optionsContainer);

    questionsContainer.appendChild(questionWrapper);
}

function addOptionFields(container, type) {
    if (type === "radio" || type === "checkbox") {
        const addButton = createAddButton(() => addOption(container, type));
        container.appendChild(addButton);
    } else if (type === "text") {
        container.appendChild(createSingleInput("Campo de Texto", "text"));
    } else if (type === "number") {
        container.appendChild(createSingleInput("Campo Numérico", "number"));
    } else if (type === "textarea") {
        container.appendChild(createTextarea("Área de Texto"));
    }
}

function addOption(container, type) {
    const optionWrapper = document.createElement("div");
    optionWrapper.classList.add("input-group", "mb-2", "align-items-center");

    // Botón de eliminar a la izquierda
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-outline-danger");
    deleteButton.textContent = "-";
    deleteButton.addEventListener("click", (e) => {
        e.preventDefault();
        container.removeChild(optionWrapper);
    });

    // Campo de texto para la opción
    const optionInput = document.createElement("input");
    optionInput.type = "text";
    optionInput.classList.add("form-control", "me-2"); // Añade margen a la derecha
    optionInput.placeholder = `Texto para ${type}`;

    // Campo de valor para la opción
    const valueInput = document.createElement("input");
    valueInput.type = "text";
    valueInput.classList.add("form-control", "ms-2"); // Añade margen a la izquierda
    valueInput.placeholder = "Valor";

    optionWrapper.appendChild(deleteButton);
    optionWrapper.appendChild(optionInput);
    optionWrapper.appendChild(valueInput);

    container.appendChild(optionWrapper);
}

function createAddButton(onClick) {
    const addButton = document.createElement("button");
    addButton.classList.add("btn", "btn-outline-success", "mb-2");
    addButton.textContent = "+ Añadir opción";
    addButton.addEventListener("click", (e) => {
        e.preventDefault();
        onClick();
    });
    return addButton;
}

function createSingleInput(placeholder, type) {
    const input = document.createElement("input");
    input.type = type;
    input.classList.add("form-control", "mb-2");
    input.placeholder = placeholder;
    return input;
}

function createTextarea(placeholder) {
    const textarea = document.createElement("textarea");
    textarea.classList.add("form-control", "mb-2");
    textarea.placeholder = placeholder;
    return textarea;
}

// Funciona en la pregunta principal
// Función para mostrar el campo de entrada adecuado según la selección
function toggleInputFields() {
    const tipoEntrada = document.getElementById("tipoEntrada").value;

    // Ocultar todos los campos
    document.getElementById("radioTextInput").style.display = "none";
    document.getElementById("checkboxTextInput").style.display = "none";
    document.getElementById("textFieldInput").style.display = "none";
    document.getElementById("numberFieldInput").style.display = "none";
    document.getElementById("textareaFieldInput").style.display = "none";

    // Mostrar el campo correspondiente a la selección
    if (tipoEntrada === "radio") {
        document.getElementById("radioTextInput").style.display = "block";
    } else if (tipoEntrada === "checkbox") {
        document.getElementById("checkboxTextInput").style.display = "block";
    } else if (tipoEntrada === "text") {
        document.getElementById("textFieldInput").style.display = "block";
    } else if (tipoEntrada === "number") {
        document.getElementById("numberFieldInput").style.display = "block";
    } else if (tipoEntrada === "textarea") {
        document.getElementById("textareaFieldInput").style.display = "block";
    }
}

function addRadioOption() {
    const container = document.getElementById("radioOptionsContainer");
    const optionDiv = document.createElement("div");
    optionDiv.classList.add("input-group", "mb-2");

    // Botón para eliminar la opción (moviéndolo al principio)
    const removeButton = document.createElement("button");
    removeButton.classList.add("btn", "btn-outline-danger");
    removeButton.type = "button";
    removeButton.innerText = "-";
    removeButton.onclick = function() {
        container.removeChild(optionDiv);
    };

    // Input para el texto del radio button
    const inputText = document.createElement("input");
    inputText.type = "text";
    inputText.classList.add("form-control");
    inputText.placeholder = "Texto para opción de radio button";

    // Input para el valor del radio button
    const inputValue = document.createElement("input");
    inputValue.type = "text";
    inputValue.classList.add("form-control");
    inputValue.style.marginLeft = "10px"; // Para dar espacio entre los inputs
    inputValue.placeholder = "Valor";

    // Agregar los elementos al div de la opción
    optionDiv.appendChild(removeButton);  // Botón de eliminar primero
    optionDiv.appendChild(inputText);
    optionDiv.appendChild(inputValue);
    container.appendChild(optionDiv);
}


function addCheckOption() {
    const container = document.getElementById("checkOptionsContainer");
    const optionDiv = document.createElement("div");
    optionDiv.classList.add("input-group", "mb-2");

    // Botón para eliminar la opción (moviéndolo al principio)
    const removeButton = document.createElement("button");
    removeButton.classList.add("btn", "btn-outline-danger");
    removeButton.type = "button";
    removeButton.innerText = "-";
    removeButton.onclick = function() {
        container.removeChild(optionDiv);
    };

    // Input para el texto del checkbox
    const inputText = document.createElement("input");
    inputText.type = "text";
    inputText.classList.add("form-control");
    inputText.placeholder = "Texto para opción de checkbox";

    // Input para el valor del checkbox
    const inputValue = document.createElement("input");
    inputValue.type = "text";
    inputValue.classList.add("form-control");
    inputValue.style.marginLeft = "10px"; // Para dar espacio entre los inputs
    inputValue.placeholder = "Valor";

    // Agregar los elementos al div de la opción
    optionDiv.appendChild(removeButton);  // Botón de eliminar primero
    optionDiv.appendChild(inputText);
    optionDiv.appendChild(inputValue);
    container.appendChild(optionDiv);
}


function addTextFieldOption() {
    const container = document.getElementById("textFieldOptionsContainer");
    const optionDiv = document.createElement("div");
    optionDiv.classList.add("input-group", "mb-2");

    // Botón para eliminar la opción (moviéndolo al principio)
    const removeButton = document.createElement("button");
    removeButton.classList.add("btn", "btn-outline-danger");
    removeButton.type = "button";
    removeButton.innerText = "-";
    removeButton.onclick = function() {
        container.removeChild(optionDiv);
    };

    // Input para el texto del text field
    const inputText = document.createElement("input");
    inputText.type = "text";
    inputText.classList.add("form-control");
    inputText.placeholder = "Texto para opción de textField";

    // Input para el valor del text field
    const inputValue = document.createElement("input");
    inputValue.type = "text";
    inputValue.classList.add("form-control");
    inputValue.style.marginLeft = "10px"; // Para dar espacio entre los inputs
    inputValue.placeholder = "Valor";

    // Agregar los elementos al div de la opción
    optionDiv.appendChild(removeButton);  // Botón de eliminar primero
    optionDiv.appendChild(inputText);
    optionDiv.appendChild(inputValue);
    container.appendChild(optionDiv);
}


function addNumberOption() {
    const container = document.getElementById("numberOptionsContainer");
    const optionDiv = document.createElement("div");
    optionDiv.classList.add("input-group", "mb-2");

    // Botón para eliminar la opción (moviéndolo al principio)
    const removeButton = document.createElement("button");
    removeButton.classList.add("btn", "btn-outline-danger");
    removeButton.type = "button";
    removeButton.innerText = "-";
    removeButton.onclick = function() {
        container.removeChild(optionDiv);
    };

    // Input para el texto del number
    const inputText = document.createElement("input");
    inputText.type = "text";
    inputText.classList.add("form-control");
    inputText.placeholder = "Texto para opción de numero";

    // Input para el valor del numero
    const inputValue = document.createElement("input");
    inputValue.type = "text";
    inputValue.classList.add("form-control");
    inputValue.style.marginLeft = "10px"; // Para dar espacio entre los inputs
    inputValue.placeholder = "Valor";

    // Agregar los elementos al div de la opción
    optionDiv.appendChild(removeButton);  // Botón de eliminar primero
    optionDiv.appendChild(inputText);
    optionDiv.appendChild(inputValue);
    container.appendChild(optionDiv);
}


function addTextAreaOption() {
    const container = document.getElementById("textAreaOptionsContainer");
    const optionDiv = document.createElement("div");
    optionDiv.classList.add("input-group", "mb-2");

    // Botón para eliminar la opción (moviéndolo al principio)
    const removeButton = document.createElement("button");
    removeButton.classList.add("btn", "btn-outline-danger");
    removeButton.type = "button";
    removeButton.innerText = "-";
    removeButton.onclick = function() {
        container.removeChild(optionDiv);
    };

    // Input para el texto del text area
    const inputText = document.createElement("input");
    inputText.type = "text";
    inputText.classList.add("form-control");
    inputText.placeholder = "Texto para opción de textArea";

    // Input para el valor del text area
    const inputValue = document.createElement("input");
    inputValue.type = "text";
    inputValue.classList.add("form-control");
    inputValue.style.marginLeft = "10px"; // Para dar espacio entre los inputs
    inputValue.placeholder = "Valor";

    // Agregar los elementos al div de la opción
    optionDiv.appendChild(removeButton);  // Botón de eliminar primero
    optionDiv.appendChild(inputText);
    optionDiv.appendChild(inputValue);
    container.appendChild(optionDiv);
}

updateStepper();