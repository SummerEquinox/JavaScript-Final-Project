//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
/* Riley Niven
   Final Project
   External JS File */
//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------


// DOM-locations
let root = document.getElementById('use_for_form'); // Root of the form to use for planner information.


// Constants
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']; // Week-days to use.
const meals = ['Breakfast', 'Snack 1', 'Lunch', 'Snack 2', 'Dinner']; // Meals for each week day.

const regex_validator_email =  /^\S+@\S+\.\S+$/; // RegEx for valid e-mail strings.


// Functions
function create_print_and_download_buttons_functionality(window) {
   // Inputs: window object
   // Description: Add print and download buttons on a meal plan window.

   let _download = window.document.getElementById('download-button');
   let _print = window.document.getElementById('print-button');

   _download.addEventListener("click", () => {
      // jsPDF library implementation, which I import in the HTML header.

      var __pdf = new jsPDF('p', 'pt', 'letter');
      __pdf.canvas.height = 72 * 11;
      __pdf.canvas.width = 72 * 8.5;
      __pdf.fromHTML(window.document.body);
      __pdf.save('test.pdf');
   })

   _print.addEventListener("click", () => {window.print();});
}

function place_information_matrix(window) {
   // Inputs: window object
   // Description: Use this function to populate a window with meal plan information.

   window.document.write('<br/><br/>');

   for (let i1 = 0; i1 < days.length; i1++) {
      window.document.write('<p><b>' + days[i1] + '</p></b><br/>');

      var _tempString = "";
      for (let i2 = 0; i2 < meals.length; i2++) {
         _tempString += (meals[i2] + ': ');

         _hold = document.getElementById(days[i1] + '-' + meals[i2]).value;
         if (_hold === "") {
            _hold = "None"
         }

         _tempString += _hold;

         if (!(i2 === (meals.length-1))) {_tempString += ", ";}
         else {_tempString += ".";}
      }
      window.document.write('<p>' + _tempString + '</p><br/>');
   }
}

function build_planner_page() {
   // Inputs: None
   // Description: Use this function to build a default planner page.

   var planner_window = window.open('about:blank', 'plannerWindow', 'width=1200,height=1500');

   let _name = document.getElementById('g-name').value;
   let _wlGoal = document.getElementById('g-wl-goal').value;
   let _email = document.getElementById('email_box').value;

   if (_name === "") {_name = "Anonymous";} 
   if (_wlGoal === "") {_wlGoal = "1lb";}

   planner_window.document.write(
      '<!DOCTYPE html>' +
      '<html lang="en-US">' +
      '<p><button id="download-button">Download as PDF</button><button id="print-button">Print</button></p>' +
      '<h1>' + _name + '\'s Meal Plan</h1>' +
      '<p>email: ' + _email +'</p><br/>' +
      'This week\'s weight loss goal: ' + _wlGoal + '<br/>'
   );

   place_information_matrix(planner_window);
   planner_window.document.write('</html>');
   create_print_and_download_buttons_functionality(planner_window);
}


// Anonymous functions & event hooking pre-runtime
document.addEventListener('DOMContentLoaded', () => {
   var use = document.getElementById('email_box');

   use.addEventListener('input', () => {
      use.setCustomValidity("");
   });

   root.addEventListener('submit', e => {
      e.preventDefault();
      var _temp = document.getElementById('email_box');
   
      if (regex_validator_email.test(_temp.value)) {
         build_planner_page();
      } else {
         _temp.setCustomValidity("You must enter a valid e-mail address to continue.");
         _temp.reportValidity();
      }
   });
})


//-----------------------------------------------------------------------------------------
// Runtime -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
//-----------------------------------------------------------------------------------------

for (let i1 = 0; i1 < days.length; i1++) {
   for (let i2 = 0; i2 < meals.length; i2++) {
      var _nodeLabel = document.createElement('label');
      var _nodeInput = document.createElement('input');

      _nodeInput.id = (days[i1] + '-' + meals[i2]);
      
      _nodeLabel.innerHTML = days[i1] + " " + meals[i2] + " ";
      _nodeLabel.style.color = "white";

      _nodeInput.style['background-color'] = "grey";

      root.appendChild(_nodeLabel);
      root.appendChild(document.createElement('br'));
      _nodeLabel.appendChild(_nodeInput);
   }

   root.innerHTML += "<br><br>";
}