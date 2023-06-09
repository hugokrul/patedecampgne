const userID = localStorage.getItem('userId');
const loginRegisterElement = document.getElementById('loginRegister');
const mobileElement = document.getElementById('mobile');

async function getUserData() {
    let u = await fetch(`/group5/get-user/${userID}`);
    let d = await u.json();
    Continue(d[0]);
}

window.addEventListener("load", () => {
    getUserData();
})

function Continue(data) {
    if (userID) {
        let listElement = document.createElement('li');
        let listElementA = document.createElement('a');
        listElementA.innerText = `HALLO, ${data.fullName.toUpperCase()}`;
        listElementA.setAttribute('href', '/group5/profile');
        listElement.appendChild(listElementA);
        
        loginRegisterElement.appendChild(listElement);

        let listElementMobile = document.createElement('li');
        let listElementAMobile = document.createElement('a');
        listElementAMobile.innerText = `HALLO, ${data.fullName.toUpperCase()}`;
        listElementAMobile.setAttribute('href', '/group5/profile');
        listElementMobile.appendChild(listElementAMobile);

        mobileElement.appendChild(listElementMobile);
    } else {
        let listElementRegister = document.createElement('li');
        let registerElement = document.createElement('a');
        let listElementLogin = document.createElement('li');
        let loginElement = document.createElement('a');

        registerElement.innerText = 'REGISTER';
        registerElement.setAttribute('href', '/group5/register');

        loginElement.innerText = 'LOGIN';
        loginElement.setAttribute('href', '/group5/login');

        listElementRegister.appendChild(registerElement);
        listElementLogin.appendChild(loginElement);

        loginRegisterElement.appendChild(listElementLogin);
        loginRegisterElement.appendChild(listElementRegister);

        let listElementRegisterMobile = document.createElement('li');
        let registerElementMobile = document.createElement('a');
        let listElementLoginMobile = document.createElement('li');
        let loginElementMobile = document.createElement('a');

        registerElementMobile.innerText = 'REGISTER';
        registerElementMobile.setAttribute('href', '/group5/register');

        loginElementMobile.innerText = 'LOGIN';
        loginElementMobile.setAttribute('href', '/group5/login');

        listElementRegisterMobile.appendChild(registerElementMobile);
        listElementLoginMobile.appendChild(loginElementMobile);

        mobileElement.appendChild(listElementLoginMobile);
        mobileElement.appendChild(listElementRegisterMobile);
    }
}

function toggleMobileMenu(menu) {
    menu.classList.toggle('open');
};