document.addEventListener("DOMContentLoaded", function() {
    if(!sessionStorage.getItem('uname')){
        window.location = 'login.html';
    }
    document.title = 'Hoşgeldin ' + sessionStorage.getItem('uname');
});

// İnit Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCHeB7A1wrnR-G4tNEQPkzJz67k3CllYH0",
    authDomain: "chatapp-9c9f2.firebaseapp.com",
    databaseURL: "https://chatapp-9c9f2.firebaseio.com",
    projectId: "chatapp-9c9f2",
    storageBucket: "chatapp-9c9f2.appspot.com",
    messagingSenderId: "546619390807",
    appId: "1:546619390807:web:92313ceda11624a7569c12"
  };
firebase.initializeApp(firebaseConfig);
// İnit Firebase

// Mesaj Kaydetme
function sendMessage() {
    var message = document.getElementById('messageInput').value;
    if(message.length){
        var date = new Date();
        var time = date.getTime(); 
        
        firebase.database().ref('messages').push().set({
            "sender": sessionStorage.getItem('uname'),
            "message": message,
            "time" : time
        });
        document.getElementById('messageInput').value = '';
    } else {
        alert('Lütfen Mesajınızı Girin');
    }
}
document.getElementById('sendMessageBtn').addEventListener('click', function() {sendMessage();});
document.getElementById('messageInput').addEventListener('keypress', function(e) {if(e.keyCode == 13){sendMessage();}});

// Mesajları Listeleme
firebase.database().ref("messages").on("child_added", function (snapshot) {
    var time = timeSince(snapshot.val().time);
    var html = '';
    if(snapshot.val().sender == sessionStorage.getItem('uname')){
        html += '<div class="my_msg">';
        html += '<p>'+snapshot.val().message+'</p><span class="time_date">'+time+'</span>';
        html += '</div>';
    } else {
        html += '<div class="req_msg">';
        html += '<p><strong>'+snapshot.val().sender+' : </strong>'+snapshot.val().message+'</p><span class="time_date">'+time+'</span>';
        html += '</div>';
    }
    document.getElementById('messages').innerHTML += html;
    document.getElementById('contain_messages').scrollTo(0, document.getElementById('contain_messages').scrollHeight)
    console.log(); 
});

function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
        return interval + " Yıl Önce";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " Ay Önce";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " Gün Önce";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " Saat Önce";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " Dakika Önce";
    }
    if(seconds <= 55){
        return "Az Önce";
    } else {
        return Math.floor(seconds) + " Saniye Önce";
    }
}