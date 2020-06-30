let nameInput = document.querySelector('#uname');
let loginBtn = document.querySelector('#login');
loginBtn.addEventListener('click', function() {login();});
nameInput.addEventListener('keypress', function(e) {if (e.keyCode == 13) {login();}});
function login() {
    if (nameInput.value.length > 0) {
        sessionStorage.setItem('uname', nameInput.value);
        window.location = 'chat.html';
    } else {
        alert('Lütfen Adınızı Girin');
    }
}
document.addEventListener("DOMContentLoaded", function() {
    sessionStorage.clear();
});