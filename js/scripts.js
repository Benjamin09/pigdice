var tempScore = 0;
var turnCount = 0;
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
  difficultAI();
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

function leadCheck (score) {
  var deficit=0;
  for(i=0; i<players.length; i++) {
    thisDifference = score - players[i].gameScore
    if(thisDifference < deficit) {
      deficit = thisDifference;
    }
  }
  return (-deficit/5);
}

function easyAI () {
  if(players[(turnCount-1)%players.length].species==="dumbcomputer"){
    var AIResult = roll();
    if (AIResult != 1) {
      if(tempScore+players[(turnCount-1)%players.length].gameScore>=100) {
        hold(players.length);
        return
      }
      AIResult2 = roll();
      if (AIResult2 !=1) {
        alert("The AI has elected to hold after rolling a " + AIResult + " and a " + AIResult2 + ".");
        hold(players.length);
        updateDisplay();
        easyAI();
        difficultAI();
      }
    }
  }
}

function difficultAI () {
  if(players[(turnCount-1)%players.length].species==="smartcomputer"){
    var AIRolls = [];
    var AIResult = roll();
    if (AIResult != 1 && tempScore < 20) {
      AIRolls.push(AIResult)
      subDifficultAI(AIRolls)
    }
  }
}

function subDifficultAI(arr) {
  if(tempScore+players[(turnCount-1)%players.length].gameScore>=100) {
    hold(players.length);
    return
  }
  var subAIResult = roll();
  if (subAIResult != 1 && tempScore < (20+leadCheck(players[(turnCount-1)%players.length].gameScore))) {
    arr.push(subAIResult)
    subDifficultAI(arr)
  } else if (subAIResult != 1) {
    arr.push(subAIResult);
    var difficultAIString = "";
    var sum=0;
    for(i=0;i<arr.length;i++) {
      var rollword=arr[i].toString()
      if (i === (arr.length - 1)) {
      difficultAIString = difficultAIString + "and a " + rollword;
      } else {
      difficultAIString= difficultAIString + rollword + ", ";
      }
      sum+=arr[i];
    };
    alert("The AI elected to hold after rolling a " + difficultAIString + " for a total of "+sum+ ".");
    hold(players.length);
    updateDisplay();
    easyAI();
    difficultAI();
  }
}

function newGame () {
  var fullreset=true;
  if (turnCount > 0) {
    fullreset = !confirm("Would you like to play again with the same players?");
  }
  if(fullreset) {
    players=[];
    var playerNumber = parseInt(prompt("How many human players?"))
    for (i=0; i<playerNumber; i++) {
      var playerNameInput = prompt("Enter a name for Player " + (i+1));
      players.push(new player(playerNameInput,0,"human"));
    }
    var easyAINumber = parseInt(prompt("How many easy AI players?"));
    for (i=0; i<easyAINumber; i++) {
      var aiNameInput = prompt("Enter a name for Easy Computer Player " + (i+1));
      players.push(new player(aiNameInput,0,"dumbcomputer"));
    }
    var difficultaiNumber = parseInt(prompt("How many difficult AI players?"));
    for (i=0; i<difficultaiNumber; i++) {
      var difficultaiNameInput = prompt("Enter a name for Difficult Computer Player " + (i+1));
      players.push(new player(difficultaiNameInput,0,"smartcomputer"));
    }
  } else {
    for(i=0; i<players.length; i++) {
      players[i].gameScore=0;
    }
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
    difficultAI();
  })
  $("button#newGame").click(function() {
    newGame();
    $("#pig-dice-game").show();
    $("#rollResult").text("Starting a new game. Click Roll to roll the dice!");
  })
  $("button#aiTurn").click(function() {
    difficultAI();
    $("#rollResult").text("---");
  })
});
