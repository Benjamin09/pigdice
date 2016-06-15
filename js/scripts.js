var tempScore = 0;
var gameScore = 0;
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
  gameScore += tempScore;
  tempScore = 0;
  turnCount +=1;
}

function newGame () {
  gameScore = 0;
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
    $("#gameScore").text("Your total score is " + gameScore);
    $("#rollResult").text("You held your score.");
    $("#tempScore").text("Your current score is " + tempScore);
    $("#currentTurn").text(turnCount);
  })
  $("button#newGame").click(function() {
    newGame();
    $("#rollResult").text("Starting a new game. Click Roll to roll the dice!");
    $("#gameScore").text("Your total score is " + gameScore);
    $("#tempScore").text("Your current score is " + tempScore);
    $("#currentTurn").text(turnCount);
  })

});
