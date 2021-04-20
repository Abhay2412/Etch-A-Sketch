//Where the function declarations will go, global variables 
//Event listeners for changing the colors and also 
//Function calling at the end
/**
 * Will reset the color for each of the div
 * And then reset the colors in the array provided 
 * @param {*} event 
 * @returns 
 */
function clearBoard(event) {
    const divResets = document.querySelectorAll('.item');
    divResets.forEach((div) => {
      div.style.backgroundColor = ''; // sets each div to the default for class .item
    });
    //Reset all gridColorArray all back to white when the board is cleared
    gridColorArray.forEach((element, index) => gridColorArray[index] = 247);
    resetFocus();
    return;
  }