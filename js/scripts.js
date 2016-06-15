//Business Logic
function roll () {
  var rollResult = Math.ceil(6*Math.random());
  return rollResult;
}


//UI Logic
$(document).ready(function() {
  // event.preventDefault()
  $("button#roll").click(function() {
  rollResult=roll();
  $("#rollResult").text("Your roll was " + rollResult);
  })
});
