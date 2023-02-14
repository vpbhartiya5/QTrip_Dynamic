import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them

  try{

    let response = await fetch(config.backendEndpoint + `/reservations/`); 

    let data = await response.json();

    return data;

  }catch{

    return null;
  }

  // Place holder for functionality to work in the Stubs
  return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  let tableEntries = document.getElementById('reservation-table');

  //Conditionally render the no-reservation-banner and reservation-table-parent

  if(reservations && reservations.length){
    document.getElementById('no-reservation-banner').style.display = "none";
    document.getElementById('reservation-table-parent').style.display = "block";

      
    reservations.forEach( reservation => {

      const bookingDate = new Date(reservation.time);
      const travelDate = new Date(reservation.date);

      const options = { 
        year: 'numeric',
        month: 'long', 
        day: 'numeric', 
        hour: 'numeric',
        minute: 'numeric', 
        second: 'numeric' 
      };
      
      tableEntries.innerHTML += `
        <tr>
          <td>${reservation.id}</td>
          <td>${reservation.name}</td>
          <td>${reservation.adventureName}</td>
          <td>${reservation.person}</td>
          <td>${travelDate.toLocaleDateString("en-IN")}</td>
          <td>${reservation.price}</td>
          <td>${bookingDate.toLocaleString("en-IN",options).replace(' at',',')}</td>
          <td id="${reservation.id}"><a href="../detail/?adventure=${reservation.adventure}"><button class="reservation-visit-button">Visit Adventure</button></a></td>
        </tr>
      `;
    });

  }
  else{
    document.getElementById('no-reservation-banner').style.display = "block";
    document.getElementById('reservation-table-parent').style.display = "none";
  }

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
