// Header animatie
// bron: Thomas Norden & ChatGPT
let lastScrollY = window.scrollY;
let header = document.querySelector('header')

window.addEventListener('scroll', () => {
  if (window.scrollY > lastScrollY) {
      // Scrolling down, hide the header
      header.classList.remove('header-visible')
      header.classList.add('header-hidden')
  }   
  else if (window.scrollY < lastScrollY) {
      // Scrolling up, show the header
      header.classList.remove('header-hidden')
      header.classList.add('header-visible')
  }
  lastScrollY = window.scrollY
})


// menu openen de MENU button 
// stap 1: zoek de menu-button op en sla die op in een variabele
var openButton = document.querySelector("header > button")

// stap 2: laat de menu-button luisteren naar kliks en voer dan een functie uit
openButton.onclick = openMenu

// stap 3: voeg in de functie een class toe aan de nav
function openMenu() {  
  // zoek de nav op
  var deNav = document.querySelector("nav")
  // voeg class toe aan nav
  deNav.classList.add("toonMenu")
}

// menu sluiten met de sluit button 
// stap 1 - zoek sluiten button op
var sluitButton = document.querySelector("nav button")

// stap 2 - laat die button luisteren naar kliks
sluitButton.onclick = sluitMenu

// stap 3 - in de functie verwijder de class van de nav
function sluitMenu() {
  var deNav = document.querySelector("nav")
  deNav.classList.remove("toonMenu")
}

// bonus: menu sluiten met escape 
window.onkeydown = handleKeydown;

function handleKeydown(event) {
  if (event.key == "Escape") {
    var deNav = document.querySelector("nav")
    deNav.classList.remove("toonMenu")
  }
  // if (event.key == "Escape") {
  //   let winkelen = document.querySelector (".lijst2")
  //   winkelen.classList.remove("toonMenu")
  // }
}

//beweging menu tweede lijst maken 
// let openButton2 = document.querySelector(".navLijst2")

// openButton2.onclick = openMenu2

// function openMenu2 () {
//   let winkelen = document.querySelector (".lijst2")
//   winkelen.classList.add("toonmenu")
// }

// Klik op de knop om navLijst2 te openen
// let lijst2Buttons = document.querySelectorAll(".lijst2"); // Meerdere knoppen mogelijk

// lijst2Buttons.forEach(button => {
//   button.onclick = function () {
//     // Zoek het bijbehorende submenu op (ul.navLijst2)
//     let submenu = this.nextElementSibling;

//     if (submenu && submenu.classList.contains("navLijst2")) {
//       submenu.classList.add("toonSubmenu"); // Voeg de class toe om het submenu te tonen
//     }
//   };
// });

// // Sluit submenu met een algemene sluit-knop of Escape
// let sluitKnoppen = document.querySelectorAll(".navLijst2 button");

// sluitKnoppen.forEach(button => {
//   button.onclick = function () {
//     let submenu = this.closest(".navLijst2");
//     submenu.classList.remove("toonSubmenu"); // Verwijder de class om het submenu te verbergen
//   };
// });

// // Sluit submenu met de Escape toets
// window.onkeydown = function (event) {
//   if (event.key === "Escape") {
//     let openSubmenus = document.querySelectorAll(".navLijst2.toonSubmenu");
//     openSubmenus.forEach(submenu => submenu.classList.remove("toonSubmenu"));
//   }
// };



//carousel #legochristmas 
//Bron: https://codepen.io/shooft/pen/ZEpXmrg gebruikt voor het maken van de bolletjes onder de plaatjes, maar ik heb er zelf nummertjes van gemaakt
function createCaroCarrousel(carrouselID) {
	let carrousel = document.querySelector("#"+carrouselID);
  let carrouselElementsContainer = carrousel.querySelector(":scope > ul");
	let carrouselElements = carrouselElementsContainer.querySelectorAll("li");
  let bolletjes = carrousel.querySelectorAll(":scope > nav a");
  
	// DE BOLLETJES 
  // de bolletjes activeren
  function iniBolletjes() {
    for (bolletje of bolletjes) {
			// elk bolletje laten luisteren naar kliks
      bolletje.addEventListener("click", function(e){
				// als er geklikt wordt
        
				// de default-actie (de link volgen) niet uitvoeren
        // anders verplaatst de hele carrousel naar boven in het scherm
				e.preventDefault();

				// het nieuwe element opzoeken
				let newElement = carrousel.querySelector(this.hash);
        
        // de linker offset van het nieuwe element bepalen 
        let newElementOffset = newElement.offsetLeft;

        // de carousel naar de berekende positie scrollen
        carrouselElementsContainer.scrollTo({
          left: newElementOffset
        });
        
        // nieuwe element current element maken
		    updateCurrentElement(newElement);
        
        // de bolletjes updaten
		    updateBolletjes(newElement);
      });
    }
	}

	// START POSITIE 
	// het eerste element en bolletje actief maaken
  function iniStartPosition() {
    // eerste element current maken
    carrouselElements[0].classList.add("current");
    // eerste bolletje current maken
		bolletjes[0].classList.add("current");
		// aan het begin van de container starten
    carrouselElementsContainer.scrollLeft = 0;
  }  

	//ALGEMENE FUNCTIES 
  ////////////////////////////
	// update current element //
	function updateCurrentElement(newElement) {
		// het huidige current element opzoeken
		let currentElement = carrousel.querySelector(":scope > ul > .current");
		// de class current verwijderen
		currentElement.classList.remove("current");

		// aan nieuwe element de class current toevoegen
		newElement.classList.add("current");
	}  
  //////////////////////
  // update bolletjes //
  function updateBolletjes(newElement){
		// het huidige current bolletje opzoeken
		let currentBolletje = carrousel.querySelector(":scope > nav .current");
		// de class current verwijderen
		currentBolletje.classList.remove("current");
		
		// het nieuwe bolletje opzoeken
    let newBolletje = carrousel.querySelector("a[href='#"+newElement.id+"']");
		// de class current toevoegen
		newBolletje.classList.add("current");
  }
	// de bolletjes activeren
  iniBolletjes();	
  // de carrousel bij het begin starten
  iniStartPosition();
}


// DE CARROUSEL CREËREN 
// nadat de pagina geladen is, de carrousels activeren
(function() {
  // hier de id gebruiken van de section in de html
  createCaroCarrousel("justBolletjes");
  //je kunt hier ook meerdere carrousellen activeren
})();
  