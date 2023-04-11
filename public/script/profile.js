const profileDetailsElement = document.getElementById("profileDetails")
const userId = parseInt(localStorage.getItem("userId"));

async function getUserOrderHistory() {
  let userId = parseInt(localStorage.getItem("userId"));
  let response = await fetch(`/group5/get-user-order-history/${userId}`, {
    method: "POST",
  });
  let dataArray = await response.json();

  console.log(dataArray);

  dataArray.map((indOrder, index) => {
    const orderContainer = document.createElement("div");
    orderContainer.className = "orderContainer";

    document.getElementsByTagName(body).appendChild(orderContainer);
  });
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
  } else {
    const loginLink = document.createElement('a');
    loginLink.innerText = 'Login';
    loginLink.setAttribute('href', '/login');

    profileDetailsElement.appendChild(loginLink)
  }
  
}

