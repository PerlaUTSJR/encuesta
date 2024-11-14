function toggleImage() {
    const icon = document.getElementById("addButtonIcon");
    const originalImage = "/public/img/add-button.png";
    const newImage = "/public/img/plus.png";

    // Cambiar imagen cuando se pase el cursor
    icon.src = (icon.src.endsWith(originalImage)) ? newImage : originalImage;
    
    // Llama a la función para agregar una pregunta
    addQuestion();
}

// Cambiar imagen cuando el cursor entre en el botón
document.getElementById("addButtonIcon").addEventListener("mouseenter", function() {
    const icon = document.getElementById("addButtonIcon");
    icon.src = "/public/img/plus.png"; // Cambiar imagen a "plus.png"
});

// Volver a la imagen original cuando el cursor salga
document.getElementById("addButtonIcon").addEventListener("mouseleave", function() {
    const icon = document.getElementById("addButtonIcon");
    icon.src = "/public/img/add-button.png"; // Volver a "add-button.png"
});


// Inicia función stepper
let currentStep = 1;

function nextStep() {
    if (validateStep(currentStep)) {
        currentStep++;
        if (currentStep === 3) { // Cambia el número 3 si tienes más o menos pasos
            submitForm(); // Llamada a la función para mostrar la información en la consola
        } else {
            showStep(currentStep);
        }
    }
}


function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }
}

function showStep(step) {
    // Ocultar todos los pasos
    const steps = document.querySelectorAll('.step-content');
    steps.forEach(stepContent => {
        stepContent.classList.remove('active');
    });

    // Mostrar el paso actual
    const stepContent = document.getElementById(`step-${step}`);
    stepContent.classList.add('active');

    // Actualizar las clases de los pasos en el stepper
    const stepElements = document.querySelectorAll('.step');
    stepElements.forEach((stepElement, index) => {
        if (index + 1 === step) {
            stepElement.classList.add('active');
        } else {
            stepElement.classList.remove('active');
        }
    });

    // Controlar el estado de los botones
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    // Deshabilitar el botón "Anterior" en el primer paso
    if (step === 1) {
        prevBtn.disabled = true;  // Deshabilitado en el paso 1
    } else {
        prevBtn.disabled = false; // Habilitado en los demás pasos
    }

    // Habilitar el botón "Siguiente" en cualquier paso excepto el último (si quieres)
    if (step === 3) {
        nextBtn.disabled = true; // Deshabilitado en el paso 3
    } else {
        nextBtn.disabled = false; // Habilitado en los demás pasos
    }
}

// Asegurarse de que el botón "Anterior" esté deshabilitado por defecto
document.addEventListener('DOMContentLoaded', () => {
    const prevBtn = document.getElementById('prevBtn');
    prevBtn.disabled = true;  // Deshabilitar el botón "Anterior" al inicio
});


// Validación de los pasos
function validateStep(step) {
    let isValid = true;

    if (step === 1) {
        // Validar Paso 1: Datos de Encuesta
        const nomEncuesta = document.getElementById('nomEncuesta');
        const descEncuesta = document.getElementById('descEncuesta');
        const nomEncuestaError = document.getElementById('nomEncuestaError');
        const descEncuestaError = document.getElementById('descEncuestaError');

        // Resetear los errores
        nomEncuestaError.style.display = 'none';
        descEncuestaError.style.display = 'none';

        // Verificar si los campos están vacíos
        if (nomEncuesta.value.trim() === '') {
            nomEncuestaError.style.display = 'block';
            isValid = false;
        }

        if (descEncuesta.value.trim() === '') {
            descEncuestaError.style.display = 'block';
            isValid = false;
        }
    } else if (step === 2) {
        // Validar Paso 2: Agregar Preguntas
        const pregunta = document.getElementById('pregunta');
        const tipoEntrada = document.getElementById('tipoEntrada');
        const preguntaError = document.getElementById('preguntaError');
        const tipoEntradaError = document.getElementById('tipoEntradaError');

        // Resetear los errores
        preguntaError.style.display = 'none';
        tipoEntradaError.style.display = 'none';

        // Verificar si los campos están vacíos
        if (pregunta.value.trim() === '') {
            preguntaError.style.display = 'block';
            isValid = false;
        }

        if (tipoEntrada.value.trim() === '') {
            tipoEntradaError.style.display = 'block';
            isValid = false;
        }
    }

    return isValid;
}


// Termina función stepper


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
        container.appendChild(createTextarea("Escribir en Área de Texto"));
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



// Arreglo global para almacenar los datos de la encuesta
let encuestaData = [];

function logData() {
    let nomEncuesta = document.getElementById('nomEncuesta').value;
    let descEncuesta = document.getElementById('descEncuesta').value;
    let pregunta = document.getElementById('pregunta').value;
    let tipoEntrada = document.getElementById('tipoEntrada').value;

    // Guardar la información 
    encuestaData = [
        { nombre: nomEncuesta, descripcion: descEncuesta },
        { pregunta: pregunta, tipoEntrada: tipoEntrada }
    ];

    // Mostrar la información en la consola
    console.log("Información de la encuesta:", encuestaData);
}

// Función para enviar el formulario
function submitForm() {
    // Obtener los valores de los campos de la encuesta
    const nomEncuesta = document.getElementById('nomEncuesta').value;
    const descEncuesta = document.getElementById('descEncuesta').value;

    // Iniciar el array de preguntas
    const preguntas = [];
    const questionWrappers = document.querySelectorAll(".question-wrapper");

    questionWrappers.forEach(questionWrapper => {
        const pregunta = questionWrapper.querySelector("input[type='text']").value; // Asume que la pregunta está en un campo de texto
        const tipoEntrada = questionWrapper.querySelector("select").value; // Asume que el tipo de entrada está en un select
        const opciones = [];

        // Aquí, debes agregar la lógica para obtener las opciones basadas en el tipo de entrada
        if (tipoEntrada === 'radio') {
            const radios = questionWrapper.querySelectorAll("input[type='radio']");
            radios.forEach(radio => {
                if (radio.checked) {
                    opciones.push(radio.value); // Añade la opción seleccionada
                }
            });
        } else if (tipoEntrada === 'checkbox') {
            const checkboxes = questionWrapper.querySelectorAll("input[type='checkbox']");
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    opciones.push(checkbox.value); // Añade la opción seleccionada
                }
            });
        }

        // Añadir la pregunta y las opciones al array
        preguntas.push({
            pregunta,
            tipoEntrada,
            opciones
        });
    });

    // Mostrar en consola los datos recogidos
    console.log({
        encuesta: {
            nombre: nomEncuesta,
            descripcion: descEncuesta
        },
        preguntas: preguntas
    });
}
