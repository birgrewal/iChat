// Important Variables
const logoutBtn = document.querySelector('#logout');
const userResults = document.querySelector('.moreUsers .results');
const userSearch = document.querySelector('#userSearch');
const searchBtn = document.querySelector('#searchBtn');
let unique_id;
userResults.innerHTML = "";

// Event Listeners
window.addEventListener('load', isLogin); // to check whether user is logged in or not
logoutBtn.addEventListener('click', logout); // to logout user
userSearch.addEventListener('keyup', searchUser); // to filter users as per search term
searchBtn.addEventListener('click', searchUser); // to filter users when user clicks on search button

// Functions
function isLogin() {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "php/_isLogin.php", true);
    xhr.onload = function () {
        if (this.status == 200) {
            let results = JSON.parse(this.responseText);
            if (!results.status) {
                changeLayout();
            } else if (results.status) {
                let userInfo = results.userInfo;
                document.querySelector('.userInfo .aboutUser .name').innerText = userInfo['name'];
                document.querySelector('.userInfo .aboutUser .user').innerText = userInfo['email'];
                if (userInfo['user_img']) {
                    document.querySelector('.userInfo .userImg img').src = userInfo['user_img'];
                } else {
                    document.querySelector('.userInfo .userImg img').src = 'userImgs/admin@admin.comprofiliePic.png';
                }
                unique_id = userInfo['unique_id'];
                setInterval(() => {
                    showActiveUsers();
                }, 1000);
            }
        }
    }
    xhr.send();
}

function changeLayout() {
    document.head.title = "Let's do iChat!";
    let headHTML = document.head.innerHTML.split('<link rel="stylesheet" href="css/style.css">');
    headHTML = headHTML[0] + headHTML[1] + '<link rel="stylesheet" href="css/style2.css">';
    document.head.innerHTML = headHTML;
    document.body.innerHTML = `<div class="container">
    <h1>Welcome to iChat</h1>
    <h2>Your personal chatting app</h2>
    <div class="box">
        <button><a href="signup.html">SignUp</a></button>
        <button><a href="login.html">Login</a></button>
    </div>
</div>`;
}

function logout() {
    let logout = confirm('Are you sure? Do you want to Logout?');
    if (logout) {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "php/_logout.php", true);
        xhr.onload = function () {
            if (this.status == 200) {
                let response = JSON.parse(this.responseText);
                if (response.status) {
                    location.reload();
                }else if(response.message = "Not logged in"){
                    location.href = "index.html";
                }
            }
        }
        xhr.send();
    }
}

function showActiveUsers() {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "php/_showActiveUsers.php", true);
    xhr.onload = function () {
        if (this.status == 200) {
            let results = JSON.parse(this.responseText);
            if (results.message == "No User") {
                userResults.innerHTML = `<div class="noUser">No User Available!</div>`;
            } else if (results.status) {
                let users = results.users;
                if (users.length - 1 > userResults.children.length || users.length - 1 < userResults.children.length) {
                    userResults.innerHTML = "";
                    for (user of users) {
                        if (user['name'] != document.querySelector('.userInfo .aboutUser .name').innerText) {
                            let userImg;
                            if (user['userImg']) {
                                userImg = user['userImg'];
                            } else {
                                userImg = "userImgs/defaultUser.png";
                            }
                            userResults.innerHTML += ` <div class="user" data-id="${user['unique_id']}">
                                <div class="userImg">
                                    <img src="${userImg}" alt="">
                                </div>
                                <div class="aboutUser">
                                    <div class="name">${user['name']}</div>
                                    <div class="email">${user['email']}</div>
                                </div>
                                <div class="status"></div>
                            </div> `;
                        }
                    }
                    // Opening up chat page when the user clicks on a user to chat
                    Array.from(document.querySelectorAll('.user')).forEach(element => {
                        element.addEventListener('click', () => {
                            let toUser = element.getAttribute('data-id');
                            window.open(`chat.html?chat=${toUser}`)
                        });
                    });
                }
            }
        }
    }
    xhr.send();
}

function searchUser() {
    if (userResults.innerHTML.length == "") {
        userResults.innerHTML = `<div class="noUser">No User Available!</div>`;
    } else {
        let searchString = userSearch.value.toLowerCase();
        for (let i = 0; i < userResults.children.length; i++) {
            let name = userResults.children[i].children[1].children[0].innerText.toLowerCase();
            let email = userResults.children[i].children[1].children[1].innerText.toLowerCase();
            if (name.includes(searchString) || email.includes(searchString)) {
                userResults.children[i].style.display = "flex";
            } else {
                userResults.children[i].style.display = "none";
            }
        }
    }
}