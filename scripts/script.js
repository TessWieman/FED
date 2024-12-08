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

// MENU OPENEN EN SLUITEN
let openButton = document.querySelector("header > button")
// let sluitButton = document.querySelector(".sluiten")
let deNav =  document.querySelector(".navHeader")

function openMenu () {
  deNav.classList.add("toonMenu")
}

// function sluitMenu () {
//   deNav.classList.remove("toonMenu")
// }

openButton.addEventListener('click', openMenu)
// sluitButton.addEventListener('click', sluitMenu)


// SUBMENU OPENEN EN SLUITEN
//bron: https://chatgpt.com/c/6752e90d-10b4-8004-872b-b24a43b9ee54
let lijstButtons = document.querySelectorAll(".lijst2") // Alle knoppen die submenu openen
let submenuItems = document.querySelectorAll(".navLijst2");// Alle submenu-elementen

lijstButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    // Zorg dat alle andere submenu's sluiten
    submenuItems.forEach((submenu, submenuIndex) => {
      if (submenuIndex !== index) {
        submenu.classList.remove("toonSubmenu")
      }
    })

    // Toggle het submenu dat bij de knop hoort
    submenuItems[index].classList.toggle("toonSubmenu")
  })
})

// Selecteer alle terugknoppen
let terugKnoppen = document.querySelectorAll(".terug")

// Voeg een eventlistener toe aan elke terugknoppen
terugKnoppen.forEach((knop) => {
  knop.addEventListener("click", () => {
    // Vind het dichtstbijzijnde submenu en verwijder de 'toonSubmenu'-klasse
    let submenu = knop.closest(".navLijst2")
    if (submenu) {
      submenu.classList.remove("toonSubmenu")
    }
  })
})

// Selecteer alle sluitknoppen
let sluitKnoppen = document.querySelectorAll(".sluiten")

// Voeg een eventlistener toe aan elke sluitknop
sluitKnoppen.forEach((knop) => {
  knop.addEventListener("click", () => {
    // Sluit submenu's
    let submenu = document.querySelector(".navLijst2.toonSubmenu")
    if (submenu) {
      submenu.classList.remove("toonSubmenu")
    }

    // Sluit hoofdmenu
    let hoofdmenu = document.querySelector(".navHeader.toonMenu")
    if (hoofdmenu) {
      hoofdmenu.classList.remove("toonMenu")
    }
  })
})



// MENU SLUITEN MET ESCAPE
// bron: https://codepen.io/TessWieman/pen/ByBoLNW
window.onkeydown = handleKeydown;

function handleKeydown(event) {
  if (event.key == "Escape") {
    deNav.classList.remove("toonMenu")
  }
  if (event.key == "Escape") {
    let winkelen = document.querySelector (".lijst2")
    winkelen.classList.remove("toonMenu")
  }
}


// count maken verlanglijst en winkelwagen
// let currentCount = 0 

// let countLike = document.querySelector(".empty") 
// let heartKnop = document.querySelector(".like")

// heartKnop.addEventListener('click', plusCountWinkel)

// function plusCountWinkel () {
//   if (currentCount <= countLike) {
//     currentCount + 1
//   }
// }

// heartKnop.addEventListener('click', plusCountWinkel)




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
  