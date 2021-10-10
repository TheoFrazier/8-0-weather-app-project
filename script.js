fetch("wttr.in/Detroit?format=j1");

document.querySelector("form")
    .addEventListener("submit", (evt) => {
        evt.preventDefault()
        const location = evt.target.search.value
        const currentLoc = `https://wttr.in/${location}?format=j1`
        fetch(currentLoc)
            .then(res => res.json())
            .then(obj => {
                const placeholder = document.querySelector(".placeholder")
                const today = document.querySelector("#today")
                const tomorrow = document.querySelector("#tomorrow")
                const nextday = document.querySelector("#nextday")
                const area = obj.nearest_area[0].areaName[0].value
                const region = obj.nearest_area[0].region[0].value
                const country = obj.nearest_area[0].country[0].value
                const feels = obj.current_condition[0].FeelsLikeF

                const arr = [{ id: today, title: "Today" }, { id: tomorrow, title: "Tomorrow" }, { id: nextday, title: "The Next Day" }]

                for (let i = 0; i < 3; i++) {
                    console.log(i)
                    const avgtempF = obj.weather[i].avgtempF;
                    const mintempF = obj.weather[i].mintempF
                    const maxtempF = obj.weather[i].maxtempF
                    arr[i].id.innerHTML = `<h5>${arr[i].title}</h5><p>Average Temperature: ${avgtempF}°F</p><p>Max Temperature: ${maxtempF}°F</p><p>Minimum Temperature: ${mintempF}°F</p>`
                }

                placeholder.innerHTML = `<h3>${area}</h3><p>Area: ${area}</p><p>Region: ${region}</p><p>Country: ${country}</p><p>Currently: Feels like ${feels}°F</p>`

                const history = document.querySelector(".history")
                const p = document.querySelector(".history p")
                p.classlist.add("hidden")
                history.innerHTML += `<a href=${currentLoc} class="block>${area} - ${feels}°F</a>`
                getLinks()
            })
            .catch(console.log)
        evt.target.reset()
    });

const getLinks = () => {
    const links = document.querySelectorAll(".history a")
    links.forEach(link => {
        link
            .addEventListener("click", (evt) => {
                evt.preventDefault()
                fetch(evt.target.href)
                    .then(res => res.json())
                    .then(obj => {
                        const placeholder = document.querySelector(".placeholder")
                        const today = document.querySelector("#today")
                        const tomorrow = document.querySelector("#tomorrow")
                        const nextday = document.querySelector("#nextday")
                        const area = obj.nearest_area[0].areaName[0].value
                        const region = obj.nearest_area[0].region[0].value
                        const country = obj.nearest_area[0].country[0].value
                        const feels = obj.current_condition[0].FeelsLikeF

                        const arr = [{ id: today, title: "Today" }, { id: tomorrow, title: "Tomorrow" }, { id: nextday, title: "The Next Day" }]

                        for (let i = 0; i < 3; i++) {
                            console.log(i)
                            const avgtempF = obj.weather[i].avgtempF;
                            const mintempF = obj.weather[i].mintempF
                            const maxtempF = obj.weather[i].maxtempF
                            arr[i].id.innerHTML = `<h5>${arr[i].title}</h5><p>Average Temperature: ${avgtempF}°F</p><p>Max Temperature: ${maxtempF}°F</p><p>Minimum Temperature: ${mintempF}°F</p>`
                        }
                        placeholder.innerHTML = `<h3>${area}</h3><p>Area: ${area}</p><p>Region: ${region}</p><p>Country: ${country}</p><p>Currently: Feels like ${feels}°F</p>`
                    })
                    .catch(console.log)
            })
    })
}
