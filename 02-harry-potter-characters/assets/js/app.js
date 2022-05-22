const searchInput = document.querySelector('.harry-potter__input');
const charactersContainer = document.querySelector('.harry-potter__characters');
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
    const res = await fetch('http://hp-api.herokuapp.com/api/characters');
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

// Detail Characters
const getDetail = (e) => {
  if(e.target.parentElement.parentElement.id || e.target.parentElement.id) {
    const characterId = e.target.parentElement.parentElement.id || e.target.parentElement.id;

    const selectedDetail = allCharacters.filter(character => character.name === characterId);
    console.log(selectedDetail);
  }
}

charactersContainer.addEventListener('click', getDetail);
