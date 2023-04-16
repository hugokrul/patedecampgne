let now = [];
var soon = [];
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
  let response = await fetch("./get-all-movies");
  let data = await response.json();
  for (let i = 0; i < data.length; i++) {
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
