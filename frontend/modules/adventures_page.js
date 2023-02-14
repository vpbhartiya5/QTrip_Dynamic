
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it

  let obj = new URLSearchParams(search);
  return obj.get('city');

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
  
    let cities = await fetch(config.backendEndpoint + `/adventures?city=${city}`);

    let data = await cities.json();

    return data;
  }
  catch{
    return null;
  }
}

async function addNewAdventures(event) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    let city = await getCityFromURL(window.location.search);

    const response = await fetch(config.backendEndpoint + `/adventures/new`, {
     
        // Adding method type
        method: "POST",
        
        // Adding body or contents to send
        body: JSON.stringify({
            city: `${city}`
        }),
        
        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
      })

  }
  catch{
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  document.getElementById('data').textContent = "";
  
  adventures.forEach( adventure => {

    let {id, category, image, name, costPerHead, duration} = adventure;

    let divElement = document.createElement('div');
    divElement.className = "col-6 col-lg-3 mb-4 position-relative";
    divElement.innerHTML = `
        <a href="detail/?adventure=${id}" id="${id}">
          <div class="category-banner">${category}</div>

          <div class="activity-card ">

            <img class="image-responsive" src=${image} alt="image" />     
            <div class="d-flex card-label">
              <p>${name}</p>
              <p><span>&#8377;</span>${costPerHead}</p>
            </div>
            <div class="d-flex card-label">
              <p>Duration</p>
              <p>${duration} Hours</p>
            </div>
            
          </div>
        </a> 
    `;

   document.getElementById('data').append(divElement); 
  });
  

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
 
  let filterByDurationArray = list.filter( adventure => {
    
    return ( adventure.duration>=low && adventure.duration<=high );
  });
  
 return filterByDurationArray;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
 let filterByCategoryArray = list.filter( adventure => {

    for(let category of categoryList){

      if(adventure.category === category){
        return true;
      }
    }

    //Alternatively,
    //categoryList.indexOf(adventure.category) > -1
  });

 return filterByCategoryArray;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  saveFiltersToLocalStorage(filters);
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  if(filters.duration !== "" && filters.category.length !== 0){
    let durationArr = filters.duration.split("-");
    let filteredByDurationList = filterByDuration(list, durationArr[0], durationArr[1]);
    return filterByCategory(filteredByDurationList, filters.category);
    
  }
  else if(filters.duration !== ""){
    let durationArr = filters.duration.split("-");
    return filterByDuration(list, durationArr[0], durationArr[1]);
    
  }
  else if(filters.category.length !== 0){
    return filterByCategory(list, filters.category);
   
  }
  
  // Place holder for functionality to work in the Stubs

  return list;  //if no filter selected
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters", JSON.stringify(filters))
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let filterSelected = JSON.parse(localStorage.getItem("filters"));

  // Place holder for functionality to work in the Stubs
  return filterSelected;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills

  document.getElementById("duration-select").value = filters.duration;

  let selectedCategoryFilter = document.getElementById("category-list");
  let {category: CategoryList} = filters;       //CategoryList is alias of category
  CategoryList.forEach( category => {
    
    selectedCategoryFilter.innerHTML += `
      <div class="pills" id=${category.toLowerCase()}-pill>
        <div class="category-filter">${category}
              <div class="close"> 
              <button id=${category.toLowerCase()}> x </button> 
              </div>
        </div>
      </div>
    `;

  });

}

function removeFilterPillsAndUpdateDOM(filters){

  document.getElementById('category-list').addEventListener('click', (e) => {

    let {category: CategoryList} = filters;

    filters.category = CategoryList.filter( category => category.toLowerCase() !== e.target.id);

    const selectedPill = document.getElementById(`${e.target.id}-pill`)
    selectedPill.remove();

    saveFiltersToLocalStorage(filters);

    //location.reload();
    
    const refAllCategory = document.querySelectorAll('.category-banner');
    refAllCategory.forEach( categoryRef => {
      
      if(categoryRef.textContent.toLowerCase() === e.target.id){
        categoryRef.parentElement.parentElement.remove();
      }
    });
  })
}


export {
  getCityFromURL,
  fetchAdventures,
  addNewAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
  removeFilterPillsAndUpdateDOM,
};





