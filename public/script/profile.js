const profileDetailsElement = document.getElementById("profileDetails")
const orderHistoryElement = document.getElementById("orderHistory")
const userId = parseInt(localStorage.getItem("userId"));

function logOut(){
  localStorage.removeItem("userId")
}

async function getUserOrderHistory() {
  let userId = parseInt(localStorage.getItem("userId"));
  let response = await fetch(`/get-user-order-history/${userId}`, {
    method: "POST",
  });
  let dataArray = await response.json();

  console.log(dataArray);

  dataArray.map((indOrder, index) => {
    const orderContainer = document.createElement("div");
    orderContainer.className = "orderContainer";

    document.getElementsByTagName(body).appendChild(orderContainer);
  });
  if (message== "No history found"){
    let noHistoryElement= document.createElement('p');
    noHistoryElement.innerText='No order history found';
    orderHistoryElement.appendChild(noHistoryElement);
  }
}

async function renderProfileDetails() {
  let user = await fetch(`/get-user/${userId}`)
  let dataList = await user.json()
  let data = dataList[0]
  if (data.fullName) {
    let username = data.fullName;
    let email = data.email;
    let creditCard = data.creditCard;
    let address = data.address;
  
    let usernameElement = document.createElement('p');
    usernameElement.innerText = `Hello, ${username}!`

    let emailElement = document.createElement('p');
    emailElement.innerText = `Email: ${email}!`
  
    let creditCardElement = document.createElement('p');
    creditCardElement.innerText = `Creditcard: ${creditCard}`;
  
    let addressElement = document.createElement('p');
    addressElement.innerText = `Address: ${address}`;
  
    profileDetailsElement.appendChild(usernameElement);
    profileDetailsElement.appendChild(emailElement);
    profileDetailsElement.appendChild(creditCardElement);
    profileDetailsElement.appendChild(addressElement);

    getUserOrderHistory()
    
    const logoutButton = document.createElement("button");
    logoutButton.innerText = 'Logout';
    logoutButton.className = 'button-68'
    logoutButton.onclick = logOut();
    logoutButton.setAttribute('href', '/');

    profileDetailsElement.appendChild(logoutButton)
  
  } else {
    const loginLink = document.createElement('a');
    loginLink.innerText = 'Login';
    loginLink.setAttribute('href', '/login');

    profileDetailsElement.appendChild(loginLink)
  }
  
}