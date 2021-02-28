console.log("connected");


$('.create-event').click(function(e){
  
    e.preventDefault();
    var eventName = $('.event-name').val();
    var eventDate = $('.date-time').val();
    var eventDetail = $('.descriprtion').val();
    var state = $('.state').val();
    var city =  $('.city').val();
    var zip = $('.zip').val();
        // var vals = "";
    // $.each($("input[name='today_check']:checked"), function(){  
    //     vals += "~"+$(this).val();  
    // });
    // if (vals){
    //     vals = vals.substring(1);
    // }else{
    //     alert('Please choose atleast one value.');
    // }

    var event = {
        eventName :eventName,
        eventDate : eventDate,
        eventDetail : eventDetail,
        // state : state,
        // city : city,
        // zipCode : zip,
        location : state + ' '+ city + ' '+ zip,
        //eventType : vals,
    }
    console.log(event);
    
    fetch(`/user/api/events`, {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
  
            // make sure to serialize the JSON body
            body: JSON.stringify(event),
          }).then((response) => {
            // Check that the response is all good
            // Reload the page so the user can see the new quote
            if (response.ok) {
              console.log(`event is created`);
             
            } else {
              alert('something went wrong!');
            }
          });

});
