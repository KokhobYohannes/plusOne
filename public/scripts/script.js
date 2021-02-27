var sportsBtn = document.getElementById("sports");
var musicBtn = document.getElementById("music");

var groupBtn = document.getElementById("group");
var miscellaneousBtn = document.getElementById("miscellaneous");
var artsBtn = document.getElementById("arts");
var nonticketBtn = document.getElementById("nonticket");
var filmBtn = document.getElementById("film");
var allEventsBtn = document.getElementById("allevents");
var attractionsBtn = document.getElementById("attractions");

console.log("Connected");

let key = "8EBNM2k8I60gBeDL7Wo3OeCe3GPKdVB5";
let zipCode = 20001;

// axios
//   .get(
//     `https://app.ticketmaster.com/discovery/v2/events.json?&postalCode=${zipCode}&apikey=${key}`
//   )
//     .then((res) => {
//       console.log("All events in DC")
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

musicBtn.addEventListener("click", function (e) {
  e.preventDefault();
  axios
    .get(
      `  https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&postalCode=${zipCode}&apikey=jlzdij2J5YYeKFbVYCwvGHZdsCGH2cca`
    )
    .then((res) => {
        console.log("Music");
        console.log(res.data)
      console.log(res.data._embedded.events);
    })
    .catch((err) => {
      console.log(err);
    });
});

sportsBtn.addEventListener("click", function (e) {
  e.preventDefault();
  axios
    .get(
      `  https://app.ticketmaster.com/discovery/v2/events.json?classificationName=Sports&postalCode=${zipCode}&apikey=jlzdij2J5YYeKFbVYCwvGHZdsCGH2cca`
    )
    .then((res) => {
        console.log("Sports");
console.log(res.data);
      console.log(res.data._embedded.events);
    })
    .catch((err) => {
      console.log(err);
    });
});

groupBtn.addEventListener("click", function (e) {
  e.preventDefault();
  axios
    .get(
      `  https://app.ticketmaster.com/discovery/v2/events.json?classificationName=Group&postalCode=${zipCode}&apikey=jlzdij2J5YYeKFbVYCwvGHZdsCGH2cca`
    )
    .then((res) => {
      console.log("Group");
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  });


  nonticketBtn.addEventListener("click", function (e) {
    e.preventDefault();
  axios
    .get(
      `  https://app.ticketmaster.com/discovery/v2/events.json?classificationName=Nonticket&postalCode=${zipCode}&apikey=jlzdij2J5YYeKFbVYCwvGHZdsCGH2cca`
    )
    .then((res) => {
      console.log("Nonticket");
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  });

  miscellaneousBtn.addEventListener("click", function (e) {
    e.preventDefault();
  axios
    .get(
      `  https://app.ticketmaster.com/discovery/v2/events.json?classificationName=Miscellaneous&postalCode=${zipCode}&apikey=jlzdij2J5YYeKFbVYCwvGHZdsCGH2cca`
    )
    .then((res) => {
      console.log("Miscellaneous");
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  });

  artsBtn.addEventListener("click", function (e) {
    e.preventDefault();
  axios
    .get(
      `  https://app.ticketmaster.com/discovery/v2/events.json?classificationName=Arts & Theatre&postalCode=${zipCode}&apikey=jlzdij2J5YYeKFbVYCwvGHZdsCGH2cca`
    )
    .then((res) => {
      console.log("Arts & Theatre");
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  });

  filmBtn.addEventListener("click", function (e) {
    e.preventDefault();
  axios
    .get(
      `  https://app.ticketmaster.com/discovery/v2/events.json?classificationName=film&postalCode=${zipCode}&apikey=jlzdij2J5YYeKFbVYCwvGHZdsCGH2cca`
    )
    .then((res) => {
      console.log("Film");
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  });

  allEventsBtn.addEventListener("click", function (e) {
    e.preventDefault();
  axios
    .get(
      `  https://app.ticketmaster.com/discovery/v2/classifications.json?apikey=jlzdij2J5YYeKFbVYCwvGHZdsCGH2cca`
    )
      .then((res) => {
        console.log("All Classifications")
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  });

  attractionsBtn.addEventListener("click", function (e) {
    e.preventDefault();
  axios
    .get(
      `https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=jlzdij2J5YYeKFbVYCwvGHZdsCGH2cca`
    )
    .then((res) => {
      console.log("All Attractions");
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  });
