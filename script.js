function showWeather(currentData, forecastData) {
  var gallery = document.getElementById("gallary");

  if (!gallery) {
    console.error("The Element isn't found");
    return;
  }

  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  gallery.innerHTML = "";

  var currentDate = new Date(currentData.location.localtime);
  var currentMonthName = months[currentDate.getMonth()];
  var currentDayNumber = currentDate.getDate();

  gallery.innerHTML += `
    <div class="col-lg-4 p-0 ">
      <div class="card mt-100 ">
        <div class="d-flex justify-content-between bg-dark bg-opacity-50 card-header">
          <h5>${currentDate.toLocaleDateString("en-EG", {
            weekday: "long"
          })}</h5>
          <p class="fs-6 fw-medium mb-0">${currentMonthName} ${currentDayNumber}</p>
        </div>
        <div class="card-body">
          <h5 class="card-title text-white-50">${currentData.location.name}</h5>
          <h1 class="card-text">${
            currentData.current.temp_c
          }°C</h1> <!-- درجة الحرارة الحالية -->
          <img src="https:${
            currentData.current.condition.icon
          }" alt="Weather Icon">
          <p class="card-text clear">${currentData.current.condition.text}</p>
          <div class="icons gap-5 d-flex">
            <span>
              <img src="images/images4.png" alt="" style="width:20px !important;">
              <span>${currentData.current.humidity}%</span>
            </span>
            <span>
              <img src="images/images5.png" alt="" style="width:20px !important;">
              <span>${currentData.current.wind_kph}Km/h</span>
            </span>
            <span>
              <img src="images/images6.png" alt="" style="width:20px !important;">
              <span>${currentData.current.wind_dir}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  `;

  forecastData.forecast.forecastday.slice(1, 3).forEach((day) => {
    var forecastDate = new Date(day.date);
    var forecastMonthName = months[forecastDate.getMonth()];
    var forecastDayNumber = forecastDate.getDate();

    gallery.innerHTML += `
        <div class="col-lg-4 m-0 rounded-0 p-0 ">
          <div class="card mt-100 text-center">
            <div class="d-flex justify-content-between bg-dark bg-opacity-50 card-header text-center">
              <div class="text-center m-auto">
                <h5>${forecastDate.toLocaleDateString("en-EG", {
                  weekday: "long"
                })}</h5></div>
              </div>
             
            <div class="card-body column-gap-3 d-grid  bg-black bg-opacity-75 ">
            <img src="https:${
              day.day.condition.icon
            }" alt="Weather Icon" class="m-auto w-img">
             <div>
             <h5 class="card-text text-white fw-bold">${
               day.day.maxtemp_c
             }°C</h5> 
               <h6 class="card-text text-white">${day.day.mintemp_c}°C</h6> 
             </div>
              <p class="card-text clear">${day.day.condition.text}</p>
              </div> 
            </div>
          </div>
        </div>

      `;
  });
}

function getApi(city = "Cairo") {
  var apiKey = "9df125026cae4918abd61747241212";
  var currentUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&lang=en`;
  var forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&lang=en`;

  Promise.all([
    fetch(currentUrl).then((res) => {
      if (!res.ok) throw new Error("City not found");
      return res.json();
    }),
    fetch(forecastUrl).then((res) => {
      if (!res.ok) throw new Error("City not found");
      return res.json();
    })
  ])
    .then(([currentData, forecastData]) => {
      console.log("Current Data:", currentData);
      console.log("Forecast Data:", forecastData);
      showWeather(currentData, forecastData);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

document.getElementById("search").addEventListener("input", () => {
  var city = document.getElementById("search").value.trim();
  if (city.length > 2) {
    getApi(city);
  }
});
getApi();
