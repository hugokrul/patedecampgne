let loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let email = document.getElementById("emailInput").value;
  let password = document.getElementById("passwordInput").value;

  let credentials = email + "," + password;

  // TODO do something here to show user that form is being submitted
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
    })
    .catch((error) => {
      // TODO handle error
    });
});
