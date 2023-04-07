async function getUserOrderHistory() {
  let userId = parseInt(localStorage.getItem("userId"));
  let response = await fetch(`/group5/get-user-order-history/${userId}`);
  let dataArray = await response.json();

  dataArray.map((indOrder, index) => {
    const orderContainer = document.createElement("div");
    orderContainer.className = "orderContainer";

    document.getElementsByTagName(body).appendChild(orderContainer);
  });
}

function loginSucces() {
  localStorage.setItem("userId", result.userId);
}
