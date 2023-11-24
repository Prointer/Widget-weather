
fetch("/city.list.min.json")
  .then((response) => response.json())
  .then((data) => {
    //Функция поиска по названию города
    console.log(data);
    function findCityByName(cityName) {
      const foundCity = data.find(
        (city) => city["name"].toLowerCase() === cityName.toLowerCase()
      );
      return foundCity ? foundCity.id : null;
    }
    const searchInput = document.querySelector("#searchInput");
    const searchButton = document.querySelector("#searchButton");

    // Обработчик события search на нажатие мыши и клавиш Enter, Escape, space.
    function handleButtonClick() {
      const cityName = searchInput.value;
      const foundCity = findCityByName(cityName);
      // Используем ID найденного города в нашем fetch запросе
      if (foundCity !== null) {
        const apiUrl = `http://api.openweathermap.org/data/2.5/weather?id=${foundCity}&appid=3ebaea6efadd1e1c30ee3c82eeb6c7a7`;

        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            document.querySelector(".location-text").textContent = data.name;
            document.querySelector(".temperature").innerHTML =
              Math.round(data.main.temp - 273) + "&deg;";
            document.querySelector(".status").textContent =
              data.weather[0]["main"];
            document.querySelector(".wind-text").textContent =
              Math.round(data.wind.speed) + " km/h";
            document.querySelector(".humidity-text").textContent =
              data.main.humidity + " %";
            document.querySelector(".rain-text").textContent =
              data.main.pressure + " Pa";
            document.querySelector(
              ".main-img"
            ).innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0]["icon"]}@2x.png">`;
            // document.querySelector
          })
          .catch((error) => {
            console.error("Ошибка при получении данных о погоде", error);
          });
      } else {
        console.error("Город не найден");
        
      }
    }

    searchButton.addEventListener("click", handleButtonClick);
    searchButton.addEventListener("click", ShowBlock);
    searchInput.addEventListener("keydown", function (event) {
      if (event.code === "Enter") {
        handleButtonClick();
        ShowBlock();
      }
      if (event.code === "Space") {
        handleButtonClick();
        ShowBlock();
      }
    });

    // Функция для показывания блока поиска на экране при нажатии на клавишу поиска
    function ShowBlock() {
      const blockHidden = document.getElementById("widget-1");
      blockHidden.style.display = "block";
    }

    function getDateTime() {
      let now = new Date();
      let hour = now.getHours();
      let minute = now.getMinutes();
      if (hour.toString().length == 1) {
        hour = "0" + hour;
      }
      if (minute.toString().length == 1) {
        minute = "0" + minute;
      }
      const dateTime = hour + ":" + minute;
      return dateTime;
    }
    setInterval(function () {
      currentTime = getDateTime();
      document.querySelector(".time").textContent = currentTime;
    }, 1000);
  });
