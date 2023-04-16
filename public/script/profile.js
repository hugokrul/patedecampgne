const profileDetailsElement = document.getElementById("profileDetails");
const orderHistoryElement = document.getElementById("orderHistory");
const orderHistoryInfoElement = document.getElementById("orderHistoryInfo");

const userId = parseInt(localStorage.getItem("userId"));

function logOut(){
  localStorage.removeItem("userId");
  location.reload();
}

async function getUserOrderHistory() {
  let userId = parseInt(localStorage.getItem("userId"));
  let response = await fetch(`/group5/get-user-order-history/${userId}`, {
    method: "POST",
  });
  let dataArray = await response.json();

  console.log(dataArray);
if (dataArray.message== "No history found"){
    console.log("test");
    let noHistoryElement= document.createElement('p');
    noHistoryElement.innerText='No order history found';
    orderHistoryElement.appendChild(noHistoryElement);
  
  } else 
        {dataArray.map(async (indOrder, index) => {
          let data = await fetch(`/group5/get-movie/${indOrder.movieId}`);
          let movie = await data.json();
          movie=movie[0];
          data=data[0];
    
        const movieItem = document.createElement("div");
        movieItem.className = "movieItem";
        const movieItemFlex = document.createElement("div");
        movieItemFlex.className = "flex movieItemFlex";
        movieItem.appendChild(movieItemFlex);
       
        const movieImageContainer = document.createElement("div");
        movieImageContainer.className = "movieImageContainer";
        const movieImage = document.createElement("img");
        movieImage.className = "movieImage";
        const imageElementsrc = `./images/playing/${movie.title
          .replace(/ /g, "-")
          .replace(/:/g, "")
          .replace(".", "")}.jpg`;
        movieImage.src = imageElementsrc;
        movieImageContainer.appendChild(movieImage);
        movieItemFlex.appendChild(movieImageContainer);
       
        const movieItemTitle = document.createElement("h3");
        movieItemTitle.className = "movieItemTitle";
        movieItemTitle.innerHTML = movie.title;

        const movieInfo = document.createElement("section");

        const movieItemAmount = document.createElement("p");
        movieItemAmount.className = "movieItemInfo";
        movieItemAmount.innerHTML = `Amount ordered: ${indOrder.amount}`;

        const movieItemLocation = document.createElement("p");
        movieItemLocation.className = "movieItemInfo";
        movieItemLocation.innerHTML = `Location: ${movie.location}`;

        const movieItemTime = document.createElement("p");
        movieItemTime.className = "movieItemInfo";
        movieItemTime.innerHTML = `Date and time: ${indOrder.dateTimeSlot}`;

        const orderId = document.createElement("p");
        orderId.className = "movieItemInfo";
        orderId.innerHTML = `OrderId: #${indOrder.orderId}`;

        movieInfo.appendChild(movieItemTitle);
        movieInfo.appendChild(orderId);
        movieInfo.appendChild(movieItemTime);
        movieInfo.appendChild(movieItemLocation);
        movieInfo.appendChild(movieItemAmount);

        movieItemFlex.appendChild(movieInfo);
        orderHistoryElement.appendChild(movieItem);
   })};
}


async function renderProfileDetails() {
  let user = await fetch(`/group5/get-user/${userId}`);
  let dataList = await user.json();
  let data = dataList[0];
  if (data) {
    let username = data.fullName;
    let email = data.email;
    let creditCard = data.creditCard;
    let address = data.address;
  
    let usernameElement = document.createElement('p');
    usernameElement.innerText = `Hello, ${username}!`;

    let emailElement = document.createElement('p');
    emailElement.innerText = `Email: ${email}`;
  
    let creditCardElement = document.createElement('p');
    creditCardElement.innerText = `Creditcard: ${creditCard}`;
  
    let addressElement = document.createElement('p');
    addressElement.innerText = `Address: ${address}`;
  
    profileDetailsElement.appendChild(usernameElement);
    profileDetailsElement.appendChild(emailElement);
    profileDetailsElement.appendChild(creditCardElement);
    profileDetailsElement.appendChild(addressElement);

    const logoutButton = document.createElement("button");
    logoutButton.innerText = 'Logout';
    logoutButton.className = 'button-68'
    logoutButton.addEventListener("click", logOut)
    logoutButton.setAttribute('href', '/group5/');
    
    profileDetailsElement.appendChild(logoutButton)
    
    getUserOrderHistory();
  } else {
    const loginLink = document.createElement('a');
    loginLink.innerText = 'Login';
    loginLink.setAttribute('href', '/group5/login');

    profileDetailsElement.appendChild(loginLink);
  }
}