// 카드 container
const movieCardLine = document.querySelector(".movieCardLine");
// 검색 input
const searchInput = document.getElementById("searchMovieInput");
// 검색 버튼
const searchBtn = document.querySelector(".searchMovieBtn");
// header 제목
const pageTitle = document.getElementsByTagName("h1");
// 카드
const card = document.querySelector(".card");
// 다음 버튼
const nextBtn = document.querySelector(".nextBtn");
// 이전 버튼
const prevBtn = document.querySelector(".prevBtn");
// 페이지 새로고침
const home = document.querySelector(".home");
// 모달 컨테이너
const modalContainer = document.querySelector(".modalContainer");

// home 클릭 시 윈도우 새로고침
home.addEventListener("click", () => {
  window.location.reload();
});
// input 포커스
searchInput.focus();

const tmdbKey = "cc94064ab94a0145a45541730eb6f94b";

let currentPage = 1;
// url 페이지를 nextBtn/ prevBtn 클릭 시 바꾸게함

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzk0MDY0YWI5NGEwMTQ1YTQ1NTQxNzMwZWI2Zjk0YiIsInN1YiI6IjY1MmY0MmZmMGNiMzM1MTZmODg1M2NkZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DAAVes_bBmBE4Ob_bebSw1-g7YQ0So9oJuIPAmak9R0",
  },
};

// url 받아오고, 카드 만들기 함수 실행 또한 while문으로 카드 라인 삭제 후 재생성
const getMovieList = () => {
  fetch(
    `https://api.themoviedb.org/3/movie/top_rated?language=ko-KO&page=${currentPage}`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      while (movieCardLine.firstChild) {
        movieCardLine.firstChild.remove();
      } // movieCardLine 첫번째 자식이 있으면 remove를 반복해라.
      let results = response.results;
      //results 데이터를 통해 각 배열 movie로 받아옴.
      results.forEach((movie) => {
        createCard(movie); // 카드 만드는 함수
      });

      // 검색 시 단어 속한 영화 나오는 함수
      const searchMovie = () => {
        for (let i = 0; i < results.length; i++) {
          let movieCard = document.getElementsByClassName("movieCard");
          let title = results[i].title ? results[i].title : results[i].name;
          title = title;
          let userInput = searchInput.value;
          let string = title.includes(userInput);
          // userInput에 공백이 아니라면 밑 if실행 아니라면 alert실행
          if (userInput !== "") {
            if (string) {
              movieCard[i].style.display = "block";
            } else {
              movieCard[i].style.display = "none";
            }
          } else {
            alert("영화 제목을 입력하세요.");
            return;
          }
        }
      };

      //검색 버튼 클릭 시 searchMovie 실행
      searchBtn.addEventListener("click", searchMovie);

      // 검색 시 엔터 활성화
      searchInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
          searchMovie();
        }
      });
    })
    .catch((err) => console.error(err));
};

getMovieList();

// 카드 만드는 함수
const createCard = (movie) => {
  // movie로 받아온 데이터들을 변수에 지정
  let image = movie.backdrop_path;
  let title = movie.title ? movie.title : movie.name;
  let overview = movie.overview;
  let ratio = movie.vote_average;
  let id = movie.id;

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

  // movieCardLine에 movieCard 요소 넣기
  const movieCard = document.createElement("div");
  movieCard.id = id;
  movieCard.classList.add("movieCard");
  movieCardLine.appendChild(movieCard);
  // movieCard 자식 요소로 이미지 넣기
  const cardImage = document.createElement("img");
  cardImage.classList.add("movieImage");
  cardImage.style.width = "100%";
  cardImage.style.height = "50%";
  cardImage.src = `http://image.tmdb.org/t/p/original/${image}`;
  movieCard.append(cardImage);
  // movieCard 자식 요소로 제목 넣기
  const cardTitle = document.createElement("div");
  cardTitle.classList.add("movieTitle");
  cardTitle.innerText = title;
  movieCard.append(cardTitle);
  // movieCard 자식 요소로 내용 넣기
  const cardInfo = document.createElement("div");
  cardInfo.classList.add("movieInfo");
  cardInfo.innerText = overview;
  movieCard.append(cardInfo);
  // movieCard 자식 요소로 평점 넣기
  const cardRatio = document.createElement("div");
  cardRatio.classList.add("movieRatio");
  cardRatio.innerText = `평점: ${ratio}`;
  movieCard.append(cardRatio);
  //
  movieCard.addEventListener("click", () => {
    let id = movieCard.id;
    // alert(`ID: ${id}`);
    // modalContainer.innerHTML = ""; // 연속으로 줄줄이 나오기 때문에 빈칸으로 만든 후
    // modalContainer.style.display = "block";
    // cardModal(movie); // 재실행
    window.location.href = `../영화상세페이지/movie.html?id=${id}`;
  });
};
// 모달창 카드와 비슷(실행위치가 다르다.)
// const cardModal = (movie) => {
//   let image = movie.backdrop_path;
//   let title = movie.title ? movie.title : movie.name;
//   let overview = movie.overview;

//   const modalCancel = document.createElement("span");
//   modalCancel.classList.add("modalCancel");
//   modalCancel.innerHTML = `❌`;
//   modalContainer.append(modalCancel);

//   const cardImage = document.createElement("img");
//   cardImage.classList.add("movieImage");
//   cardImage.style.width = "100%";
//   cardImage.style.height = "50%";
//   cardImage.src = `http://image.tmdb.org/t/p/original/${image}`;
//   modalContainer.append(cardImage);

//   const cardTitle = document.createElement("div");
//   cardTitle.classList.add("movieTitle");
//   cardTitle.innerText = title;
//   modalContainer.append(cardTitle);

//   const cardInfo = document.createElement("div");
//   cardInfo.classList.add("movieInfo");
//   cardInfo.innerText = overview;
//   modalContainer.append(cardInfo);
//   // 모달 취소
//   modalCancel.addEventListener("click", () => {
//     modalContainer.style.display = "none";
//   });
// };

// 다음 페이지 버튼
nextBtn.addEventListener("click", () => {
  setTimeout(() => {
    currentPage++;
    getMovieList(); // url을 옮기기 위해
    updatePage();
  }, 500);
});

// 이전 페이지 버튼
prevBtn.addEventListener("click", () => {
  setTimeout(() => {
    if (currentPage > 1) {
      currentPage--;
      getMovieList(); // url을 옮기기 위해
      updatePage();
    }
  }, 500);
});

// page 숫자 바뀌게 하기
const updatePage = () => {
  const pageElements = document.querySelectorAll(".page");
  pageElements.forEach((page) => {
    page.innerText = `[${currentPage}]`;
  });
};

//날씨 가져오기
navigator.geolocation.getCurrentPosition(function (pos) {
  var latitude = pos.coords.latitude;
  var longitude = pos.coords.longitude;
});
// 현재 위치 가져오기

navigator.geolocation.getCurrentPosition(function (pos) {
  var latitude = pos.coords.latitude;
  var longitude = pos.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=658d847ef1d28e72e047ab0c5a476d54&units=metric`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const header = document.querySelector(".header");
      const weatherDiv = document.createElement("div");
      weatherDiv.classList.add("weather");
      weatherDiv.innerText = `현재 날씨: ${data.main.temp}도 ${data.weather[0].main}`;
      header.append(weatherDiv);
    });
});
