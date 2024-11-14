function toggleImage() {
    const icon = document.getElementById("addButtonIcon");
    const originalImage = "/public/img/add-button.png";
    const newImage = "/public/img/plus.png";

    icon.src = (icon.src.endsWith(originalImage)) ? newImage : originalImage;
    addQuestion(); // Llama a la función para agregar una pregunta al hacer clic
}

let currentStep = 1;
const totalSteps = 3;

function updateStepper() {
    const steps = document.querySelectorAll(".step");
    steps.forEach((step, index) => {
        step.classList.toggle("active", index === currentStep - 1);
        step.classList.toggle("completed", index < currentStep - 1);
    });

    document.getElementById("prevBtn").disabled = currentStep === 1;
    document.getElementById("nextBtn").disabled = currentStep === totalSteps;

    // Mostrar u ocultar contenido según el paso actual
    const contents = document.querySelectorAll(".step-content");
    contents.forEach((content, index) => {
        content.classList.toggle("active", index === currentStep - 1);
    });
}

function nextStep() {
    if (currentStep < totalSteps) {
        currentStep++;
        updateStepper();
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        updateStepper();
    }
}


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



// TERMINA ADDQUESTION (SI FUNCIONA CORRECTAMENTE)



/*
// Función para añadir una nueva pregunta ("BUENO")
function addQuestion() {
    const container = document.getElementById("questionsContainer");

    const questionBlock = document.createElement("div");
    questionBlock.classList.add("mb-3", "questionBlock");

    // Crear el label y el campo de texto para la pregunta
    const questionLabel = document.createElement("label");
    questionLabel.classList.add("form-label");
    questionLabel.textContent = "Nueva Pregunta";
    const questionInput = document.createElement("input");
    questionInput.type = "text";
    questionInput.classList.add("form-control");
    questionInput.placeholder = "Formular pregunta";

    // Crear el label y el select para el tipo de entrada
    const tipoEntradaLabel = document.createElement("label");
    tipoEntradaLabel.classList.add("form-label");
    tipoEntradaLabel.textContent = "Tipo de Entrada";
    const tipoEntradaSelect = document.createElement("select");
    tipoEntradaSelect.classList.add("form-control");
    tipoEntradaSelect.setAttribute("id", "tipoEntrada");
    tipoEntradaSelect.setAttribute("onchange", "toggleInputFields(this)");  
    tipoEntradaSelect.innerHTML = `
        <option value="">Selecciona un tipo</option>
        <option value="radio">Radio Button</option>
        <option value="checkbox">Checkbox</option>
        <option value="text">Campo de Texto</option>
        <option value="number">Campo Numérico</option>
        <option value="textarea">Área de Texto</option>
    `;

    // Crear los campos condicionales
    const radioTextInput = document.createElement("div");
    radioTextInput.classList.add("mb-3");
    radioTextInput.id = "radioTextInput";
    radioTextInput.style.display = "none";
    radioTextInput.innerHTML = `
        <label class="form-label">Opciones de Radio Button</label>
        <div id="radioOptionsContainer">
            <div class="input-group mb-2">
                <button class="btn btn-outline-success" onclick="addRadioOption()" type="button">+</button>
                <input type="text" class="form-control" placeholder="Escribe el texto de radio">
                <input type="text" class="form-control col-sm-2" style="margin-left: 10px;" placeholder="Valor">
            </div>
        </div>
    `;

    const checkboxTextInput = document.createElement("div");
    checkboxTextInput.classList.add("mb-3");
    checkboxTextInput.id = "checkboxTextInput";
    checkboxTextInput.style.display = "none";
    checkboxTextInput.innerHTML = `
        <label for="checkboxText" class="form-label">Opciones para Checkbox</label>
        <div id="checkOptionsContainer">
            <div class="input-group mb-2">
                <button class="btn btn-outline-success" onclick="addCheckOption()" type="button">+</button>
                <input type="text" id="checkboxText" class="form-control" placeholder="Escribe el texto del checkbox">
                <input type="text" class="form-control col-sm-2" style="margin-left: 10px;" placeholder="Valor">
            </div>
        </div>
    `;

    const textFieldInput = document.createElement("div");
    textFieldInput.classList.add("mb-3");
    textFieldInput.id = "textFieldInput";
    textFieldInput.style.display = "none";
    textFieldInput.innerHTML = `
        <label for="textField" class="form-label">Campo de Texto</label>
        <div id="textFieldOptionsContainer">
            <div class="input-group mb-2">
                <button class="btn btn-outline-success" onclick="addTextFieldOption()" type="button">+</button>
                <input type="text" id="textField" class="form-control" placeholder="Escribe el texto del campo de texto">
                <input type="text" class="form-control col-sm-2" style="margin-left: 10px;" placeholder="Valor">
            </div>
        </div>
    `;

    const numberFieldInput = document.createElement("div");
    numberFieldInput.classList.add("mb-3");
    numberFieldInput.id = "numberFieldInput";
    numberFieldInput.style.display = "none";
    numberFieldInput.innerHTML = `
        <label for="numberField" class="form-label">Campo Numérico</label>
        <div id="numberOptionsContainer">
            <div class="input-group mb-2">
                <button class="btn btn-outline-success" onclick="addNumberOption()" type="button">+</button>
                <input type="number" id="numberField" class="form-control" placeholder="Escribe un número">
                <input type="text" class="form-control col-sm-2" style="margin-left: 10px;" placeholder="Valor">
            </div>
        </div>
    `;

    const textareaFieldInput = document.createElement("div");
    textareaFieldInput.classList.add("mb-3");
    textareaFieldInput.id = "textareaFieldInput";
    textareaFieldInput.style.display = "none";
    textareaFieldInput.innerHTML = `
        <label for="textareaField" class="form-label">Área de Texto</label>
        <div id="textAreaOptionsContainer">
            <div class="input-group mb-2">
                <button class="btn btn-outline-success" onclick="addTextAreaOption()" type="button">+</button>
                <textarea id="textareaField" class="form-control" placeholder="Escribe el texto del área de texto"></textarea>
                <input type="text" class="form-control col-sm-2" style="margin-left: 10px;" placeholder="Valor">
            </div>
        </div>
    `;

    // Añadir los elementos creados al bloque de la pregunta
    questionBlock.appendChild(questionLabel);
    questionBlock.appendChild(questionInput);
    questionBlock.appendChild(tipoEntradaLabel);
    questionBlock.appendChild(tipoEntradaSelect);

    // Añadir los campos condicionales
    questionBlock.appendChild(radioTextInput);
    questionBlock.appendChild(checkboxTextInput);
    questionBlock.appendChild(textFieldInput);
    questionBlock.appendChild(numberFieldInput);
    questionBlock.appendChild(textareaFieldInput);

    // Agregar el bloque de pregunta al contenedor
    container.appendChild(questionBlock);
}*/



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


/* Sirve las nuevas preguntas
function toggleInputFields(selectElement) {
    const tipoEntrada = selectElement.value;
    const questionBlock = selectElement.closest('.questionBlock'); 

    // Ocultar todos los campos
    document.getElementById("radioTextInput").style.display = "none";
    document.getElementById("checkboxTextInput").style.display = "none";
    document.getElementById("textFieldInput").style.display = "none";
    document.getElementById("numberFieldInput").style.display = "none";
    document.getElementById("textareaFieldInput").style.display = "none";

    // Ocultar todos los campos
    questionBlock.querySelector("#radioTextInput").style.display = "none";
    questionBlock.querySelector("#checkboxTextInput").style.display = "none";
    questionBlock.querySelector("#textFieldInput").style.display = "none";
    questionBlock.querySelector("#numberFieldInput").style.display = "none";
    questionBlock.querySelector("#textareaFieldInput").style.display = "none";

    // Mostrar el campo correspondiente a la selección
    if (tipoEntrada === "radio") {
        questionBlock.querySelector("#radioTextInput").style.display = "block";
    } else if (tipoEntrada === "checkbox") {
        questionBlock.querySelector("#checkboxTextInput").style.display = "block";
    } else if (tipoEntrada === "text") {
        questionBlock.querySelector("#textFieldInput").style.display = "block";
    } else if (tipoEntrada === "number") {
        questionBlock.querySelector("#numberFieldInput").style.display = "block";
    } else if (tipoEntrada === "textarea") {
        questionBlock.querySelector("#textareaFieldInput").style.display = "block";
    }
}*/


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