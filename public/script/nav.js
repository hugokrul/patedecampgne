const userID = localStorage.getItem('userId')
const loginRegisterElement = document.getElementById('loginRegister');

async function getUserData() {
    let u = await fetch(`/get-user/${userID}`)
    let d = await u.json();
    Continue(d[0])
}

window.addEventListener("load", () => {
    getUserData()
})

function Continue(data) {
    if (userID) {
        let listElement = document.createElement('li');
        let listElementA = document.createElement('a');
        listElementA.innerText = `HALLO, ${data.fullName.toUpperCase()}`;
        listElement.appendChild(listElementA);

        loginRegisterElement.appendChild(listElement)
    } else {
        let listElementRegister = document.createElement('li');
        let registerElement = document.createElement('a');
        let listElementLogin = document.createElement('li');
        let loginElement = document.createElement('a');

        registerElement.innerText = 'REGISTER';
        registerElement.setAttribute('href', '/register');

        loginElement.innerText = 'LOGIN';
        loginElement.setAttribute('href', '/login');

        listElementRegister.appendChild(registerElement);
        listElementLogin.appendChild(loginElement);

        loginRegisterElement.appendChild(listElementLogin);
        loginRegisterElement.appendChild(listElementRegister);
    }
}