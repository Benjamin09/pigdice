var tempScore = 0;
var turnCount = 1;
var players=[0,0];

//Business Logic

function player(name, score) {
  this.playerName = name;
  this.gameScore = score;
}

function roll () {
  var rollResult = Math.ceil(6*Math.random());
  if (rollResult === 1) {
  tempScore = 0;
  turnCount += 1;
  alert("You rolled a one. Our condolences. Please relinquish the mouse to your opponent.")
  return rollResult;
  } else {
  tempScore += rollResult;
  return rollResult;
  }
}

function hold () {
  if (turnCount % 2 === 0) {
    player2.gameScore += tempScore;
    if(player2.gameScore>=100) {
      alert("Player 2 is victorious");
      newGame();
    } else{
      tempScore = 0;
      turnCount +=1;
    }
  } else {
    player1.gameScore += tempScore;
    if(player1.gameScore>=100) {
      alert("Player 1 is victorious");
      newGame();
    } else {
      tempScore = 0;
      turnCount +=1;
    }
  }
}

function newGame () {
  var player1 = new player(player1, 0)
  players[0]=(player1)
  var player2 = new player(player2, 0)
  players[1]=(player2)
  tempScore = 0;
  turnCount = 1;
  updateDisplay();
}

function updateDisplay() {
  $("#tempScore").text("Your current score is " + tempScore);
  $("#gameScore1").text("Player 1's score is " + players[0].gameScore);
  $("#gameScore2").text("Player 2's score is " + players[1].gameScore);
  $("#currentTurn").text(turnCount);
}

//UI Logic
$(document).ready(function() {
  // event.preventDefault()
  $("button#roll").click(function() {
    player1=players[0];
    player2=players[1];
    rollResult=roll();
    $("#rollResult").text("Your roll was " + rollResult);
    $("#tempScore").text("Your current score is " + tempScore);
    $("#currentTurn").text(turnCount);
  })
  $("button#hold").click(function() {
    player1=players[0];
    player2=players[1];
    hold();
    $("#rollResult").text("You held your score.");
    updateDisplay();
  })
  $("button#newGame").click(function() {
    newGame();
    $("#pig-dice-game").show();
    $("#rollResult").text("Starting a new game. Click Roll to roll the dice!");
  })
});
