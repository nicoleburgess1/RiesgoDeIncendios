key = "342739d3446e3198feedef29fefbbdec";

let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let rainRef = document.getElementById("rain");
console.log(rainRef);

let getWeather = () => {
  let cityValue = "Benjamin Aceval";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric&lang=es`;
    let rainfall = rainRef.value;

    fetch(url)
      .then((resp) => resp.json())
      //If city name is valid
      .then((data) => {
        console.log(data);
        console.log(data.name);
        console.log(data.main.humidity);
        console.log(data.main.temp);
        console.log(data.wind.speed);
        let humidity = data.main.humidity/100; //percent
        let currTemp = data.main.temp; //celcius
        let windSpeed = data.wind.speed; //kmh

        console.log(rainfall);
        if(rainfall==undefined || rainfall==null){
          rainfall= 0;
        }
        //rainfall=0;
        //humidity = .20;
        //currTemp = 35;
        //windSpeed = 30;
        let fireRisk =0.2*currTemp - 0.3*humidity + 0.25*windSpeed + 0.25*(100-rainfall);
        //Clear the input field
        rainRef.value = 0;
        console.log(fireRisk);
        //Fire Risk = (0.20 x Temperature - 0.30 x Humidity + 0.25 x Wind Speed + 0.25 x (100 - Rainfall))
        if(fireRisk<23){
          result.innerHTML = "<div class=green><h2>bajo</h2>" +
          "<h3 class=margins>Descripci&oacute;n: El peligro de incendio es bajo. Se pueden permitir incendios al aire libre   controlados y monitoreados para evitar que se propaguen.</h3>" +
          "<p>tempuratura (&#8451): </p>" + currTemp + "<p>humedad: </p>" + humidity + "<p>Velocidad del viento (kmh): </p>" + windSpeed + "<p>precipitaci&oacute;n (mm): </p>" + rainfall +  "<p class=source>fuente: (https://www.pafpa.org/fire-danger-index.php, 25/4/2023)</p>" + "</div>";
         }
        else if(fireRisk<29){
          result.innerHTML = "<div class = yellow><h2>medio</h2>" +
          "<h3 class=margins>Descripci&oacute;n: El peligro de incendio es moderado. Debe evitarse incendios al aire libre. Solo puede prenderse fuego en o parrillas con chimeneas designadas. Cualquier incendio debe ser monitoreado para evitar que se propague.</h3>" +
          "<p>tempuratura (&#8451): </p>" + currTemp + "<p>humedad: </p>" + humidity + "<p>Velocidad del viento (kmh): </p>" + windSpeed + "<p>precipitaci&oacute;n (mm): </p>" + rainfall +  "<p class=source>fuente: (https://www.pafpa.org/fire-danger-index.php, 25/4/2023)</p>" + "</div>";
        }
        else if(fireRisk<35){
          result.innerHTML = "<div class= orange><h2>alto</h2>" +
          "<h3 class=margins>Descripci&oacute;n: El peligro de incendio es alto. Bajo ninguna circunstancia se permite hacer fuego al aire libre.</h3>" +
          "<p>tempuratura (&#8451): </p>" + currTemp + "<p>humedad: </p>" + humidity + "<p>Velocidad del viento (kmh): </p>" + windSpeed + "<p>precipitaci&oacute;n (mm): </p>" + rainfall + "<p class=source>fuente: (https://www.pafpa.org/fire-danger-index.php, 25/4/2023)</p>" + "</div>";
        }
        else{
          result.innerHTML = "<div class= red><h2>extremo</h2>" +
          "<h3 class=margins>Descripci&oacute;n: El peligro de incendio es extremo. Bajo ninguna circunstancia se permite hacer fuego al aire libre. Los miembros de la comunidad deben estar en alerta y ser conscientes de este riesgo extremo de incendio. Mantenga un tel&eacute;fono cerca para llamar al 132 en caso de incendio.</h3>" +
          "<p>tempuratura (&#8451): </p>" + currTemp + "<p>humedad: </p>" + humidity + "<p>Velocidad del viento (kmh): </p>" + windSpeed + "<p>precipitaci&oacute;n (mm): </p>" + rainfall + "<p class=source>fuente: (https://www.pafpa.org/fire-danger-index.php, 25/4/2023)</p>" +  "</div>";
        }
        result.innerHTML += "<p>Nivel de Riesgo = (0.20 x Temperatura - 0.30 x Humedad + 0.25 x Velocidad del viento + 0.25 x (100 - precipitaci&oacute;n))</p>"
      })
      //If city name is NOT valid
      .catch(() => {
        result.innerHTML = `<h3 class="msg">City not found</h3>`;
      });
};
searchBtn.addEventListener("click", getWeather);
window.addEventListener("load", getWeather);