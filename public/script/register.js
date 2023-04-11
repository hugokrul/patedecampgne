let registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let email = document.getElementById("emailInput").value;
  let password = document.getElementById("passwordInput").value;
  let fullname = document.getElementById("fullnameInput").value;
  let address = document.getElementById("addressInput").value;
  let creditcard = document.getElementById("creditcardInput").value;
  

  let credentials = email + "," + password + "," + fullname + "," + address + "," + creditcard;

  // TODO do something here to show user that form is being submitted
  fetch(`/user-register/${credentials}`, {
    method: "POST",
    //new URLSearchParams(new FormData(event.target)), // event.target is the form
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json(); // or response.text() or whatever the server sends
    })
    .then(() => {
      // TODO handle body
      if (body.message) {
        const deleteElements = document.getElementsByClassName('errorElement')
        while (deleteElements.length > 0) {
          deleteElements[0].parentNode.removeChild(deleteElements[0])
        }
        let errorElement = document.createElement('p')
        errorElement.classList.add('errorElement')
        errorElement.innerText = body.message
        errorElement.style.color = "red"
        document.body.appendChild(errorElement)
      } else {
        loginUser(email, password);
        window.location.href = "/";
      }
    })
    .catch((error) => {
      // TODO handle error
      console.log(error)
    });
});

async function loginUser(email, password) {
  let credentials = email + "," + password;
  fetch(`/user-login/${credentials}`, {
    method: "POST",
    //new URLSearchParams(new FormData(event.target)), // event.target is the form
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json(); // or response.text() or whatever the server sends
    })
    .then((body) => {
      // TODO handle body
      localStorage.setItem("userId", body[0].userId);
      alert('You are logged in');
      window.location.href = "/";
    })
    .catch((error) => {
      // TODO handle error
    });
}