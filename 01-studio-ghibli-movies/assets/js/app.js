const searchInput = document.querySelector('.hero__form-input');
const moviesContainer = document.querySelector('.movies__container');

let movies = [];

// Generate Movies
const generateMovies = (movies) => {
  let movieList = '';

  movies.map((movie) => {
    const { id, title, image, release_date } = movie;

    movieList += `
      <article class="movie" id="${id}">
        <header class="movie__header">
          <img class="movie__img" src="${image}" alt="${title}">
        </header>
        <h5 class="movie__title">${title}</h5>
        <p class="movie__release">${release_date}</p>
      </article>
    `;
  });

  return movieList;
};

// First launch - Show All Movies
const getAllMovies = () => {
  fetch('https://ghibliapi.herokuapp.com/films')
    .then((res) => res.json())
    .then((data) => {
      movies = data;

      moviesContainer.innerHTML = generateMovies(data);
    });
};

getAllMovies();

// Get Movies by Search
const searchMovies = () => {
  const userInput = searchInput.value.trim().toLowerCase();

  const filteredMovies = [...movies].filter((movie) =>
    movie.title.toLowerCase().includes(userInput)
  );

  if (filteredMovies.length === 0) {
    moviesContainer.innerHTML = '<p class="movies__404">Movies not found</p>';
  } else {
    moviesContainer.innerHTML = generateMovies(filteredMovies);
  }
};

searchInput.addEventListener('keyup', searchMovies);

// Get Movie's Detail
moviesContainer.addEventListener('click', e => console.log(e.target));
