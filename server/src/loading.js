export function loading() {
  disableButtons();
  //Keep checking if loading is complete ever 10ms
  var loadingTimer = setInterval(function() {
    //If the final frame is loaded, render the first frame and clear the timer
    if(currentMoveFrames[currentMoveFrames.length-1].complete === true){
      clearTimeout(loadingTimer);
      enableButtons();
      getMoveFrame();
    }
  }, 10)
}