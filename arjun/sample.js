
 var cardContainer = document.querySelector('.card-container2');
 var searchButton = document.querySelector('.search-button');
 
searchButton.addEventListener('click', function() {
      var movieName = $('.movie-input').val();
     
      if (movieName === '') {
        return;
      }
      
      //https://api.themoviedb.org/3/search/movie/?api_key=f768a6c01320d0648fbd19db34d53112&language=en-US&page=1&include_adult=true&query=salt
      // for video.
      // https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=f768a6c01320d0648fbd19db34d53112&language=en-US
      $('.bd-example-modal-sm').modal('hide');
      
     var myHeaders = new Headers();
     myHeaders.append("api-key", "f768a6c01320d0648fbd19db34d53112");
     var requestOptions = {
         method: 'GET',   
     };
     fetch(`https://api.themoviedb.org/3/search/movie/?api_key=f768a6c01320d0648fbd19db34d53112&language=en-US&page=1&include_adult=true&query=${movieName}`,requestOptions)
         .then(response => response.json())
         .then(result => { 
             console.log(result);
             $('.card-container2').empty();
            for (let i = 0; i < result['results'].length; i++) {
 
             // bringing all the api search data
             var div = document.createElement('div');
             div.classList.add('card'); 
              var image = document.createElement('img');
             
              // if logo or poster available or not if not use local image
             var imageCode = result['results'][i].poster_path
             if (result['results'][i].poster_path === null) {
 
                 image.src = 'logo.PNG';
             
              }
              else{ image.src = `https:image.tmdb.org/t/p/w300/${imageCode}`;
              
             }
             
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
                 addBtn.setAttribute('img_src', 'logo.PNG')
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
          
          $('.movie-input').val = '';

          // function to watch movie trailler
          const watchButton = document.querySelectorAll('.watchButton');
          if(watchButton){
          watchButton.forEach((button)=>{
          button.addEventListener('click', (e) =>{
             const id = e.target.getAttribute('movie-id');
             const dataTarget = e.target.getAttribute('data-target');
             console.log(dataTarget);
             console.log(id)
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
  dots: true,
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




 

 
 