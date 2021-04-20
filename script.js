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
/**
 *  Will change the background color based on the div id
 * Which had the mouseover 
 * @param {*} event 
 */
  function changeSquareColor(event) {
    event.target.style.backgroundColor = setColor(event.target.id);
  }
  /**
   * This will add a mouseover listener for the each div
   * Which will be created from our makeBoard function
   * When the mouse over is detected will call the 
   * Change square color function 
   * @returns 
   */
  function addGridHoverListener() {
    const divs = document.querySelectorAll('.item');
    divs.forEach((div) => {
      div.addEventListener('mouseover', changeSquareColor);
    });
    return;
  }

/**
 * Function which create the drawing board by using the divs
 * And then adding them again to the DOM 
 * An id will be associated with the div
 * An array which will keep a track of the colors 
 * @param {*} num for the number of squares in the drawing area as desired by the user 
 * @returns 
 */
  function makeBoard(num) {    
    //   gridColorArray = []; // clears all array elements for a fresh start
      document.getElementById('grid').style.gridTemplateRows = `repeat(${num}, 1fr)`;
      document.getElementById('grid').style.gridTemplateColumns = `repeat(${num}, 1fr)`;
      for (let i = 0; i < num * num; i++) {
        const div = document.createElement('div');
        /* let textNode = document.createTextNode(i);
        div.appendChild(textNode); */
        div.setAttribute('id', `${i}`);
        div.classList.add('item');
        document.getElementById('grid').appendChild(div);
        gridColorArray.push(246); //rgb(246, 246, 246) is the background color for .item
      }
      showGridSize(num); 
      document.getElementById(colorMode).classList.add('btn--active');
      resetFocus(); 
      addGridHoverListener(); 
      return;
    }