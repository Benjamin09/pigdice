var tempScore = 0;
var turnCount = 1;
var players=[0,0,0,0,0,0,0,0];

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

function hold (num) {
  var thisTurn=turnCount;
  // debugger;
  for(i=1; i<=num; i++) {
    if (thisTurn % num === (i%num)) {
      players[i-1].gameScore += tempScore;
      if(players[i-1].gameScore>=100) {
        alert("Player" + (i) + "is victorious");
        newGame();
      } else {
        tempScore = 0;
        turnCount +=1;
      }
    }
  }
}

function newGame () {
  players=[];
  var playerNumber = parseInt(prompt("How many players?"))
  for (i=0; i<playerNumber; i++) {
    players.push(new player("player" + (i+1),0));
  }
  tempScore = 0;
  turnCount = 1;
  updateDisplay();
}

function updateDisplay() {
  $("#tempScore").text("Your current score is " + tempScore);
  $("#playerScores p").remove();
  for(i=0;i<players.length;i++) {
    $("#playerScores").append("<p> Player " + (i + 1) + "'s score is " + players[i].gameScore) + " </p>";
  };
  $("#currentTurn").text(turnCount);
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
    hold(players.length);
    $("#rollResult").text("You held your score.");
    updateDisplay();
  })
  $("button#newGame").click(function() {
    newGame();
    $("#pig-dice-game").show();
    $("#rollResult").text("Starting a new game. Click Roll to roll the dice!");
  })
});
