const movieList = document.getElementById("movieList")

let now = [];
let soon = [];
let movieTitles = [];
const slidingContentElement = document.getElementById("slidingcontent");
const slidingContentElement2 = document.getElementById("slidingcontent2");

function resetState() {
  while (slidingContentElement.firstChild) {
    slidingContentElement.removeChild(slidingContentElement.firstChild);
  }
  while (slidingContentElement2.firstChild) {
    slidingContentElement2.removeChild(slidingContentElement2.firstChild);
  }
}

function checkCurrentDateBetweenDates(date1, date2) {
  return Date.now() > Date.parse(date1) && Date.now() < Date.parse(date2);
}

async function getMovies() {
  let response = await fetch("/get-all-movies");
  let data = await response.json();
  for (let i = 0; i < data.length; i++) {
    movieTitles.push(data[i])
    let dates = data[i].playingSpan.split("_");
    if (checkCurrentDateBetweenDates(dates[0], dates[1])) {
      now.push([
        `${data[i].title
          .replace(/ /g, "-")
          .replace(/:/g, "")
          .replace(".", "")}.jpg`,
        data[i].movieId,
      ]);
    } else {
      soon.push([
        `${data[i].title
          .replace(/ /g, "-")
          .replace(/:/g, "")
          .replace(".", "")}.jpg`,
        data[i].movieId,
      ]);
    }
  }
  showNow();
}

function showSoon() {
  resetState();
  for (let i = 0; i < soon.length; i++) {
    var aElement = document.createElement("a");
    aElement.setAttribute("href", `movies/${soon[i][1]}`);
    var containerElement = document.createElement("div");
    containerElement.classList.add("marquee-tag-container");
    var imageElement = document.createElement("img");
    imageElement.setAttribute("src", `./images/playing/${soon[i][0]}`);
    imageElement.setAttribute("alt", soon[i]);
    imageElement.setAttribute("width", "250");
    imageElement.setAttribute("height", "400");
    imageElement.classList.add("marquee-tag-icon");
    containerElement.appendChild(imageElement);
    aElement.appendChild(containerElement);
    slidingContentElement.appendChild(aElement);
  }
  for (let i = 0; i < soon.length; i++) {
    var aElement = document.createElement("a");
    aElement.setAttribute("href", `movies/${soon[i][1]}`);
    var containerElement = document.createElement("div");
    containerElement.classList.add("marquee-tag-container");
    var imageElement = document.createElement("img");
    imageElement.setAttribute("src", `./images/playing/${soon[i][0]}`);
    imageElement.setAttribute("alt", soon[i]);
    imageElement.setAttribute("width", "250");
    imageElement.setAttribute("height", "400");
    imageElement.classList.add("marquee-tag-icon");
    containerElement.appendChild(imageElement);
    aElement.appendChild(containerElement);
    slidingContentElement2.appendChild(aElement);
  }
}

function showNow() {
  resetState();
  for (let i = 0; i < now.length; i++) {
    var aElement = document.createElement("a");
    aElement.setAttribute("href", `movies/${now[i][1]}`);
    var containerElement = document.createElement("div");
    containerElement.classList.add("marquee-tag-container");
    var imageElement = document.createElement("img");
    imageElement.setAttribute("src", `./images/playing/${now[i][0]}`);
    imageElement.setAttribute("alt", soon[i]);
    imageElement.setAttribute("width", "250");
    imageElement.setAttribute("height", "400");
    imageElement.classList.add("marquee-tag-icon");
    containerElement.appendChild(imageElement);
    aElement.appendChild(containerElement);
    slidingContentElement.appendChild(aElement);
  }
  for (let i = 0; i < now.length; i++) {
    var aElement = document.createElement("a");
    aElement.setAttribute("href", `movies/${now[i][1]}`);
    var containerElement = document.createElement("div");
    containerElement.classList.add("marquee-tag-container");
    var imageElement = document.createElement("img");
    imageElement.setAttribute("src", `./images/playing/${now[i][0]}`);
    imageElement.setAttribute("alt", soon[i]);
    imageElement.setAttribute("width", "250");
    imageElement.setAttribute("height", "400");
    imageElement.classList.add("marquee-tag-icon");
    containerElement.appendChild(imageElement);
    aElement.appendChild(containerElement);
    slidingContentElement2.appendChild(aElement);
  }
}

function search() {
  movieList.innerHTML = "";

  let input = document.getElementById("search").value;

  const options = {
    includeScore: true,
    keys: ["title"]
  };
  
  const fuse = new Fuse(movieTitles, options);
  const result = fuse.search(input);
  let movies = [];
  result.forEach((movie, index) => {
    if (movie.score < 0.5) {
      movies.push(movie.item);
    }
  });

  movies.map((indMovie, index) => {
    const movieItem = document.createElement("div");
    movieItem.className = "movieItem";
    const movieItemFlex = document.createElement("div");
    movieItemFlex.className = "flex movieItemFlex";
    movieItem.appendChild(movieItemFlex);

    const movieImageContainer = document.createElement("div");
    movieImageContainer.className = "movieImageContainer";
    const movieImage = document.createElement("img");
    movieImage.className = "movieImage";
    const imageElementsrc = `images/playing/${indMovie.title
      .replace(/ /g, "-")
      .replace(/:/g, "")
      .replace(".", "")}.jpg`;
    movieImage.src = imageElementsrc;
    movieImageContainer.appendChild(movieImage);
    movieItemFlex.appendChild(movieImageContainer);

    const movieItemTextContent = document.createElement("div");
    movieItemTextContent.className = "movieItemTextContent";
    const movieItemTitle = document.createElement("h3");
    movieItemTitle.className = "movieItemTitle";
    movieItemTitle.innerHTML = indMovie.title;

    const movieItemDescription = document.createElement("p");
    movieItemDescription.className = "movieItemDescription";
    movieItemDescription.innerHTML = indMovie.plot;

    movieItemTextContent.appendChild(movieItemTitle);
    movieItemTextContent.appendChild(movieItemDescription);

    movieItemFlex.appendChild(movieItemTextContent);

    movieItemFlex.addEventListener('click', () => {
      location.href = `/movies/${indMovie.movieId}`
    })
    
    movieList.appendChild(movieItem);
  });

}