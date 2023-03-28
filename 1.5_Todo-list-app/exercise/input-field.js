/*
input-field

atributos:
- buttonLabel
- placeholder

eventos:
- submit (value del input)

funcionamiento: cuando el usuario pulse el botón de submit, debemos vaciar el input
*/

const templateElement = document.createElement("template");

templateElement.innerHTML = `
<style>

  .input-field-wrapper {
    display: flex;
  }

  input {
    flex-grow: 1;
  }

</style>

<div class="input-field-wrapper">
  <input type="text">
  <button></button>
</div>

`;

class InputField extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.buttonLabel = this.getAttribute('buttonLabel') || 'Añadir';
    this.placeholder = this.getAttribute('placeholder') || 'Escribe algo para añadirlo';
  }

  connectedCallback() {
    const template = templateElement.content.cloneNode(true);
    this.shadowRoot.appendChild(template);

    const submitButtonElement = this.shadowRoot.querySelector('button');
    const inputElement = this.shadowRoot.querySelector('input');

    submitButtonElement.textContent = this.buttonLabel;
    inputElement.placeholder = this.placeholder;

    submitButtonElement.addEventListener('click', () => {
      const inputValue = inputElement.value;

      const event = new CustomEvent("submit", {
        detail: inputValue
      })

      this.dispatchEvent(event);

      inputElement.value = "";
    })
  }
}

window.customElements.define("input-field", InputField);