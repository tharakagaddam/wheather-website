const input = document.querySelector(".input");
const btnSubmit = document.querySelector("button");
const errSpan = document.querySelector("span");
const cities = document.querySelector(".cities");

const apiKey = "edc228562ac0a8aa3116d41c0687cf56";

btnSubmit.addEventListener("click", findWheather);

function findWheather(event) {
    event.preventDefault();
    inputVal = input.value;
    input.value = "";
    errSpan.innerText = "";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;
    if (inputVal == "") {
    } else {
        fetch(url)
            .then(data => data.json())
            .then(val => {
                const { main, name, sys, weather } = val;
                // console.log(weather[0].icon);
                const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0].icon}.svg`;
                const li = document.createElement("li");
                li.classList.add("city");
                const markup = `
                    <h2 class='city-name' data-name=${name},${sys.country}>
                        <span>${name}</span>
                        <span>${sys.country}</span>
                    </h2>
                    <div class='city-temp'>
                        ${Math.round(main.temp)}
                    </div>
                    <figure>
                        <img class='city-icon' src='${icon}'>
                        <figurecaption>
                            ${weather[0].description}
                        </figurecaption>
                    </figure>

                `;
                li.innerHTML = markup;
                cities.appendChild(li);
            })

            .catch(() => errSpan.innerText = "please Enter a valid City.")
    }

}