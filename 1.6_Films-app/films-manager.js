/*
films-manager

atributos
- 0

eventos:
- 0

responsabilidad:
- escuchar lo que el usuario quiere buscar
- buscar la peli via API
- pintar peliculas
- borrar peliculas con una nueva búsqueda.
*/

import "../../1.5_todo-list-app/exercise/input-field.js";
import "./film-item.js";

const templateElement = document.createElement("template");

templateElement.innerHTML = `
<style>

.films-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

</style>

<div class="films-manager-wrapper">
  <input-field></input-field>
  <section class="films-list"></section>
</div>

`;

class FilmsManager extends HTMLElement {

  OMDB_API_KEY = "e477ed6a";
  API_URL = `http://www.omdbapi.com/?apikey=${this.OMDB_API_KEY}`;

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const template = templateElement.content.cloneNode(true);
    this.shadowRoot.appendChild(template);

    const inputFieldElement = this.shadowRoot.querySelector('input-field');
    inputFieldElement.addEventListener('submit', (event) => {
      this.shadowRoot.querySelector('.films-list').innerHTML = '';
      this.searchFilms(event.detail);
    })
  }

  async searchFilms(filmName) {
    const response = await fetch(`${this.API_URL}&s=${filmName}`);
    const data = await response.json();
    const films = data.Search;

    films.forEach(async (film) => {
      const response = await fetch(`${this.API_URL}&i=${film.imdbID}`);
      const data = await response.json();

      const newFilm = {
        name: data.Title,
        image: data.Poster,
        rating: parseInt(data.imdbRating) * 10,
      }

      this.drawFilm(newFilm)

    });
  }

  drawFilm(film) {
    const divElement = document.createElement('div');
    divElement.innerHTML = `
      <film-item image="${film.image}" name="${film.name}" rating="${film.rating}"></film-item>
    `;

    this.shadowRoot.querySelector('.films-list').appendChild(divElement)
  }
}

customElements.define("films-manager", FilmsManager);