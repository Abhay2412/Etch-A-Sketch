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
      gridColorArray = []; // clears all array elements for a fresh start
      document.getElementById('grid').style.gridTemplateRows = `repeat(${num}, 1fr)`;
      document.getElementById('grid').style.gridTemplateColumns = `repeat(${num}, 1fr)`;
      for (let i = 0; i < num * num; i++) {
        const div = document.createElement('div');
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

    /**
     * This will clear the click actions based on the id which
     * was clicked and then sets the colorMode 
     * Also adds and removes the visual color mode
     * to the buttons
     * @param {*} event 
     * @returns 
     */
    function clickActions(event) {
        //Checking for the ids by using and if statement and switch statments 
        if (this.id === 'clearBoard' || this.id === 'resize' || this.id === 'submitResize') {
          switch(this.id) {
            case 'clearBoard':
              clearBoard(event);
              break;
            case 'resize':
              launchModal();
              break;
            case 'submitResize':
              getResizeInput(event);
              break;        
          }
          return;
        } else {
            document.getElementById(colorMode).classList.remove('btn--active'); 
            switch (this.id) {
              case 'normal':
                colorMode = 'normal';
                break;
              case 'rainbow':
                colorMode = 'rainbow';
                break;
              case 'greyScale':
                colorMode = 'greyScale';
                break;
              case 'erase':
                colorMode = 'erase';
                break;
              default:
                console.log('No color mode identified');
                colorMode = 'normal';
                break;
            }
            document.getElementById(colorMode).classList.add('btn--active'); 
            return;
          }
      }
      
      /**
       * Random integer creater 
       * @param {} min Minumum value 
       * @param {*} max Maximum value 
       * @returns 
       */
      function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max); 
        return Math.floor(Math.random() * (max - min) + min); 
      }
      
      /**
       * Is called from the clickActions method after the submit button for
       * resizing is clicked. Will get the user input for how many sqaures they want
       * between 1-100 and will make sure it works only go into the 
       * makeBoard function if its valid 
       * 
       * @param {*} event 
       * @returns 
       */
      function getResizeInput(event) {
        //This is basically yruing to prevent the form from to submit to a server
        event.preventDefault(); 
        //Will clear the error message
        document.getElementById('input-error').textContent = '';
        //Parses the int to make sure it is a number 
        const numOfSquares = parseInt(document.getElementById('squares').value);
        
        //Will check for the numOfSquares if they are valid or not 
        if (numOfSquares < 1 || numOfSquares > 100) {
          document.getElementById('input-error').textContent = 'Please pick a number betwen 1 and 100';
          return; 
          //Will break out of this function if there is no changes made 
        }
      
        //Will hide the modal again
        document.getElementById('modalContainer').style.display = 'none';
        //Will clear the input box when the user uses it next time
        document.getElementById('squares').value = ''; 
        //This will remove all the pervious divs which were created in the drawing area
        document.querySelectorAll('.item').forEach(e => e.remove()); 
        
        makeBoard(numOfSquares);
        return;
      }

      /**
       * This will take the action when the escape key is pressed
       * Notice whill only work then modal is opened 
       * @param {*} event 
       * @returns 
       */
      function keyEvent(event) {
        if (event.code == 'Escape') {
          document.getElementById('modalContainer').style.display = 'none';
        }  
        return;
      }
      