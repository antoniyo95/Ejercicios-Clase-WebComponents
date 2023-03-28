/*
  1- Create a digital-clock component.
  2- Each second, we must calculate the time and update the component HTML
*/

class DigitalClock extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    setInterval(() => {
      // Obtener la hora y pintarla en el DOM
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      this.innerHTML = `
      <h1>Reloj Digital sin Shadow DOM</h1>
      <p>${hours} : ${minutes} : ${seconds}</p>`
    }, 1000);
  }

}

window.customElements.define("digital-clock", DigitalClock);