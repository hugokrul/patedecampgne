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
