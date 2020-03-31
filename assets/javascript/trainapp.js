var firebaseConfig = {
    apiKey: "AIzaSyCbSKDC3QBuUOdRbID-xYAz5dOdd34w1yg",
    authDomain: "traingame-3bab8.firebaseapp.com",
    databaseURL: "https://traingame-3bab8.firebaseio.com",
    projectId: "traingame-3bab8",
    storageBucket: "traingame-3bab8.appspot.com",
    messagingSenderId: "666927985015",
    appId: "1:666927985015:web:4c4fa064f48bf02e92f172"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

database.ref().push({
    Name: "Bob",
    Age: 28
})

database.ref().once('value').then(function (snapshot) {

    var obj = snapshot.val()
    for (var key in obj) {
        console.log(key)
        console.log(obj[key])
    }
    // var key = snapshot.key
    // console.log(key)
    // console.log(value)

});
