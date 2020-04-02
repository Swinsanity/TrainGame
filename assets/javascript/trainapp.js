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

var now = moment();
console.log("CURRENT TIME: " + moment(now).format("hh:mm a"));

$("#addTrainButton").on("click", function(event) {
    event.preventDefault();

    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrainTime = $("#firstTrainTime").val().trim();
    var frequency = $("#frequency").val().trim();

    var newTrain = {
        name: trainName,
        dest: destination,
        time: firstTrainTime,
        freq: frequency,
    };

    database.ref().push(newTrain)
    
    console.log(newTrain.name)
    console.log(newTrain.dest)
    console.log(newTrain.time)
    console.log(newTrain.freq)

    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrainTime").val("");
    $("#frequency").val("");

});

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().dest;
    var trainTime = childSnapshot.val().time;
    var trainFreq = childSnapshot.val().freq;

    console.log(trainName)
    console.log(trainDest)
    console.log(trainTime)
    console.log(trainFreq)

    var firstTime = moment(trainTime, "HH:mm").subtract(1, "years");
    console.log(firstTime);

    var currentTime = moment();
    
    var timeDifference = moment().diff(moment(firstTime), "minutes");
    console.log("Time Difference: " + timeDifference);

    var timeRemain = timeDifference % trainFreq
    console.log(timeRemain)

    var trainMinutes = trainFreq - timeRemain;
    console.log("Minutes Until Next Train: " + trainMinutes)

    var nextTrain = moment().add(trainMinutes, "minutes").format("hh:mm a");
    console.log("Train will arrive: " + moment(nextTrain).format("hh:mm"));

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDest),
        $("<td>").text(trainFreq),
        $("<td>").text(nextTrain),
        $("<td>").text(trainMinutes)
    );

    $("#trainTable > tbody").append(newRow);




});
// Was messing around with Firebase 
// database.ref().push({
//     Name: "Bernice",
//     Age: 42
// })

// database.ref().once('value').then(function (snapshot) {

//     var obj = snapshot.val()
//     for (var key in obj) {
//         console.log(key)
//         console.log(obj[key])
//     }
//     // var key = snapshot.key
//     // console.log(key)
//     // console.log(value)

// });
