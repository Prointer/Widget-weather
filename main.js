fetch('http://api.openweathermap.org/data/2.5/weather?id=756135&appid=3ebaea6efadd1e1c30ee3c82eeb6c7a7')
.then(function(resp){return resp.json()})
.then(function(data){
    console.log(data)
    document.querySelector('.location-text').textContent = data.name;
    document.querySelector('.temperature').innerHTML = Math.round(data.main.temp - 273) + '&deg;';
    document.querySelector('.status').textContent = data.weather[0]['main'];
    document.querySelector('.wind-text').textContent = Math.round(data.wind.speed) + ' km/h';
    document.querySelector('.humidity-text').textContent = data.main.humidity + ' %';
    document.querySelector('.rain-text').textContent = data.main.pressure + ' Pa';
    document.querySelector('.main-img').innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0]['icon']
}@2x.png">`;
}) 
.catch(function(){
    //catch any errors
})

function getDateTime(){
    let now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    if(hour.toString().length == 1){
        hour = '0' + hour
    }
    if (minute.toString().length == 1){
        minute ='0' + minute
    }
    const dateTime = hour + ':' + minute
    return dateTime;
}
setInterval(function(){
    currentTime = getDateTime();
    document.querySelector('.time').textContent = currentTime;
}, 1000);
