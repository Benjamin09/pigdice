var tempScore = 0;
var gameScore1 = 0;
var gameScore2 = 0;
var turnCount = 1;

//Business Logic
function roll () {
  var rollResult = Math.ceil(6*Math.random());
  if (rollResult === 1) {
  tempScore = 0;
  turnCount += 1;
  return rollResult;
  } else {
  tempScore += rollResult;
  return rollResult;
  }
}

function hold () {
  if (turnCount % 2 === 0) {
    gameScore2 += tempScore;
  } else {
    gameScore1 += tempScore;
  }
  tempScore = 0;
  turnCount +=1;
}

function newGame () {
  gameScore1 = 0;
  gameScore2 = 0;
  tempScore = 0;
  turnCount = 1;
}



//UI Logic
$(document).ready(function() {
  // event.preventDefault()
  $("button#roll").click(function() {
    rollResult=roll();
    $("#rollResult").text("Your roll was " + rollResult);
    $("#tempScore").text("Your current score is " + tempScore);
    $("#currentTurn").text(turnCount);
  })
  $("button#hold").click(function() {
    hold();
    $("#rollResult").text("You held your score.");
    $("#tempScore").text("Your current score is " + tempScore);
    $("#gameScore1").text("Player 1's score is " + gameScore1);
    $("#gameScore2").text("Player 2's score is " + gameScore2);
    $("#currentTurn").text(turnCount);
  })
  $("button#newGame").click(function() {
    newGame();
    $("#rollResult").text("Starting a new game. Click Roll to roll the dice!");
    $("#tempScore").text("Your current score is " + tempScore);
    $("#gameScore1").text("Player 1's score is " + gameScore1);
    $("#gameScore2").text("Player 2's score is " + gameScore2);
    $("#currentTurn").text(turnCount);
  })

});
