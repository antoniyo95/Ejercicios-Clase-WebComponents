/*
list-item

atributos:
- value
- buttonLabel

eventos:
- deleteItem

funcionamiento: pintar un elemento con el texto procedente del atributo value.
Cuando se pulse el botón de borrado, hay que emitir el evento deleteItem y eliminar el componente
*/

const templateElement = document.createElement("template");

templateElement.innerHTML = `
<style>

.list-item-wrapper {
  display: flex;
}

span {
  flex-grow: 1;
}

</style>

<div class="list-item-wrapper">
  <span></span>
  <button></button>
</div>

`;

class ListItem extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.value = this.getAttribute('value') || 'Estudiar programación';
    this.buttonLabel = this.getAttribute('buttonLabel') || '❌';
  }

  connectedCallback() {
    const template = templateElement.content.cloneNode(true);
    this.shadowRoot.appendChild(template);

    const deleteItemElement = this.shadowRoot.querySelector('button');

    this.shadowRoot.querySelector('span').textContent = this.value;
    deleteItemElement.textContent = this.buttonLabel;

    deleteItemElement.addEventListener('click', () => {
      const event = new CustomEvent("deleteItem")
      this.dispatchEvent(event);
      this.remove();
    })
  }
}

customElements.define("list-item", ListItem);