// Initialize Firebase
$("#update") .on("click", function(){document.location.reload(true);
})
  var config = {
    apiKey: "AIzaSyBsCbFCxm5MNwPrmEmOYv82PkCP9wToo0Y",
    authDomain: "train-schedule-85c98.firebaseapp.com",
    databaseURL: "https://train-schedule-85c98.firebaseio.com",
    projectId: "train-schedule-85c98",
    storageBucket: "train-schedule-85c98.appspot.com",
    messagingSenderId: "366955944771"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  
  // 2. Button for adding trains
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trnName = $("#train-name-input").val().trim();
    var trnDestination = $("#destination-input").val().trim();
    var trnStart = moment($("#start-input").val().trim(), "HH:mm").format("X");
    var trnFrequency = $("#frequency-input").val().trim();
    console.log(trnStart);
  
    // Creates local "temporary" object for holding train data
    var newTrn = {
      name: trnName,
      destination: trnDestination,
      start: trnStart,
      frequency: trnFrequency
    };
  
    // Uploads train data to the database
    database.ref().push(newTrn);
  
    // Logs everything to console
    console.log(newTrn.name);
    console.log(newTrn.destination);
    console.log(newTrn.start);
    console.log(newTrn.frequency);
  
    alert("train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trnName = childSnapshot.val().name;
    var trnDestination = childSnapshot.val().destination;
    var trnStart = childSnapshot.val().start;
    var trnFrequency = childSnapshot.val().frequency;
  
    // train Info
    console.log(trnName);
    console.log(trnDestination);
    console.log(trnStart);
    console.log(trnFrequency);

    // var firstTime="03:30";

    var trnStartConverted = moment(trnStart, "HH:mm");
    console.log(trnStartConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(trnStartConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % trnFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = trnFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
    
    // // Prettify the train start
    var trnStartPretty = moment.unix(trnStart).format("HH:mm");
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trnName),
      $("<td>").text(trnDestination),
      $("<td>").text(trnFrequency + "  minutes"),
      $("<td>").text (trnStartPretty),
      $("<td>").text(tMinutesTillTrain+ "  minutes"),
      $("<td>").text(moment(nextTrain).format("HH:mm"))
      
    );
    
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  }); 
  