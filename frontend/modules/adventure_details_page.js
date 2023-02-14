import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const obj = new URLSearchParams(search);
  return obj.get('adventure');


  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    let adventureDetail = await fetch(config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`);

      let details = await adventureDetail.json();
      
      return details;

  }catch{
    return null;
  }

  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM

  let {name, subtitle, images, content} = adventure;

  document.getElementById('adventure-name').textContent = `${name}`;
  document.getElementById('adventure-subtitle').textContent = `${subtitle}`;
  document.getElementById('adventure-content').textContent = `${content}`;

  images.forEach( img => {
    
    document.getElementById('photo-gallery').innerHTML += `
      <div>
        <img class="activity-card-image" src="${img}" alt="adventure image.."/>
      </div>
    `;

  });
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images

  document.getElementById('photo-gallery').innerHTML = `
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner" id="item-holder">
        
      
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
  </div>
  `;

  
  const carouselInner = document.getElementById("item-holder");

  images.forEach((src, index) => {
    let htmlInner = `
  <div class="carousel-item ${index === 0 ? "active" : ""}">   
  <img src="${src}" class="d-block activity-card-image" alt="...">
  </div>
 `;

    carouselInner.innerHTML += htmlInner;
  });

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  
  let soldOutId = document.getElementById('reservation-panel-sold-out');
  let reserveId = document.getElementById('reservation-panel-available');
  let costPerHeadId = document.getElementById('reservation-person-cost');

  if(adventure.available){
    soldOutId.style.display = "none";
    reserveId.style.display = "block";
    costPerHeadId.textContent = adventure.costPerHead;
  }
  else{
    soldOutId.style.display = "block";
    reserveId.style.display = "none";
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let total = adventure.costPerHead * persons;
  document.getElementById('reservation-cost').textContent = total; 
  
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let formId = document.getElementById('myForm');

   formId.addEventListener('submit', async(e) => {
      e.preventDefault();

      let name = formId.elements.name.value;
      let date = formId.elements.date.value;
      let person = formId.elements.person.value;

      try{
    
        const response = await fetch(config.backendEndpoint + `/reservations/new`, {
         
            // Adding method type
            method: "POST",
            
            // Adding body or contents to send
            body: JSON.stringify({
                name,
                date,
                person,
                adventure: `${adventure.id}`
            }),
            
            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

        const data = await response.json();

        if(data.success === true){
          alert("Success!");
          location.reload();
        }
        else{
          alert("Error");
        }
          
      }
      catch{
        alert("Failed!");
        return null;
     }
   })

}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't

  if(adventure.reserved){
    document.getElementById('reserved-banner').style.display = "block";
  }
  else{
    document.getElementById('reserved-banner').style.display = "none";
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
