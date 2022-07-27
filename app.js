//Variables
const formulario = document.querySelector("#formulario");
const inputs = document.querySelectorAll("#formulario input");
const btnEnviar = document.querySelector("#submit");

const expresiones = {
  usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  password: /^.{4,12}$/, // 4 a 12 digitos.
  correo:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, //sacado de regex email.
  telefono: /^\d{7,14}$/, // 7 a 14 numeros.
};
const campos = {
  usuario: false,
  nombre: false,
  password: false,
  correo: false,
  telefono: false,
};
//Funciones
const iniciarApp = () => {
  btnEnviar.disabled = true;
  btnEnviar.classList.add("cursor-not-allowed", "opacity-50");
};

const validarFormulario = (e) => {
  switch (e.target.name) {
    //Dependiendo del atributo name del input hacer:
    case "usuario":
      validarCampo(expresiones.usuario, e.target, e.target.name);
      break;
    case "nombre":
      validarCampo(expresiones.nombre, e.target, e.target.name);
      break;
    case "password":
      validarCampo(expresiones.password, e.target, e.target.name);
      validarContraseñas();
      break;
    case "password2":
      validarContraseñas();
      break;
    case "correo":
      validarCampo(expresiones.correo, e.target, e.target.name);
      break;
    case "telefono":
      validarCampo(expresiones.telefono, e.target, e.target.name);
      break;
  }
};

const validarCampo = (expresion, input, name) => {
  if (expresion.test(input.value)) {
    //si pasa la validacion agregar y remover estas clases
    document
      .querySelector(`#grupo-${name} input`)
      .classList.remove("border-red-400");
    document
      .querySelector(`#grupo-${name} input`)
      .classList.add("border-green-400");
    document
      .querySelector(`#grupo-${name} i`)
      .classList.remove("text-red-400", "opacity-100", "fa-times-circle");
    document
      .querySelector(`#grupo-${name} i`)
      .classList.add("text-green-400", "opacity-100", "fa-check-circle");
    document
      .querySelector(`#grupo-${name} .input-error`)
      .classList.remove("block");
    document
      .querySelector(`#grupo-${name} .input-error`)
      .classList.add("hidden");
    //si pasa la validacion cambiar estado del objeto 'campos'
    campos[name] = true;
  } else {
    //si no pasa la validacion agregar y remover estas clases
    document
      .querySelector(`#grupo-${name} input`)
      .classList.remove("border-green-400");
    document
      .querySelector(`#grupo-${name} input`)
      .classList.add("border-red-400");
    document
      .querySelector(`#grupo-${name} i`)
      .classList.remove("text-green-400", "opacity-100", "fa-check-circle");
    document
      .querySelector(`#grupo-${name} i`)
      .classList.add("text-red-400", "opacity-100", "fa-times-circle");
    document
      .querySelector(`#grupo-${name} .input-error`)
      .classList.remove("hidden");
    document
      .querySelector(`#grupo-${name} .input-error`)
      .classList.add("block");
    //si no pasa la validacion cambiar estado del objeto 'campos'
    campos[name] = false;
  }
};
const validarContraseñas = () => {
  const password1 = document.querySelector("#password");
  const password2 = document.querySelector("#password2");
  if (password1.value !== password2.value) {
    document
      .querySelector("#grupo-password2 input")
      .classList.remove("border-green-400");
    document
      .querySelector("#grupo-password2 input")
      .classList.add("border-red-400");
    document
      .querySelector("#grupo-password2 i")
      .classList.remove("text-green-400", "fa-check-circle");
    document
      .querySelector("#grupo-password2 i")
      .classList.add("text-red-400", "opacity-100", "fa-times-circle");
    document
      .querySelector("#grupo-password2 .input-error")
      .classList.remove("hidden");
    document
      .querySelector("#grupo-password2 .input-error")
      .classList.add("block");
    //si las contraseñas no son iguales campos.password seguira siendo false
    campos.password = false;
  } else {
    document
      .querySelector("#grupo-password2 input")
      .classList.remove("border-red-400");
    document
      .querySelector("#grupo-password2 input")
      .classList.add("border-green-400");
    document
      .querySelector("#grupo-password2 i")
      .classList.add("text-green-400", "opacity-100", "fa-check-circle");
    document
      .querySelector("#grupo-password2 i")
      .classList.remove("text-red-400", "fa-times-circle");
    document
      .querySelector("#grupo-password2 .input-error")
      .classList.add("hidden");
    document
      .querySelector("#grupo-password2 .input-error")
      .classList.remove("block");
    //si las contraseñas son iguales campos.password pasas a true
    campos.password = true;
  }
};

const formularioValido = () => {
  const { usuario, nombre, password, correo, telefono } = campos;
  if (usuario && nombre && password && correo && telefono && terminos.checked) {
    btnEnviar.disabled = false;
    btnEnviar.classList.remove("cursor-not-allowed", "opacity-50");
  } else {
    btnEnviar.disabled = true;
    btnEnviar.classList.add("cursor-not-allowed", "opacity-50");
  }
};

const enviarFormulario = (e) => {
  e.preventDefault();
  const { usuario, nombre, password, correo, telefono } = campos;
  const mensajeExito = document.querySelector("#mensaje-exito ");
  const mensajeError = document.querySelector("#mensaje-error");
  //si todos los campos son o no validos
  if (usuario && nombre && password && correo && telefono && terminos.checked) {
    mensajeError.classList.remove("block");
    mensajeError.classList.add("hidden");
    mensajeExito.classList.remove("hidden");
    mensajeExito.classList.add("block");
    setTimeout(() => {
      mensajeExito.classList.add("hidden");
      removerEstilos();
      resetearFormulario();
    }, 3000);
    campos.usuario = false;
    campos.nombre = false;
    campos.password = false;
    campos.correo = false;
    campos.telefono = false;
  } else {
    mensajeExito.classList.add("hidden");
    mensajeError.classList.remove("hidden");
    mensajeError.classList.add("block");
  }
};

const removerEstilos = () => {
  inputs.forEach((input) => {
    if (input.parentElement.classList.contains("grupo-input")) {
      const estiloInput =
        input.parentElement.querySelector(".grupo-input input");
      const estiloIcono = input.parentElement.querySelector(".grupo-input i");
      estiloInput.classList.remove("border-green-400");
      estiloIcono.classList.remove("opacity-100");
    }
  });
};
const resetearFormulario = () => {
  formulario.reset();
  iniciarApp();
};
//Eventos
document.addEventListener("DOMContentLoaded", iniciarApp);
inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
});
formulario.addEventListener("click", formularioValido);
formulario.addEventListener("submit", enviarFormulario);
