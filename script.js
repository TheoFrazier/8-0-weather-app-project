const mainFunction = document.querySelector("form");
function getWeather() {
  addEventListener("submit", (event) => {
    event.preventDefault();

    const location = event.target.search.value;
    const currentLocation = `https://wttr.in/${location}?format=j1`;
    fetch(currentLocation)
      .then((res) => res.json())
      .then((obj) => {

        const placeholder = document.querySelector(".placeholder");
        const today = document.querySelector("#today");
        const tomorrow = document.querySelector("#tomorrow");
        const nextday = document.querySelector("#nextday");
        const area = obj.nearest_area[0].areaName[0].value;
        const region = obj.nearest_area[0].region[0].value;
        const country = obj.nearest_area[0].country[0].value;
        const feels = obj.current_condition[0].FeelsLikeF;
        const arr = [
          { id: today, title: "Today" },
          { id: tomorrow, title: "Tomorrow" },
          { id: nextday, title: "The Next Day" },
        ];
        for (let i = 0; i < 3; i++) {
          const avgtempF = obj.weather[i].avgtempF;
          const mintempF = obj.weather[i].mintempF;
          const maxtempF = obj.weather[i].maxtempF;
          function iconDice(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
          }
          const displayIcon = iconDice(1, 4);
          arr[
            i
          ].id.innerHTML = `<h5>${arr[i].title}</h5><img src="img/${displayIcon}.svg" /><p>Average Temperature: ${avgtempF}°F</p><p>Max Temperature: ${maxtempF}°F</p><p>Minimum Temperature: ${mintempF}°F</p>`;
        }
        placeholder.innerHTML = `<h3>${area}</h3><p>Area: ${area}</p><p>Region: ${region}</p><p>Country: ${country}</p><p>Currently: Feels like ${feels}°F</p>`;
        let searchHistory = document.querySelector(".history");
        let mostRecentSearchDiv = document.createElement("div")
        mostRecentSearchDiv.classList.add("recent-search-item")

        // <div>
        // <div class = "recent-search-item">
        //<div>Info goes here</div>
        //</div>
        //</div>

        let recentInfoDiv = document.createElement("div")
        recentInfoDiv.innerHTML = `<p>${area}</p>-</p> ${feels}°F</p>`;

        recentInfoDiv.addEventListener("click", (event) => {
          getWeather(event.target.textcontent, false)
        })
        mostRecentSearchDiv.append(recentInfoDiv)
        searchHistory.append(mostRecentSearchDiv)
        /*getLinks();*/
      })
      .catch(console.log);
    event.target.reset();

  });
}


getWeather()



