$(document).ready(function () {
    const eventsList = document.getElementById("events-list");
    const eventsSearchInput = document.getElementById("events-search-input");
    const eventsSearchButton = document.getElementById("events-search-button");


    eventsSearchButton.addEventListener("click", function(event) {
        let keyword = encodeURIComponent(eventsSearchInput.value);
        $.ajax({
            type:"GET",
            url:`https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=8EBNM2k8I60gBeDL7Wo3OeCe3GPKdVB5&keyword=${keyword}`,
            async: true,
            dataType: "json",
            success: function(json) {
                        console.log(json);
                        eventsList.innerHTML = "";
                        for (let attraction of json._embedded.attractions) {
                            let li = document.createElement("li");
                            li.innerText = `${attraction.name}`;
                            eventsList.appendChild(li);
                        }
                    },
            error: function(xhr, status, err) {
                        // This time, we do not end up here!
                    }
        });
    })
});





function displayWeather(city) {

    //addToLocalStorage(city);
    var FIVE_DAY_URL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=`;
    var CURRENT_DAY_URL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=`;
    const API_KEY = "226fa871e602dfe5766fff6af9945fe1";

    // main current weather 
    $.get(CURRENT_DAY_URL + API_KEY, function (data, status) {
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        var wind_speed = data.wind.speed;
        var humidity = data.main.humidity;
        var name_city = data.name;
        var dt = data.dt;
        var curr_temp = data.main.temp;
        var icon = data.weather[0].icon;
        $("#main-icon").attr("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);
        $("#main-temp").html(curr_temp + " &#176;F");
        $("#main-wind-speed").text(wind_speed + " MPH");
        $("#main-city-name").text(name_city);
        $("#main-humidity").text(humidity + "%");
        $("#main-date").text(moment(dt, "X").format('L'));
    })

    $.get(FIVE_DAY_URL + API_KEY, function (data, status) {
            var count = 0;

            for (const d of data.list) {
                if (count !== 0 && (count + 1) % 8 === 0) { // get every 8th value  
                    var humidity = d.main.humidity;
                    var dt = d.dt;
                    var curr_temp = d.main.temp;
                    var icon = d.weather[0].icon;
                    $($(".daily-icon")[((count + 1) / 8) - 1]).attr("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);
                    $($(".daily-temp")[((count + 1) / 8) - 1]).html(curr_temp + " &#176;F");
                    $($(".daily-humidity")[((count + 1) / 8) - 1]).text(humidity + "%");
                    $($(".daily-date")[((count + 1) / 8) - 1]).text(moment(dt, "X").format('L'));
                }
                count++;
            }
    })
    .fail(function () {
        alert("error");
    })
    .always(function () {
        //alert( "finished" );
    });
}

$(document).ready(function () {
    const API_KEY = "AIzaSyDA8Vir0kbeFAHcIPLq6B_VvfMkozpnVtM";

    $("#address").on("change", function () {
        let full_address = $(this).val();
        console.log(full_address);
    });

    $("#button").on("click", function () {

        addressVal = $("#address").val();

        if (addressVal === "") {
            M.toast({
                html: 'Input an address!'
            })
        }

        var address = $("#address").val();
        var city = $("#city").val();
        var state = $("#state").val();
        var zip = $("#zip").val();

        clearPrev();
        renderResults();


        //Allows us to clear previous search results and find a new list of addresses when input 
        function clearPrev() {
            $("#testView").empty();
            $("#areaInfo").empty();
        }

        function renderResults() {
            //ajax request for the geocode(longitude and latitude) to be input to the google maps and zomato
            var geocode = `https://maps.googleapis.com/maps/api/geocode/json?address=${address},${city},${state},${zip}&key=${API_KEY}`;

            $.ajax({
                    method: "GET",
                    url: geocode,
                })
                .then(function (response) {

                    let lat = response.results[0].geometry.location.lat
                    let lon = response.results[0].geometry.location.lng

                    //google maps query and pushed to dom with marker
                    function initMap() {
                        var options = {
                            zoom: 15,
                            center: {
                                lat: lat,
                                lng: lon
                            }
                        }
                        var map = new google.maps.Map(document.getElementById('map'), options);
                        var marker = new google.maps.Marker({
                            position: {
                                lat: lat,
                                lng: lon
                            },
                            map: map
                        });
                    }

                    // Open Weather 
                    

                    function _log(str) {
                        console.log(str);
                    }

                    function getUVData(url) {

                        $.get(url, (data, status) => {
                            var uv = data.value;
                            $("#main-uv-index").text(uv);
                        });
                    }

                    function addToLocalStorage(city) {
                        var cities = localStorage.getItem("cities");
                        if (cities !== undefined && cities != null) {

                            var cities_arr = cities.split(",").map(x => x.toLowerCase());
                            if (cities_arr.indexOf(city.toLowerCase()) == -1) {
                                //if does not exist... 
                                localStorage.setItem("cities", cities + "," + city);

                                $("#search-history").html("");
                                $("#search-history").append(`<li>${city}</li>`);

                                for (const c of cities_arr) {
                                    $("#search-history").append(`<li>${c}</li>`);
                                }
                            }
                        } else {
                            /// appending the cities
                            localStorage.setItem("cities", city);
                            $("#search-history").append(`<li>${city}</li>`);
                        }
                    }

                    function populateExistings() {
                        var cities = localStorage.getItem("cities");
                        if (cities !== undefined && cities != null) {
                            /// then there are  existing cities 
                            // don't repeat 
                            var cities_arr = cities.split(",").map(x => x.toLowerCase());
                            $("#search-history").html("");

                            for (const c of cities_arr) {
                                $("#search-history").append(`<li class='search-results'><h5 onclick="$('#city-search').val('${c}')">${c}</h5></li>`);
                            }

                        }
                    }

                    updateWeather("Seattle");

                    populateExistings();
                });
        }
    });
});
