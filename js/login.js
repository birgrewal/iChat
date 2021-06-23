// Important Variables
const submit = document.querySelector('#submit');
const uemail = document.querySelector('#uemail');
const upass = document.querySelector('#upass');
const form = document.querySelector('#form');

// Event Listeners
window.addEventListener('load', isLogin);
submit.addEventListener('click', login);
form.addEventListener('submit', (e) => { e.preventDefault() });

// Functions

function login() {
    if (uemail.value == "" || upass.value == "") {
        message.classList.remove('d-none');
        message.classList.add('warning-message');
        message.innerText = "Please enter the fields properly!";
    } else {
        let userData = new FormData();
        userData.append('uemail', uemail.value);
        userData.append('upass', upass.value);
        sendRequest(userData);
    }
}

function sendRequest(userData) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "php/login.php", true);
    xhr.onload = function () {
        if (this.status == 200) {
            let results = JSON.parse(this.responseText);
            if (results.message == 'Login Un-Successful') {
                message.classList.remove('d-none');
                message.classList.add('warning-message');
                message.innerText = "Entered Password is Wrong!";
                console.log(results);
            } else if (results.message == 'User don\'t exists') {
                message.classList.remove('d-none');
                message.classList.add('warning-message');
                message.innerHTML = "<p>User Don't Exists! Try <a href='signup.html'>Signup</a></p>";
            } else if (results.status == true) {
                message.classList.remove('d-none');
                message.classList.add('success-message');
                message.innerHTML = "<p>Login Successful! Now you can <a href='index.html'>iChat</a></p>";
            }
        }
    }
    xhr.send(userData);
}

function isLogin() {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "php/_isLogin.php", true);
    xhr.onload = function () {
        if (this.status == 200) {
            let results = JSON.parse(this.responseText);
            if (results.status == true) {
                location.href = "index.html";
            }
        }
    }
    xhr.send();
}