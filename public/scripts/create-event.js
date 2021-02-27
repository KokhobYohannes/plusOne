


// Function to actually insert an event
const insertEvent = (e) => {
 // e.preventDefault();
  const event = {
    eventName: document.getElementById('inputEventName').value.trim(),
    hostName: document.getElementById('inputHostName').value.trim(),
    address: document.getElementById('inputAddress').value.trim(),
    city: document.getElementById('inputCity').value.trim(),
    eventDescription: document.getElementById('inputEventDescription').value.trim(),
    indoorEvent: document.getElementById('gridCheck1').checked,
    outdoorEvent: document.getElementById('gridCheck2').checked,
    virtualEvent: document.getElementById('gridCheck3').checked,
    numberofAttendees: document.getElementById('exampleFormControlSelect1').value.trim(),
    dateTime: document.getElementById('inputDateTime').value.trim(),
    status: 0,   // status -1 , 0 , 1 denied, pending, approved 
  };
 
    fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    })
      .then((response) => {
        response.json(); 
        location.href = "/createvent.html"; 
      });
      //.then(() => getEvents()); moved to another page 
  
};

const submitButton = document.getElementById('submitButton'); 
submitButton.addEventListener('click', function(e){
    insertEvent(e);    
});