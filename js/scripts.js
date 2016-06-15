var tempScore = 0;
var turnCount = 1;
var players=[];

//Business Logic

function player(name, score, species) {
  this.playerName = name;
  this.gameScore = score;
  this.species = species
}

function roll () {
  var rollResult = Math.ceil(6*Math.random());
  if (rollResult === 1) {
  tempScore = 0;
  if(players[(turnCount-1)%players.length].species === "human") {
    alert("You rolled a one. Our condolences. Please relinquish the mouse to your opponent.")
  } else {
    alert("The computer rolled a one, you would think it could rig this thing somehow")
  }
  turnCount += 1;
  easyAI();
  } else {
  tempScore += rollResult;
  }
  updateDisplay();
  return rollResult;
}

function hold (num) {
  var thisTurn=turnCount
  // debugger;
  for(i=1; i<=num; i++) {
    if (thisTurn % num === (i%num)) {
      players[i-1].gameScore += tempScore;
      if(players[i-1].gameScore>=100) {
        alert(players[i-1].playerName + " is victorious");
        newGame();
      } else {
        tempScore = 0;
        turnCount +=1;
      }
    }
  }
}

function easyAI () {
  if(players[(turnCount-1)%players.length].species==="computer"){
    var AIResult = roll();
    if (AIResult != 1) {
      AIResult2 = roll();
      if (AIResult2 !=1) {
        alert("The AI has elected to hold after rolling a " + AIResult + " and a " + AIResult2 + ".");
        hold(players.length);
        updateDisplay();
        easyAI();
      }
    }
  }
}

function newGame () {
  players=[];
  var playerNumber = parseInt(prompt("How many human players?"))
  for (i=0; i<playerNumber; i++) {
    var playerNameInput = prompt("Enter a name for Player " + (i+1));
    players.push(new player(playerNameInput,0,"human"));
  }
  var aiNumber = parseInt(prompt("How many AI players?"));
  for (i=0; i<aiNumber; i++) {
    var aiNameInput = prompt("Enter a name for Computer Player " + (i+1));
    players.push(new player(aiNameInput,0,"computer"));
  }
  tempScore = 0;
  turnCount = 1;
  updateDisplay();
}




function updateDisplay() {
  $("#tempScore").text("Your current score is " + tempScore);
  $("#playerScores p").remove();
  for(i=0;i<players.length;i++) {
    $("#playerScores").append("<p>" + players[i].playerName + "'s score is " + players[i].gameScore) + " </p>";
  };
  $("#currentTurn").text(players[(turnCount-1)%players.length].playerName + "'s turn");
}

//UI Logic
$(document).ready(function() {
  // event.preventDefault()
  $("button#roll").click(function() {
    rollResult=roll();
    $("#rollResult").text("Your roll was " + rollResult);
    $("#tempScore").text("Your current score is " + tempScore);
    $("#currentTurn").text(players[(turnCount-1)%players.length].playerName + "'s turn");
  })
  $("button#hold").click(function() {
    hold(players.length);
    $("#rollResult").text("You held your score.");
    updateDisplay();
    easyAI();
  })
  $("button#newGame").click(function() {
    newGame();
    $("#pig-dice-game").show();
    $("#rollResult").text("Starting a new game. Click Roll to roll the dice!");
  })
  $("button#aiTurn").click(function() {
    easyAI();
    $("#rollResult").text("---");
  })
});
