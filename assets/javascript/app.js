var questionBank = [
    {
        question: "How many stomachs does a cow have?",
        choices: ["1", "2", "3", "4"],
        answer: "4"
    },
    {
        question: "What is the largest Frog?",
        choices: ["Cane Toad", "North American Bullfrog", "African Goliath Frog", "Poison Dart Frog"],
        answer: "African Goliath Frog"
    },
    {
        question: "What is the longest snake?",
        choices: ["Anaconda", "Reticulated python", "Green tree snake", "Corn snake"],
        answer: "Reticulated python"
    }
]
var seconds = 0;
var setIntervalId = 0;
var setTimer = 0;
var displayTime = 0;
var questionNum = 0;
var incorrect = 0;
var correct = 0;
var unanswered = 0;

//Starts the quiz
function startQuiz() {
    $("#startBtn").hide();
     displayQuestion();
}

//This function restarts the quiz
function restartQuiz() {
    $("#resultDiv").empty();
    questionNum = 0;
    correct = 0;
    incorrect = 0;
    unanswered = 0;
    displayQuestion();
}

//This function sets the count down timer 30 to 0 secs for each question
function countDown(questionId) {
    //Checks if the seconds is not going negative
    if (seconds > 0) {
       $("#displayTime").html("Time remaining "+seconds+" Seconds");       
        seconds--;        
    }
    else {
        clearInterval(setTimer);
        $("#displayTime").html("Time remaining "+seconds+" Seconds");
        $("#choices").empty();
        $("#dispAnswer").html("Out of Time!!");
        $("#dispAnswer").append("<p>The correct answer was " + questionBank[questionId].answer);
        //tracking the unanswered questions here 
        unanswered++;
        //This variable takes us to the next question set
        questionNum++;
        //Displays the results for 3 secs and moves to the next question
        setIntervalId = setTimeout(function () {
            displayQuestion();
        }, 3000);
    }
}

//This function checks the clicked answer
$('#choices').on('click', '.choice', function(){    
    var answerId=$(this).attr("id");
    var questionId=$(this).attr("questNo");
    console.log(questionId);
    //This condition checks if the selected answer is correct or incorrect
    if (questionBank[questionId].choices[answerId] != questionBank[questionId].answer) {
        //stoping the timer here to display the message
        clearInterval(setTimer);
        //$("#question").empty();
        $("#choices").empty();
        $("#dispAnswer").html("Your answer was incorrect the correct answer is: " + questionBank[questionId].answer);
        //tracking the incorrect answers here
        incorrect++;
        //This variable takes us to the next question set
        questionNum++;
        //if the answer is incorrect displays the message to the user and moves on to the next question after 3 secs
        setIntervalId = setTimeout(function () {
            displayQuestion();
        }, 3000);

    }
    else {
        //stoping the timer here to display the message
        clearInterval(setTimer);
        //$("#question").empty();
        $("#choices").empty();
        $("#dispAnswer").html("Congratulations!!!");
        $("#dispAnswer").append("<p>You answered correctly as " + questionBank[questionId].answer);
        //tracking the correct answers here
        correct++;
        //This variable take us to the next question set
        questionNum++;
        //if the answer is correct display the message to the user and moves on to the next question after 3 secs
        setIntervalId = setTimeout(function () {
            displayQuestion();
        }, 3000);

    }
});

//This function displays all the results
function displayResults() {
    //clearing the timer divs and display answer divs
    $("#dispAnswer").empty();
    $("#displayTime").empty();
    $("#question").html("Thankyou for taking the Quiz!!! Here is your results!!!");
    $("#resultDiv").html('<p>Correct Answers :<span id="correct">' + correct + '</span></p>');
    $("#resultDiv").append('<p>Incorrect Answers :<span id="incorrect">' + incorrect + '</span></p>');
    $("#resultDiv").append('<p>Unanswered :<span id="notanswered">' + unanswered + '</span></p>');
    $("#resultDiv").append('<button type="submit" id="restartBtn" class="btn btn-primary" onclick="restartQuiz()">Start Over?</button>');
    $("#resultDiv").show();
}

//This function displays the question,sets the timer for the question and choices
function displayQuestion() {

    if (questionNum == 3 || questionNum > 3) {

        clearInterval(setTimer);
        clearTimeout(setIntervalId);
        displayResults();
    }
    else {
        //clears the previous timer
        clearTimeout(setIntervalId);

        $("#choices").empty();
        $("#dispAnswer").empty();
        seconds = 10;
        //sets timer for the question
        setTimer = setInterval(function () {
            countDown(questionNum);
        }, 1000); 
        //displays the question
        $("#question").html((questionNum+1)+"."+questionBank[questionNum]["question"]);
        //dynamically generating the choices buttons
        for (i = 0; i < questionBank[questionNum]["choices"].length; i++){
            var childDiv=$("<button>");
            childDiv.attr('id',i);
            childDiv.attr('questNo',questionNum);
            childDiv.attr('class','choice btn btn-primary col-xs-4 col-md-offset-2');
            childDiv.html(questionBank[questionNum].choices[i]);
            $("#choices").append(childDiv);           
        }
        console.log(questionBank[questionNum].question);
        console.log(questionNum);
    }


}



