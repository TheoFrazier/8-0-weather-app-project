const mainFunction = document.querySelector("form");
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

      const history = document.querySelector(".history");
      const p = document.querySelector(".history p");
      p.classlist.add("hidden");
      history.innerHTML += `<a href=${currentLoc} class="block">${area} - ${feels}°F</a>`;
      /*getLinks();*/
    })
    .catch(console.log);
  event.target.reset();
  /*historyAside(links, area[0].value, FeelsLikeF);
  document.querySelector("aside").classList.add("asideHeight");
  document
    .querySelector(".history a:last-child")
    .addEventListner("click", eventHistory);*/
});

/*const getLinks = () => {
  const links = document.querySelectorAll(".history a");
  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      fetch(event.target.href)
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
            console.log(i);
            const avgtempF = obj.weather[i].avgtempF;
            const mintempF = obj.weather[i].mintempF;
            const maxtempF = obj.weather[i].maxtempF;
            function iconDice(min, max) {
              return Math.floor(Math.random() * (max - min + 1) + min);
            }

            const numbersRNDM = iconDice(1, 4);
            arr[
              i
            ].id.innerHTML = `<h5>${arr[i].title}</h5><img src="img/${numbersRNDM}.svg" /><p>Average Temperature: ${avgtempF}°F</p><p>Max Temperature: ${maxtempF}°F</p><p>Minimum Temperature: ${mintempF}°F</p>`;
          }
          placeholder.innerHTML = `<h3>${area}</h3><p>Area: ${area}</p><p>Region: ${region}</p><p>Country: ${country}</p><p>Currently: Feels like ${feels}°F</p>`;
          historyAside(links, area[0].value, FeelsLikeF);
          document.querySelector("aside").classList.add("asideHeight");
          document
            .querySelector(".history a:last-child")
            .addEventListner("click", eventHistory);
        })
        .catch(console.log);
    });
  });
};
const historyAside = (link, area, FeelsLikeF) => {
    document.querySelector(".history p").classList.add("hidden");
    const a = document.createElement("div");
    //add listener 
    addEventListener("submit", (event) => {
        event.preventDefault();
        //anchor tag - but don't set
        a.classList.add("listStyle");
        a.innerHTML = `${area} - ${FeelsLikeF}°F`;
        document.querySelector(".display h4").classList.remove("hidden");
        document.querySelector(".history").append(a);
    });
}

const eventHistory = (event) => {
  event.preventDefault();
  mainFunction(event.target.href);
};
*/