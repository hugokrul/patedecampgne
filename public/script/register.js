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
  fetch(`/group5/user-register/${credentials}`, {
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
      alert('You are registered and logged in');
      window.location.href = "/";
    })
    .catch((error) => {
      // TODO handle error
    });
});
