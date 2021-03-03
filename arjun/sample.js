//checking connection.
console.log('connected');
 var cardContainer = document.querySelector('.card-container2');
 var searchButton = document.querySelector('.search-button');
 // adding eventlistener to search button
searchButton.addEventListener('click', function() {
      var movieName = $('.movie-input').val();
     // if value is null then return
      if (movieName === '') {
        return;
      }
      $('.bd-example-modal-sm').modal('hide');
      // method for fetch
     var myHeaders = new Headers();
     myHeaders.append("api-key", "f768a6c01320d0648fbd19db34d53112");
     var requestOptions = {
         method: 'GET',   
     };
     fetch(`https://api.themoviedb.org/3/search/movie/?api_key=f768a6c01320d0648fbd19db34d53112&language=en-US&page=1&include_adult=true&query=${movieName}`,requestOptions)
         .then(response => response.json())
         .then(result => { 
             // console.log(result);
             $('.card-container2').empty();
            for (let i = 0; i < result['results'].length; i++) {
             // bringing all the api search data
             var div = document.createElement('div');
             div.classList.add('card'); 
              var image = document.createElement('img');
              // if logo or poster available or not if not use local image
             var imageCode = result['results'][i].poster_path
             if (result['results'][i].poster_path === null) {
                 image.src = 'plusonelogo.png';
              }
              else{ image.src = `https:image.tmdb.org/t/p/w300/${imageCode}`; }
              image.classList.add('card-top-img')
              image.style.height = '300px';
              image.style.width = '300px'
              div.append(image);
              var cardBody = document.createElement('div')
              cardBody.classList.add('card-body');
              var h5 = document.createElement('h5');
              h5.classList.add('card-title');
              var movie_name = result['results'][i].original_title;
              h5.textContent = result['results'][i].original_title;
              cardBody.append(h5);
                 div.append(cardBody);
              var addBtn = document.createElement('button');
              addBtn.classList.add('btn')
              addBtn.classList.add('btn-primary')
              addBtn.classList.add('addButton');
              addBtn.textContent = 'add';
              var watchBtn = document.createElement('button');
               var watchId = result['results'][i].id;
               // setting attribute if poster available or not
                if (result['results'][i].poster_path === null) {
                 addBtn.setAttribute('img_src', 'plusonelogo.png')
                }
                else{ addBtn.setAttribute('img_src', `https:image.tmdb.org/t/p/w300/${imageCode}`)};
                addBtn.setAttribute('movie_name', movie_name );
                addBtn.setAttribute('movie_id', watchId );
              watchBtn.setAttribute('movie-id', watchId)
              watchBtn.classList.add('watchButton')
              watchBtn.classList.add('btn');
              watchBtn.classList.add('btn-primary')
              watchBtn.setAttribute('data-target', '#mymodal')
              watchBtn.textContent ='watch';
             var description = result['results'][i].overview;
              addBtn.setAttribute('description', `${description}`)
              cardBody.append(addBtn, watchBtn)
 
             div.style.width = '200px'
            
              cardContainer.appendChild(div);
                
         }  
         // refreshing slick
         $(".card-container2").slick("refresh"); 
          // to prive the slider function to the film row.
          // function to watch movie trailler
          const watchButton = document.querySelectorAll('.watchButton');
          if(watchButton){
          watchButton.forEach((button)=>{
          button.addEventListener('click', (e) =>{
             const id = e.target.getAttribute('movie-id');
             //const dataTarget = e.target.getAttribute('data-target');
             //console.log(dataTarget);
             //console.log(id)
             var myHeaders = new Headers();
             myHeaders.append("api-key", "f768a6c01320d0648fbd19db34d53112");
             var requestOptions = {
                 method: 'GET',
                 
             };
             fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=f768a6c01320d0648fbd19db34d53112&language=en-US`,requestOptions)
                 .then(response => response.json())
                 .then(result => { 
                     console.log(result);
                      watchBtn.setAttribute('data-toggle', 'modal');
                     var link = result['results'][0].key;
                     var embed = `https://www.youtube.com/embed/${link}`
                     document.querySelector('.player').src= embed;
                     $('#mymodal').modal('show');
                     $('.close-button').on('click', function () {
                         $('#mymodal').modal('hide');
                     });
                  })
          })
     })
  }
  // watchbutton finish here

  // add to database 
    const addButton = document.querySelectorAll('.addButton');
    if(addButton){
    addButton.forEach((button)=>{
        button.addEventListener('click', (e) =>{
            console.log(e.target.parentNode);
            // making one movie object on the basis of api data.
            const movie = {
                movie_name : e.target.getAttribute('movie_name'),
                description : e.target.getAttribute('description'),
                image_url : e.target.getAttribute('img_src'),
                movie_id: e.target.getAttribute('movie_id'),
              }; 
              console.log(movie);
            // fetch(`/api/movies`, {
            //     method: 'PUT',
            //     headers: {
            //       Accept: 'application/json',
            //       'Content-Type': 'application/json',
            //     },
      
            //     // make sure to serialize the JSON body
            //     body: JSON.stringify(movie),
            //   }).then((response) => {
            //     // Check that the response is all good
            //     // Reload the page so the user can see the new quote
            //     if (response.ok) {
            //       console.log(`changed devour to: devoured`);
            //       location.reload('/');
            //     } else {
            //       alert('something went wrong!');
            //     }
            //   });
        }) 
    })
    }

  });  
});

// searchbutton finish here

 $('.card-container2').slick({
  dots: false,
  infinite: true,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 2,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    
  ]
  });

// ticketmaster api frontend.
// find music events.
var eventsContainer = document.querySelector('.card-container');
// let zipCode = 20000;
var musicBtn = document.getElementById("music");

// adding eventlistener
  musicBtn.addEventListener("click", function (e) {
  e.preventDefault();
  $('.music-searchmodal').modal('show');
  $('.music-search').on('click', function (e) {
    e.preventDefault();
    var zipCode = $('.music-zip').val();
    if (zipCode == '') {
      return
    }
    $('.music-searchmodal').modal('hide');
    axios.get(
      `  https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&postalCode=${zipCode}&apikey=jlzdij2J5YYeKFbVYCwvGHZdsCGH2cca`
    )
    .then((res) => {
       console.log("Music");
      //console.log(res)
      //console.log(res.data._embedded);
      //console.log(res.data._embedded);
      $('.card-container').empty();
      if (res.data._embedded == undefined) {
        // = 'there no events right now.'
        document.querySelector('.err-message').textContent = 'there are no events right now.'
        $('#errmodal').modal('show');
        return ;
      }

      for (let i = 0; i < res.data._embedded.events.length; i++) {
        console.log(res.data._embedded.events[i]);
        console.log(res.data._embedded.events[i].name);
        var card = document.createElement('div')
        card.classList.add('card');
        var h5 = document.createElement('h5');
        var name = res.data._embedded.events[i].name;
        h5.textContent = 'Name: '+ name;
        var cardBody = document.createElement('div')
        cardBody.classList.add('card-body');
        var image = document.createElement('img');
        image.style.width = '300px';
        image.style.height = '300px';
        var src = res.data._embedded.events[i].images[0].url;
        image.src = res.data._embedded.events[i].images[0].url;
        cardFooter = document.createElement('div')
        cardFooter.classList.add('card-footer');
        var venue = res.data._embedded.events[i]._embedded.venues[0].name;
        var h6 = document.createElement('h6');
        var address = res.data._embedded.events[i]._embedded.venues[0].address.line1;
        h6.textContent = 'Venue: '+ venue + '/ ' + address;
        card.append(h6);
        cardBody.append(image);
        card.append(cardBody)
        cardFooter.append(h6);
        var date = "date: " + res.data._embedded.events[i].dates.start.localDate;
        let addButton = document.createElement('button');
        addButton.classList.add('btn')
        addButton.classList.add('btn-primary');
        addButton.classList.add('add-button')
        addButton.textContent = 'add'; 
        cardFooter.append(date);
        var ticketLink = res.data._embedded.events[i]._embedded.venues[0].url
        var ticketButton = document.createElement('button');
        ticketButton.classList.add('btn');
        ticketButton.classList.add('btn-primary');
        ticketButton.classList.add('ticket-button');
        ticketButton.textContent = 'ticket';
        ticketButton.setAttribute('href', ticketLink )
        var a = document.createElement('a')
        a.setAttribute('href', ticketLink);
        a.setAttribute('target', 'blank')
        a.append(ticketButton);
        cardFooter.append(addButton);
        cardFooter.append(a);
        card.append(cardFooter);
        // appending file to dom
        eventsContainer.append(card);
        // setting up dataAttribute for add button for backend
        addButton.setAttribute('event_date', date);
        addButton.setAttribute('event_name', name);
        addButton.setAttribute('event_venue',venue );
        addButton.setAttribute('image_src', src );
        addButton.setAttribute('ticket_url', ticketLink );
        // refreshing slick   
        
      }
      // refresh to the slider
      $(".card-container").slick("refresh");
      const addbutton = document.querySelectorAll('.add-button');
      if(addbutton){
          addbutton.forEach((button)=>{
              button.addEventListener('click', (e) =>{
                  // console.log(e.target.parentNode);
                  // making one event object on the basis of api data.
                  const event = {
                      event_date :e.target.getAttribute('event_date'),
                      event_name : e.target.getAttribute('event_name'),
                      venue : e.target.getAttribute('event_venue'),
                      image_url : e.target.getAttribute('image_src'),
                      ticket_url: e.target.getAttribute('ticket_url'),
                    }; 
                    console.log(event);
                  // fetch(`/user/api/events`, {
                  //     method: 'PUT',
                  //     headers: {
                  //       Accept: 'application/json',
                  //       'Content-Type': 'application/json',
                  //     },
            
                  //     // make sure to serialize the JSON body
                  //     body: JSON.stringify(event),
                  //   }).then((response) => {
                  //     // Check that the response is all good
                  //     // Reload the page so the user can see the new quote
                  //     if (response.ok) {
                  //       console.log(`changed devour to: devoured`);
                  //       
                  //     } else {
                  //       alert('something went wrong!');
                  //     }
                  //   });
              }) 
          })
      }
      $('.card-container').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
          
        ]
      });
      $(".card-container").slick("refresh");
      
    })
    
    .catch((err) => {
      console.log(err);
    });
  });


    
});

// Arts and theatre events.
  var artsBtn = document.getElementById("arts");
  var container3 = document.querySelector('.card-container3');
  artsBtn.addEventListener("click", function (e) {
  e.preventDefault();
  e.preventDefault();
  $('.arts-searchmodal').modal('show');
  $('.arts-search').on('click', function (e) {
      e.preventDefault();
      var zipCode = $('.arts-zip').val();
     if (zipCode == '') {
      return
      }
      $('.arts-searchmodal').modal('hide');
      axios
      .get(
      `  https://app.ticketmaster.com/discovery/v2/events.json?classificationName=Arts & Theatre&postalCode=${zipCode}&apikey=jlzdij2J5YYeKFbVYCwvGHZdsCGH2cca`
      )
      .then((res) => {
      console.log("Arts & Theatre");
      // console.log(res);
      if (res.data._embedded == undefined) {
        // = 'there no events right now.'
        document.querySelector('.err-message').textContent = 'there are no events right now.'
        $('#errmodal').modal('show');
        return;
      }
      // emptying the container
      $('.card-container3').empty();
      for (let i = 0; i < res.data._embedded.events.length; i++) {
        //console.log(res.data._embedded.events[i]);
       // console.log(res.data._embedded.events[i].name);
        var card = document.createElement('div')
        card.classList.add('card');
        var h5 = document.createElement('h5');
        var name = res.data._embedded.events[i].name;
        h5.textContent = 'Name: '+ name;
        card.append(h5)
        var cardBody = document.createElement('div')
        cardBody.classList.add('card-body');
        var image = document.createElement('img');
        image.style.width = '300px';
        image.style.height = '300px';
        var src = res.data._embedded.events[i].images[0].url;
        image.src = res.data._embedded.events[i].images[0].url;
        cardFooter = document.createElement('div')
        cardFooter.classList.add('card-footer');
        var venue = res.data._embedded.events[i]._embedded.venues[0].name;
        var h6 = document.createElement('h6');
        var address = res.data._embedded.events[i]._embedded.venues[0].address.line1;
        h6.textContent = 'Venue: '+ venue + '/ ' + address;
        card.append(h6);
        cardBody.append(image);
        card.append(cardBody)
        cardFooter.append(h6);
        var date = "date: " + res.data._embedded.events[i].dates.start.localDate;
        let addButton = document.createElement('button');
        addButton.classList.add('btn')
        addButton.classList.add('btn-primary');
        addButton.classList.add('add-button')
        addButton.textContent = 'add'; 
        cardFooter.append(date);
        var ticketLink = res.data._embedded.events[i]._embedded.venues[0].url
        var ticketButton = document.createElement('button');
        ticketButton.classList.add('btn');
        ticketButton.classList.add('btn-primary');
        ticketButton.classList.add('ticket-button');
        ticketButton.textContent = 'ticket';
        ticketButton.setAttribute('href', ticketLink )
        var a = document.createElement('a')
        a.setAttribute('href', ticketLink);
        a.setAttribute('target', 'blank')
        a.append(ticketButton);
        cardFooter.append(addButton);
        cardFooter.append(a);
        card.append(cardFooter);
        // appending file to dom
        container3.append(card);
        // setting up dataAttribute for add button for backend
        addButton.setAttribute('event_date', date);
        addButton.setAttribute('event_name', name);
        addButton.setAttribute('event_venue',venue );
        addButton.setAttribute('image_src', src );
        addButton.setAttribute('ticket_url', ticketLink );

        // 
      };
       //$(".card-container3").slick("refresh"); 
      $('.card-container3').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
          
        ]
      });
      $('.card-container3').slick('refresh');
  
      // providing the data for backend
      const addbutton = document.querySelectorAll('.add-button');
      if(addbutton){
          addbutton.forEach((button)=>{
              button.addEventListener('click', (e) =>{
                  // console.log(e.target.parentNode);
                  // making one event object on the basis of api data.
                  const event = {
                      event_date :e.target.getAttribute('event_date'),
                      event_name : e.target.getAttribute('event_name'),
                      venue : e.target.getAttribute('event_venue'),
                      image_url : e.target.getAttribute('image_src'),
                      ticket_url: e.target.getAttribute('ticket_url'),
                    }; 
                    console.log(event);
                  // fetch(`/user/api/events`, {
                  //     method: 'PUT',
                  //     headers: {
                  //       Accept: 'application/json',
                  //       'Content-Type': 'application/json',
                  //     },
            
                  //     // make sure to serialize the JSON body
                  //     body: JSON.stringify(event),
                  //   }).then((response) => {
                  //     // Check that the response is all good
                  //     // Reload the page so the user can see the new quote
                  //     if (response.ok) {
                  //       console.log(`changed devour to: devoured`);
                  //       
                  //     } else {
                  //       alert('something went wrong!');
                  //     }
                  //   });
              }) 
          })
      }
      //$(".card-container3").slick("refresh"); 
    })
    .catch((err) => {
      console.log(err);
    });
    // $(".card-container3").slick("refresh");
  });
 
});

 
 