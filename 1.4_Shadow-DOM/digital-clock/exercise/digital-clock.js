/*
  1- Create a digital-clock component using shadow DOM.
  2- Each second, we must calculate the time and update the component HTML
  3- Maybe we should use custom-properties...
*/

class DigitalClock extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: "open"})
  }

  connectedCallback() {
    setInterval(() => {
      // obtener la hora y pintarla en el DOM
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      this.innerHTML = `${hours} : ${minutes} : ${seconds}`;
    }, 1000);
  }

}

window.customElements.define("digital-clock", DigitalClock);