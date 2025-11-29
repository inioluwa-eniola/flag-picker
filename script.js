import { countries } from "/data.js"

const page = document.body.id;

/* ---------------------------
PAGE 1 - index.html ("home")
-----------------------------*/

if (page === "home") {
  let chosenColorsArray = [];
  let chosenContinentsArray = [];


  // DOM elements
  const colorContainer = document.getElementById("color-container");
  const continentContainer = document.getElementById("continent-container");
  const generateBtn = document.getElementById("generate-btn");
  const flagImage = document.getElementById("flag-image");

  
  // LIMIT THE CHECKBOXES IN EACH CONTAINER 
  function limitCheckboxesToThree(container, limit, outputArray) {  
    const checkboxes = container.querySelectorAll("input[type='checkbox']");
  
    function update() {
      outputArray.length = 0;

      container.querySelectorAll("input[type='checkbox']:checked").forEach(checkbox => outputArray.push(checkbox.id))
 
      if (outputArray.length >= limit) {
        checkboxes.forEach(checkbox => {
          if (!checkbox.checked) 
            {checkbox.disabled = true};
        });
      } 
      
      else {
        // Enable all inside THIS container only
        checkboxes.forEach(checkbox => checkbox.disabled = false);
      }
  
    }
  
    checkboxes.forEach(checkbox => checkbox.addEventListener("change", update));
  }
  
  
  limitCheckboxesToThree(colorContainer, 5, chosenColorsArray);
  limitCheckboxesToThree(continentContainer, 3, chosenContinentsArray);
  
  // SAVE THE USER'S SELECTIONS
  generateBtn.addEventListener("click", () => {
    localStorage.setItem("chosenColorsArray", JSON.stringify(chosenColorsArray));
    localStorage.setItem("chosenContinentsArray", JSON.stringify(chosenContinentsArray));
  });
  
};


/*-----------------------------------
  PAGE 2 - flags-page.html ("flags")
-------------------------------------*/

if (page === "flags") {
  const displayedFlags = document.getElementById("displayed-flags");
  const chosenColorsArray = JSON.parse(localStorage.getItem("chosenColorsArray")) || [];
  const chosenContinentsArray = JSON.parse(localStorage.getItem("chosenContinentsArray")) || [];


  function renderCountries(){
    
    let countriesOfContinentsArray = []
    let renderedCountriesArray = []
  
  
      // GET COUNTRIES IN THE CHOSEN CONTINENTS
      function countriesInChosenContinents (array) {
          for (let i=0; i < chosenContinentsArray.length; i++) {
              for (let j=0; j < countries.length; j++) {
                  if (countries[j].continent.toLowerCase() === chosenContinentsArray[i].toLowerCase()) {
                      array.push(countries[j]);
                  }
              }
          }
      }
  
      countriesInChosenContinents(countriesOfContinentsArray);
  
      // FILTER COUNTRIES BY CHOSEN COLORS 
      function continentsWithChosenColors(rawCountriesArray, cleansedCountriesArray) {
        for (let country of rawCountriesArray) {
          if (chosenColorsArray.every(color => country.flagColors.includes(color))) {
            cleansedCountriesArray.push(country);
          }
        }
      }
  
      continentsWithChosenColors(countriesOfContinentsArray, renderedCountriesArray);

    
      // RENDER THE FLAGS TO THE PAGE
      function renderFlags (){
        displayedFlags.innerHTML = ""; // CLEAR THE PREVIOUS FLAGS
        
        if (renderedCountriesArray.length === 0) {
          displayedFlags.innerHTML = `<p class="paragraph">NO COUNTRIES HAVE THOSE FLAG COLORS!</p>`;
          return;
        }
    
      
      renderedCountriesArray.forEach((country) => {
        displayedFlags.innerHTML +=  
        `<div class="flag-wrapper">
          <img class="flag-image" id="flag-image" src="${country.flagImage}" alt="${country.name}">

          <div class="flag-overlay" id="flag-overlay">
            <p class="flag-name">${country.name}</p>
          </div>

        </div>
        `;

      });
      flagImage.addEventListener ("mouseover", (event) => {

      })

      
    }
  
    renderFlags(); 
  };

  renderCountries();
}









