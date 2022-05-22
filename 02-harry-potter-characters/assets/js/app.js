const searchInput = document.querySelector('.harry-potter__input');
const charactersContainer = document.querySelector('.harry-potter__characters');
const modalContainer = document.querySelector('.modal__content');
const closeModalBtn = document.querySelector('.modal__close-btn');

let allCharacters = [];

const createCharactersCard = (characters) => {
  const contentHtml = characters
    .map((character) => {
      const { name, house, hogwartsStudent, image } = character;

      const status = hogwartsStudent ? 'Hogwarts Student' : 'Hoghwarts Staff';

      return `
    <article class="harry-potter__character" id="${name}">
    <header class="harry-potter__header">
          <img class="harry-potter__img" src="${image}" alt="${name}" />
        </header>
        <h5 class="harry-potter__name">${name}</h5>
        <p class="harry-potter__house">${house}</p>
        <p class="harry-potter__status">${status}</p>
      </article>
    `;
    })
    .join('');

  charactersContainer.innerHTML = contentHtml;
};

const getAllCharacters = async () => {
  try {
    const res = await fetch('https://hp-api.herokuapp.com/api/characters');
    const data = await res.json();
    allCharacters = data.slice(0, 25); // only first 25 characters
    createCharactersCard(allCharacters);
  } catch (err) {
    console.error(err);
  }
};

// Get All Characters When the Page First Load
getAllCharacters();

const searchCharacter = () => {
  const searchValue = searchInput.value.toLowerCase();

  const filteredData = allCharacters.filter((character) =>
    character.name.toLowerCase().includes(searchValue)
  );

  createCharactersCard(filteredData);
};

searchInput.addEventListener('keyup', searchCharacter);

// Detail of a Character
const createModal = (character) => {
  const {
    name,
    gender,
    house,
    dateOfBirth,
    wizard,
    ancestry,
    eyeColour,
    hairColour,
    wand,
    patronus,
    hogwartsStudent,
    actor,
    image,
  } = character;

  const content = `
    <img class="modal__img" src="${image}" alt="${name}" />
    <div>
      <h3 class="modal__name">${name}</h3>
      <p class="modal__actor">(${actor})</p>
      <div class="modal__info">
        <table>
          <tr>
            <th>House</th>
            <td>${house ? house : '-'}</td>
          </tr>
          <tr>
            <th>Status</th>
            <td>${hogwartsStudent ? 'Hogwarts Student' : 'Hogwarts Staff'}</td>
          </tr>
          <tr>
            <th>Gender</th>
            <td>${gender}</td>
          </tr>
          <tr>
            <th>Date of Birth</th>
            <td>${dateOfBirth ? dateOfBirth : '-'}</td>
          </tr>
          <tr>
            <th>Wizard</th>
            <td>${wizard ? 'yes' : 'no'}</td>
          </tr>
          <tr>
            <th>Wand</th>
            <td>${
              wand.wood
                ? `Wood (${wand.wood}), core (${wand.core}), length (${
                    wand.length ? wand.length : '-'
                  })`
                : '-'
            }</td>
          </tr>
          <tr>
            <th>Ancestry</th>
            <td>${ancestry ? ancestry : '-'}</td>
          </tr>
          <tr>
            <th>Eye Colour</th>
            <td>${eyeColour ? eyeColour : '-'}</td>
          </tr>
          <tr>
            <th>Hair Colour</th>
            <td>${hairColour ? hairColour : '-'}</td>
          </tr>      
          <tr>
            <th>Patronus</th>
            <td>${patronus ? patronus : '-'}</td>
          </tr>
        </table>
      </div>
    </div>
  `;

  modalContainer.innerHTML = content;
  modalContainer.parentElement.classList.add('show-modal');
};

const getDetail = (e) => {
  if (e.target.parentElement.parentElement.id || e.target.parentElement.id) {
    const characterId =
      e.target.parentElement.parentElement.id || e.target.parentElement.id;

    const selectedDetail = allCharacters.filter(
      (character) => character.name === characterId
    )[0];
    console.log(selectedDetail);

    createModal(selectedDetail);
  }
};

charactersContainer.addEventListener('click', getDetail);

// Close Modal
const closeModal = () => {
  modalContainer.parentElement.classList.remove('show-modal');
};

closeModalBtn.addEventListener('click', closeModal);
