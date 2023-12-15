//Aqui se toman las etiquetas para posteriormente evaluar sus valores.
let mainForm = document.forms['mainForm'];
let email = document.forms['mainForm']['email'];
let username = document.forms['mainForm']['username'];
let password = document.forms['mainForm']['password'];
let password2 = document.forms['mainForm']['confirm-password'];
let day = document.getElementById('select-days');
let month = document.getElementById('select-month');
let year = document.getElementById('select-year');

// Se seleccionan estos divs que contienen los mensajes de errores para presentarlos si se necesita.
let email_error = document.getElementsByClassName('email_error')[0];
let username_error = document.getElementsByClassName('username_error')[0];
let password_error = document.getElementsByClassName('password_error')[0];
let password2_error = document.getElementsByClassName('password2_error')[0];
let birth_error = document.getElementsByClassName('birth_error')[0];
let age_error = document.getElementsByClassName('age_error')[0];

//Evento que escucha cuando se presiona el boton "Sign Up" del formulario.
mainForm.addEventListener('submit', function (event) {
    event.preventDefault();
    inputsValidation();
});

//Esta funcion verifica que todos los campos esten correctos.
function inputsValidation() {
    let validated = true;

    if (isValidEmail(email.value)) {
        email_error.style.display = "none";
    } else {
        email_error.style.display = "block";
        validated = false
    }

    if (username.value.length < 5) {
        username_error.style.display = "block";
        validated = false;
    } else {
        username_error.style.display = "none";
    }

    if (password.value.length < 8) {
        password_error.style.display = "block";
        validated = false;
    } else {
        password_error.style.display = "none";
    }

    if (password2.value !== password.value) {
        password2_error.style.display = "block";
        validated = false;
    } else {
        password2_error.style.display = "none";
    }

    if (isValidDate(year.value, month.value, day.value)) {
        birth_error.style.display = "none";
    } else {
        birth_error.style.display = "block";
        validated = false;
    }

    if (isValidAge(year.value, month.value, day.value) >= 18) {
        age_error.style.display = "none";
    } else {
        age_error.style.display = "block";
        validated = false;
    }

    if (validated) {
        localStorage.setItem('username', username.value);
        window.location.href = '../assets/welcomepage/welcome.html';
    }

    return validated;
}

//Verifica si el email contiene los caracteres deseados en el orden correcto.
function isValidEmail(email) {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

//Verifica si la fecha es valida.
function isValidDate(value3, value2, value1) {

    const date = new Date(value3, value2, value1);

    return (
        date.getFullYear() == value3 &&
        date.getMonth() == value2 &&
        date.getDate() == value1
    );
}

//Calcula la edad para saber si eres mayor de 18
function isValidAge(value3, value2, value1) {
    const actualDate = new Date();
    const date = new Date(value3, value2, value1);
    let difference = actualDate - date;

    let age = Math.floor(difference / (1000*60*60*24*365.25));

    return age;
}