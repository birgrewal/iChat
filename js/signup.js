// Important Variables
const submit = document.querySelector('#submit');
const uname = document.querySelector('#uname');
const uemail = document.querySelector('#uemail');
const uage = document.querySelector('#uage');
const ucity = document.querySelector('#ucity');
const upass = document.querySelector('#upass');
const form = document.querySelector('#form')
const message = document.querySelector('#message');
const userImg = document.querySelector('#userImg');

// Event Listeners
submit.addEventListener('click', signUp);
userImg.addEventListener('input', getImg);
form.addEventListener('submit', e => e.preventDefault());
window.addEventListener('load', isLogin)

// Functions
function signUp(e) {
    e.preventDefault();
    let emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (uname.value == "" || uemail.value == "" || uage.value == "" || ucity.value == "" || upass.value == "") {
        message.classList.remove('d-none');
        message.classList.add('warning-message');
        message.innerText = "Please enter the fields properly!";
    } else if (Number(uage.value) == 0) {
        message.classList.remove('d-none');
        message.classList.add('warning-message');
        message.innerText = "Please enter a valid age!";
    }
    else if (!emailRegex.test(uemail.value)) {
        message.classList.remove('d-none');
        message.classList.add('warning-message');
        message.innerText = "Enter a valid email address!";
    } else if (upass.value.length < 8) {
        message.classList.remove('d-none');
        message.classList.add('warning-message');
        message.innerText = "Password must have atleast 8 characters!";
    } else if (uage.value < 13) {
        message.classList.remove('d-none');
        message.classList.add('warning-message');
        message.innerText = "Sorry, You are not eligible!";
    } else {
        let userData = new FormData();
        userData.append('uname', uname.value);
        userData.append('uemail', uemail.value);
        userData.append('uage', uage.value);
        userData.append('ucity', ucity.value);
        userData.append('upass', upass.value);
        let imgPresent = getImg();
        if (imgPresent) {
            userData.append('uimg', userImg.files[0]);
        }
        sendRequest(userData);
    }
}

function sendRequest(userData) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "php/signup.php", true);
    xhr.onload = function () {
        if (this.status == 200) {
            let results = JSON.parse(this.responseText);
            if (results.message == 'Signup Un-Succesful.') {
                message.classList.remove('d-none');
                message.classList.add('warning-message');
                message.innerText = "Signup Un-Successful! Try Again Later.";
            } else if (results.message == 'User already Exists.') {
                message.classList.remove('d-none');
                message.classList.add('warning-message');
                message.innerHTML = "<p>User Already Exists! Try <a href='login.html'>Login</a></p>";
            } else if (results.status == true) {
                message.classList.remove('d-none');
                message.classList.add('success-message');
                message.innerHTML = "<p>SignUp Successful! Now you can <a href='login.html'>Login</a></p>";
            }
        }
    }
    xhr.send(userData);
}

function getImg() {
    if ('files' in userImg) {
        if (userImg.files.length != 0) {
            let imgType = userImg.files[0].type.split('/')[1];
            if (userImg.files[0].size > 102400) {
                message.classList.remove('d-none');
                message.classList.add('warning-message');
                message.innerText = "Max-size of image can be 100KB!";
                return false;
            } else if (imgType != "jpg" && imgType != "png" && imgType != "jpeg") {
                message.classList.remove('d-none');
                message.classList.add('warning-message');
                message.innerText = "Choose a PNG, JPG or JPEG image";
                return false;
            } else {
                message.classList.remove('warning-message');
                message.classList.add('d-none');
                return true;
            }
        }
    }
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