/* Riley Niven
   Final Project
   External JS File */


// DOM-locations
let root = document.getElementById('use_for_form');

// Constants
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const meals = ['Breakfast', 'Snack 1', 'Lunch', 'Snack 2', 'Dinner'];

// Runtime
for (let i1 = 0; i1 < days.length; i1++) {
   for (let i2 = 0; i2 < meals.length; i2++) {
      var _nodeLabel = document.createElement('label');
      var _nodeInput = document.createElement('input');
      
      _nodeLabel.innerHTML = days[i1] + " " + meals[i2] + " ";
      _nodeLabel.style.color = "white";

      _nodeInput.style['background-color'] = "grey";

      root.appendChild(_nodeLabel);
      root.appendChild(document.createElement('br'));
      _nodeLabel.appendChild(_nodeInput);
   }

   root.innerHTML += "<br><br>";
}