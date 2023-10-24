const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzk0MDY0YWI5NGEwMTQ1YTQ1NTQxNzMwZWI2Zjk0YiIsInN1YiI6IjY1MmY0MmZmMGNiMzM1MTZmODg1M2NkZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DAAVes_bBmBE4Ob_bebSw1-g7YQ0So9oJuIPAmak9R0",
  },
};

function ViewTrailer() {
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id");
  fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=ko-KO`, options)
    .then((response) => response.json())
    .then((response) => {
      createPage(response);
    })
    .catch((err) => console.error(err));
}

const createPage = (movie) => {
  const image = movie.backdrop_path;
  const movieImage = `http://image.tmdb.org/t/p/original/${image}`;
  const title = movie.title;
  const info = movie.overview;
  let ratio = movie.vote_average;

  const movie_release = movie.release_date.slice(0, 4);
  const page_image = document.querySelector(".page_image");
  const page_container = document.querySelector(".container");
  const page_story = document.querySelector(".movie_story");

  if (ratio < 5) {
    ratio = `⭐`;
  } else if (ratio >= 5 && ratio < 7) {
    ratio = `⭐⭐`;
  } else if (ratio >= 7 && ratio < 8) {
    ratio = `⭐⭐⭐`;
  } else if (ratio >= 8 && ratio < 9) {
    ratio = `⭐⭐⭐⭐`;
  } else if (ratio >= 9) {
    ratio = `⭐⭐⭐⭐⭐`;
  }

  const header = document.querySelector("header");
  header.innerText = title;

  const movie_image = document.createElement("img");
  movie_image.classList.add("movie_image");
  movie_image.src = `${movieImage}`;
  movie_image.style.width = "50%";
  movie_image.style.height = "400px";
  page_image.append(movie_image);

  const movie_title = document.createElement("div");
  movie_title.classList.add("movie_title");
  movie_title.innerText = title;
  page_story.append(movie_title);

  const movie_year = document.createElement("div");
  movie_year.classList.add("movie_year");
  movie_year.innerText = `(${movie_release})`;
  movie_title.append(movie_year);

  const movie_info = document.createElement("div");
  movie_info.classList.add("movie_info");
  movie_info.innerText = info;
  page_story.append(movie_info);

  const movie_ratio = document.createElement("div");
  movie_ratio.classList.add("movie_ratio");
  movie_ratio.innerText = ratio;
  page_story.append(movie_ratio);
};

ViewTrailer();
