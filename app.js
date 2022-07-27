//Variables
const formulario = document.querySelector("#formulario");
const inputs = document.querySelectorAll("#formulario input");

const expresiones = {
  usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  password: /^.{4,12}$/, // 4 a 12 digitos.
  correo:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, //sacado de regex email.
  telefono: /^\d{7,14}$/, // 7 a 14 numeros.
};
//Funciones
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

const validarCampo = (expresion, input, campo) => {
  if (expresion.test(input.value)) {
    document
      .querySelector(`#grupo-${campo} input`)
      .classList.remove("border-red-400");
    document
      .querySelector(`#grupo-${campo} input`)
      .classList.add("border-green-400");
    document
      .querySelector(`#grupo-${campo} i`)
      .classList.remove("text-red-400", "opacity-100", "fa-times-circle");
    document
      .querySelector(`#grupo-${campo} i`)
      .classList.add("text-green-400", "opacity-100", "fa-check-circle");
    document
      .querySelector(`#grupo-${campo} .input-error`)
      .classList.remove("block");
    document
      .querySelector(`#grupo-${campo} .input-error`)
      .classList.add("hidden");
  } else {
    document
      .querySelector(`#grupo-${campo} input`)
      .classList.remove("border-green-400");
    document
      .querySelector(`#grupo-${campo} input`)
      .classList.add("border-red-400");
    document
      .querySelector(`#grupo-${campo} i`)
      .classList.remove("text-green-400", "opacity-100", "fa-check-circle");
    document
      .querySelector(`#grupo-${campo} i`)
      .classList.add("text-red-400", "opacity-100", "fa-times-circle");
    document
      .querySelector(`#grupo-${campo} .input-error`)
      .classList.remove("hidden");
    document
      .querySelector(`#grupo-${campo} .input-error`)
      .classList.add("block");
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
  }
};

//Eventos
inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
});
