// Important Variables
const chatInput = document.querySelector('#chatInput');
const sendBtn = document.querySelector('#sendMessage');
const chatMsgs = document.querySelector('.chatMessages');

let unique_id;
// Event Listeners
window.addEventListener('load', isLogin); // to check whether user is logged in or not
sendBtn.addEventListener('click', addMessage);
chatInput.addEventListener('keydown', (e) => { if (e.keyCode == 13) { addMessage(); } });

// Functions
function isLogin() {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "php/_isLogin.php", true);
    xhr.onload = function () {
        if (this.status == 200) {
            let results = JSON.parse(this.responseText);
            if (!results.status) {
                setInterval(() => {
                    redirectUser();
                }, 1000);
            } else if (results.status) {
                unique_id = location.href.split('?chat=')[1].split('&')[0];
                showInfo(unique_id);
                setInterval(() => {
                    showMessage();
                }, 500);
            }
        }
    }
    xhr.send();
}

function redirectUser() {
    location.href = "index.html";
}

function showInfo(uId) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "php/_getUserInfo.php", true);
    xhr.onload = function () {
        if (this.status == 200) {
            let response = JSON.parse(this.responseText);
            if (response.status) {
                let userInfo = response.userInfo;
                let userImg;
                if (userInfo['user_img']) {
                    userImg = userInfo['user_img'];
                } else {
                    userImg = "userImgs/defaultUser.png";
                }
                document.querySelector('.userInfo .aboutUser .name').innerText = userInfo['name'];
                document.querySelector('.userInfo .aboutUser .user').innerText = userInfo['email'];
                document.querySelector('.userInfo .userImg img').src = userImg;
            }
        }
    }
    let uid = new FormData();
    uid.append('unique_id', uId);
    xhr.send(uid);
}

function addMessage() {
    let msg = chatInput.value;
    let xhr = new XMLHttpRequest();
    xhr.open('POST', "php/_addMessage.php", true);
    xhr.onload = function () {
        if (this.status == 200) {
            let results = JSON.parse(this.responseText);
            if (results.status) {
                showMessage();
            } else {
                alert('Error!!');
            }
        }
    }
    let msgData = new FormData();
    msgData.append('msg', chatInput.value);
    msgData.append('receiver_id', unique_id);
    xhr.send(msgData);
    chatInput.value = "";
}

function showMessage() {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', "php/_showMessage.php", true);
    xhr.onload = function () {
        if (this.status == 200) {
            let results = JSON.parse(this.responseText);
            if (results.status) {
                let data = results.data;
                if (data.length > chatMsgs.children.length) {
                    chatMsgs.innerHTML = "";
                    for (let row of data) {
                        if (row['message_from'] == unique_id) {
                            chatMsgs.innerHTML += `<div class="received"><span>${row['message']}</span></div>`;
                        } else {
                            chatMsgs.innerHTML += `<div class="sent"><span>${row['message']}</span></div>`;
                        }
                    }
                }
            } else if (results.message == "Messages Not Found!") {

            } else if (results.message == "Error!!") {

            }
        }
    }
    let msgsInfo = new FormData();
    msgsInfo.append('receiver_id', unique_id);
    xhr.send(msgsInfo);
}