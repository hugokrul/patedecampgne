let loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let email = document.getElementById("emailInput").value;
  let password = document.getElementById("passwordInput").value;

  let credentials = email + "," + password;

  // TODO do something here to show user that form is being submitted
  fetch(`/group5/user-login/${credentials}`, {
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
      if (body.message) {
        const deleteElements = document.getElementsByClassName('errorElement');
        while (deleteElements.length > 0) {
          deleteElements[0].parentNode.removeChild(deleteElements[0]);
        }
        let errorElement = document.createElement('p');
        errorElement.classList.add('errorElement');
        errorElement.innerText = body.message;
        errorElement.style.color = "red";
        document.body.appendChild(errorElement);
      } else {
        localStorage.setItem("userId", body[0].userId);
        alert('You are logged in');
        window.location.href = "/group5/";
      }
    })
    .catch((error) => {
      // TODO handle error
    });
});
