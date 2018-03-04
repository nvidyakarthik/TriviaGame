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

    $("#startBtn").hide();
    //$("#resultDiv").hide();
    displayQuestion();
}

function restartQuiz() {
    $("#resultDiv").empty();
    //  $("#mainDiv").hide();
    //$("#resultDiv").hide();
    questionNum = 0;
    correct = 0;
    incorrect = 0;
    unanswered = 0;
    displayQuestion();
}


function countDown(questionId) {

    //var timerCheck=0; 


    if (seconds > 0) {
       $("#displayTime").html("Time remaining "+seconds+" Seconds");
       //$("#displayTime").html(seconds);
        seconds--;
        //timerCheck=setTimeout(countDown(seconds),1000);
    }
    else {

        clearInterval(setTimer);
        $("#displayTime").html("Time remaining "+seconds+" Seconds");
       // $("#displayTime").html(seconds);
       // $("#question").empty();
        $("#choices").empty();
        $("#dispAnswer").html("Out of Time!!");
        $("#dispAnswer").append("<p>The correct answer was " + questionBank[questionId].answer);
        unanswered++;
        questionNum++;

        setIntervalId = setTimeout(function () {
            displayQuestion();
        }, 3000);


    }


}
$('#choices').on('click', '.choice', function(){

    
    var answerId=$(this).attr("id");
    var questionId=$(this).attr("questNo");
    console.log(questionId);

 
/*function checkAnswer(answerId, questionId) { */

    if (questionBank[questionId].choices[answerId] != questionBank[questionId].answer) {
        clearInterval(setTimer);
        //$("#question").empty();
        $("#choices").empty();
        $("#dispAnswer").html("Your answer was incorrect the correct answer is: " + questionBank[questionId].answer);
        incorrect++;
        questionNum++;
        setIntervalId = setTimeout(function () {
            displayQuestion();
        }, 3000);

    }
    else {
        clearInterval(setTimer);
        //$("#question").empty();
        $("#choices").empty();
        $("#dispAnswer").html("Congratulations!!!");
        $("#dispAnswer").append("<p>You answered correctly as " + questionBank[questionId].answer);
        correct++;
        questionNum++;

        setIntervalId = setTimeout(function () {
            displayQuestion();
        }, 3000);

    }
});


function displayResults() {
    $("#dispAnswer").empty();
    $("#displayTime").empty();
    $("#question").html("Thankyou for taking the Quiz!!! Here is your results!!!");
    
    //$("#resultDiv").html('<p>All done,Here\'s how you did!!</p>');
    $("#resultDiv").html('<p>Correct Answers :<span id="correct">' + correct + '</span></p>');
    $("#resultDiv").append('<p>Incorrect Answers :<span id="incorrect">' + incorrect + '</span></p>');
    $("#resultDiv").append('<p>Unanswered :<span id="notanswered">' + unanswered + '</span></p>');
    $("#resultDiv").append('<button type="submit" id="restartBtn" class="btn btn-primary" onclick="restartQuiz()">Start Over?</button>');
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
        $("#dispAnswer").empty();
        seconds = 10;
        setTimer = setInterval(function () {
            countDown(questionNum);
        }, 1000); 
        $("#question").html((questionNum+1)+"."+questionBank[questionNum]["question"]);
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



