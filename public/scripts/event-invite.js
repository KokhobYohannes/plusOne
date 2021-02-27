

var events  =[];

 // Helper function to grab todos
 const getEvents = () => {
    fetch('/api/events', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success in getting events:', data);
        events = data;
        initializeRows();
      });
  };

  

// This function resets the todos displayed with new todos from the database
const initializeRows = () => {
    $("#table-results").html(null); 
    const rowsToAdd = [];
    for (let i = 0; i < events.length; i++) {
        $("#table-results").prepend(createNewRow(events[i]));
    }
  };

function createNewRow(rD){
    var outputString = ''; 
    outputString = `<td>${rD.eventName}</td><td>${rD.hostName}</td><td>${rD.address}</td><td>${rD.city}</td><td>${rD.eventDescription}</td><td>${rD.indoorEvent}</td><td>${rD.outdoorEvent}</td><td>${rD.virtualEvent}</td><td>${rD.dateTime}</td><td>${rD.numberofAttendees}</td><td>${getStatus(rD.status)}</td><td>${changeStatus(rD.id, 1)}</td><td>${changeStatus(rD.id, -1)}</td><td>${deleteEvent(rD.id)}</td>`;
   return  $("<tr>").html(outputString); 
}

function getStatus(statusNum){
    switch (parseInt(statusNum)){
        case 0:
            return "Pending";        
        case 1:
            return "Approved";       
        case -1:
            return "Denied";
        default:
            return "N/A";
    }
}
function changeStatus(id, statusNum){
    let currentUrl ="/api/events/update/" + id; 
    switch (parseInt(statusNum)){     
        case 1:  
        case -1:
            return `<a href="${currentUrl}/${statusNum}">${statusNum == 1 ? 'Approve' : 'Deny'}</a>`;       
        default:
            return location.hostname; 
    }
}

function deleteEvent(id)
{ 
    let currentUrl ="/api/events/delete/" + id; 
    return `<a href="${currentUrl}">Delete</a>`; 
}
getEvents();
