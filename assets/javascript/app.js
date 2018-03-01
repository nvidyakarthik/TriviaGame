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

function startQuiz() {

    $("#btnDiv").hide();
    //$("#resultDiv").hide();
    displayQuestion();
}

function restartQuiz() {
    $("#resultDiv").empty();
    //  $("#btnDiv").hide();
    //$("#resultDiv").hide();
    questionNum = 0;
    correct = 0;
    incorrect = 0;
    unanswered = 0;
    displayQuestion();
}

function countDown(questionId) {

    //var timerCheck=0; 


    if (seconds >= 0) {
        $("#displayTime").html("Time remaining "+seconds+" Seconds");
        seconds--;
        //timerCheck=setTimeout(countDown(seconds),1000);
    }
    else {

        clearInterval(setTimer);
        $("#questionDiv").hide();
        $("#dispAnswer").html("Out of Time!!");
        $("#dispAnswer").append("<p>The correct answer was" + questionBank[questionId].answer);
        unanswered++;
        questionNum++;

        setIntervalId = setTimeout(function () {
            displayQuestion();
        }, 3000);


    }


}
function checkAnswer(answerId, questionId) {

    if (questionBank[questionId].choices[answerId] != questionBank[questionId].answer) {
        clearInterval(setTimer);
        $("#questionDiv").hide();
        $("#dispAnswer").html("your answer war incorrect correct answer is: " + questionBank[questionId].answer);
        incorrect++;
        questionNum++;
        setIntervalId = setTimeout(function () {
            displayQuestion();
        }, 3000);

    }
    else {
        clearInterval(setTimer);
        $("#questionDiv").hide();
        $("#dispAnswer").html("congratulations!!!");
        $("#dispAnswer").append("<p>You answered correctly as " + questionBank[questionId].answer);
        correct++;
        questionNum++;

        setIntervalId = setTimeout(function () {
            displayQuestion();
        }, 3000);

    }
}


function displayResults() {
    $("#dispAnswer").empty();
    $("#resultDiv").html('<p>All done,Here\'s how you did!!</p>');
    $("#resultDiv").append('<p>correct Answers:<span id="correct">' + correct + '</span></p>');
    $("#resultDiv").append('<p>incorrect Answers:<span id="incorrect">' + incorrect + '</span></p>');
    $("#resultDiv").append('<p>unanswered:<span id="notanswered">' + unanswered + '</span></p>');
    $("#resultDiv").append('<button type="submit" id="restartBtn" onclick="restartQuiz()">Start Over?</button>');
    $("#resultDiv").show();
}

function displayQuestion() {

    if (questionNum == 3 || questionNum > 3) {

        clearInterval(setTimer);
        clearTimeout(setIntervalId);
        displayResults();
    }
    else {
        clearTimeout(setIntervalId);

        $("#choices").empty();
        $("#question").empty();
        $("#dispAnswer").empty();
        $("#questionDiv").show();

        seconds = 10;
        /* setTimer = setInterval(function () {
            countDown(questionNum);
        }, 1000); */
        $("#question").html(questionBank[questionNum]["question"]);
        for (i = 0; i < questionBank[questionNum]["choices"].length; i++){
            $("#choices").append("<div class='test' onclick='checkAnswer(" + i + "," + questionNum + ")' id=A" + i + ">" + questionBank[questionNum].choices[i] + "</div>");
       
        }
        console.log(questionBank[questionNum].question);

        console.log(questionNum);
    }


}



