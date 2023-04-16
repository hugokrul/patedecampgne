const mainArticle = document.getElementById("main");

async function getActorsOfMovie(movieId) {
  let response = await fetch(`./all-actors-of-movie/${movieId}`);
  let data = await response.json();
  return data;
}

async function getMovieWithId() {
  const movieId = location.pathname.split("/").slice(-1)[0];
  let response = await fetch(`./get-movie/${movieId}`);
  let data = await response.json();
  let actors = await getActorsOfMovie(movieId);
  fillPage(data[0], actors);
}

getMovieWithId();

function hoursToMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return { hours, minutes };
}

function resetState() {
  while (mainArticle.firstChild) {
    mainArticle.removeChild(mainArticle.firstChild);
  }
}

function fillPage(data, actors) {
  resetState();
  const imageElementsrc = `../images/playing/${data.title
    .replace(/ /g, "-")
    .replace(/:/g, "")
    .replace(".", "")}.jpg`;
  const imageElement = document.createElement("img");
  const imageElementContainer = document.createElement("div");

  imageElement.setAttribute("src", imageElementsrc);

  imageElementContainer.appendChild(imageElement);
  imageElementContainer.classList.add("poster");

  const textElementContainer = document.createElement("div");
  textElementContainer.classList.add("textElement");

  const title = document.createElement("h1");
  title.innerText = data.title;

  const length = document.createElement("h4");
  const { hours, minutes } = hoursToMinutes(data.movieLength);
  length.innerText = `${hours} hours, ${minutes} minutes`;

  const director = document.createElement("p");
  director.innerText = data.director;

  const playingSpan = document.createElement("p");
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let date1 = new Date(data.playingSpan.split("_")[0]);
  let date2 = new Date(data.playingSpan.split("_")[1]);
  let text = `Playing everyday between ${
    monthNames[date1.getMonth()]
  } ${date1.getDate()} ${date1.getFullYear()} and ${
    monthNames[date2.getMonth()]
  } ${date2.getDate()} ${date2.getFullYear()}`;
  playingSpan.innerText = text;

  const location = document.createElement('p');
  location.innerText = `Playing in: ${data.location}`;

  const PlotH1 = document.createElement("h1");
  PlotH1.innerText = "Plot:";

  const PlotElement = document.createElement("p");
  PlotElement.innerText = data.plot;
  PlotElement.style.textAlign = "justify";


  const actorH1 = document.createElement("h1");
  actorH1.innerText = "Actors:";

  textElementContainer.appendChild(title);
  textElementContainer.appendChild(length);
  textElementContainer.appendChild(director);
  textElementContainer.appendChild(playingSpan);
  textElementContainer.appendChild(location);
  textElementContainer.appendChild(document.createElement("br"));
  textElementContainer.appendChild(PlotH1);
  textElementContainer.appendChild(PlotElement);
  textElementContainer.appendChild(document.createElement("br"));
  textElementContainer.appendChild(actorH1);

  actors.forEach((actor) => {
    const ActorsElement = document.createElement("p");
    ActorsElement.innerText = actor.name;
    textElementContainer.appendChild(ActorsElement);
  });

  textElementContainer.appendChild(document.createElement("br"));
  let orderFlexContainer = document.createElement("div");
  orderFlexContainer.className = "flex";
  textElementContainer.appendChild(orderFlexContainer);
  const counterInput = document.createElement("input");
  counterInput.defaultValue = "1";
  counterInput.type = "number";
  counterInput.id = "orderCounterInput";
  counterInput.style.width = "50px";
  orderFlexContainer.appendChild(counterInput);
  const orderBtn = document.createElement("button");
  orderBtn.innerText = "Order Now";
  orderFlexContainer.appendChild(orderBtn);

  orderBtn.addEventListener("click", function () {
    let currentCartList = localStorage.getItem("moviesInCartIds");
    if (currentCartList !== null) {
      let currentCartListArr = currentCartList.split(",");
      //get the movie id by splitting the id and the amount with " - "
      currentCartListArr.push(
        data.movieId + "-" + document.getElementById("orderCounterInput").value
      );
      localStorage.setItem("moviesInCartIds", currentCartListArr.toString(","));
      window.location.href = "./cart";
    } else {
      currentCartList =
        data.movieId.toString() +
        "-" +
        document.getElementById("orderCounterInput", currentCartList).value;
      localStorage.setItem("moviesInCartIds", currentCartList);
      window.location.href = "./cart";
    }
  });

  mainArticle.appendChild(imageElementContainer);
  mainArticle.appendChild(textElementContainer);
}
