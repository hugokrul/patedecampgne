const movieList = document.getElementById("movieList");

let cartArray = localStorage.getItem("moviesInCartIds");
let movieArray;

if (cartArray !== null && cartArray !== undefined) {
  cartArray = cartArray.split(",");
  console.log(cartArray);
  if (cartArray.length > 0) {
    getAllMovieDataFromCart().then((response) => {
      movieArray = response;
      renderCartItems();
    });
    const clearCartBtn = document.createElement("button");
    clearCartBtn.innerText = "Clear Cart";
    clearCartBtn.addEventListener("click", clearCart);
    movieList.appendChild(clearCartBtn);
  } else {
    renderEmptyCart();
  }
} else {
  renderEmptyCart();
}

function renderEmptyCart() {
  const emptyCartText = document.createElement("p");
  emptyCartText.className = "emptyCartText";
  emptyCartText.innerHTML = "You have an empty cart";

  const exploreMoviesBtn = document.createElement("button");
  exploreMoviesBtn.innerText = "Explore Movies";
  exploreMoviesBtn.addEventListener("click", function () {
    window.location.href = "/group5";
  });

  movieList.appendChild(emptyCartText);
  movieList.appendChild(exploreMoviesBtn);
}

function getAllMovieDataFromCart() {
  return Promise.all(
    cartArray.map(async (indMovie) => {
      if (indMovie !== undefined) {
        let indMovieId = indMovie.split("-")[0];
        return new Promise((resolve, reject) => {
          getMovieData(indMovieId, indMovie.split("-")[1]).then((response) => {
            resolve(response);
          });
        });
      }
    })
  );
}

async function getMovieData(movieId, amount = 1) {
  let response = await fetch(`/group5/get-movie/${movieId}`);
  let data = await response.json();
  data = data[0];
  data.amountInCart = parseInt(amount);
  return data;
}

function renderCartItems() {
  movieList.innerHTML = "";

  movieArray.map((indMovie, index) => {
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

    const amountFlex = document.createElement("div");
    amountFlex.className = "flex";
    const movieItemAmount = document.createElement("h4");
    movieItemAmount.className = "movieItemTitle";
    movieItemAmount.innerHTML = "Amount selected: ";
    const counterInput = document.createElement("input");
    counterInput.defaultValue = indMovie.amountInCart;
    counterInput.type = "number";
    counterInput.id = "orderCounterInput" + indMovie.movieId;
    counterInput.style.width = "50px";
    amountFlex.appendChild(movieItemAmount);
    amountFlex.appendChild(counterInput);

    //movieAmount Change

    counterInput.addEventListener("change", function () {
      let currentCartListArr = movieArray;
      //get the current movie
      currentCartListArr[index] =
        indMovie.movieId +
        "-" +
        document.getElementById("orderCounterInput" + indMovie.movieId).value;

      localStorage.setItem("moviesInCartIds", currentCartListArr.toString(","));
      location.reload();
    });

    const movieItemDescription = document.createElement("p");
    movieItemDescription.className = "movieItemDescription";
    movieItemDescription.innerHTML = indMovie.plot;

    movieItemTextContent.appendChild(movieItemTitle);
    movieItemTextContent.appendChild(amountFlex);
    movieItemTextContent.appendChild(movieItemDescription);

    movieItemFlex.appendChild(movieItemTextContent);

    movieList.appendChild(movieItem);
  });
}

function clearCart() {
  if (confirm("Are you sure you want to delete your entire cart?")) {
    localStorage.removeItem("moviesInCartIds");
    location.reload();
  }
}
