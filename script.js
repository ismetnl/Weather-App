let weather = {
    "apiKey" : "b53ae0f305b911925583fd6fe28bf08a",

    fetchWeather: function(city = "istanbul", lang = "en"){
        if (localStorage.getItem("city") != "istanbul"){
            city = localStorage.getItem("city")
        }
        if (localStorage.getItem("lang") != null){
            lang = localStorage.getItem("lang")
        }

        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city
            +"&units=metric&appid="
            + this.apiKey
            +"&lang="+lang
            
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data,lang));
    },
    displayWeather: function(data,lang){
        const {name} = data ;
        const {icon, description} = data.weather[0];
        const {temp,humidity} = data.main;
        const {speed} = data.wind ;
        
        if(lang == "en"){
            document.querySelector(".city").innerText = "Weather in "+name;
            document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
            document.querySelector(".description").innerText = description;
            document.querySelector(".Humidity").innerText = "Humidity: %"+humidity;
            document.querySelector(".Wind").innerText = "Wind speed: "+speed+"km";
            document.querySelector(".temp").innerText = temp+"°C";
            document.querySelector(".weather").classList.remove("loading");
            document.body.style.backgroundImage = "url(https://source.unsplash.com/random/1600x900/?"+name+")";
        }
        else{
            document.querySelector(".city").innerText = name+" Hava durumu";
            document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
            document.querySelector(".description").innerText = description;
            document.querySelector(".Humidity").innerText = "Nem: %"+humidity;
            document.querySelector(".Wind").innerText = "Rüzgar Hızı: "+speed+"km";
            document.querySelector(".temp").innerText = temp+"°C";
            document.querySelector(".weather").classList.remove("yükleniyor");
            document.body.style.backgroundImage = "url(https://source.unsplash.com/random/1600x900/?"+name+")";
        }
        

    },
    search: function(){
        localStorage.setItem("city",document.querySelector(".search-bar").value)
        this.fetchWeather();
    },
    language: function(){
        localStorage.setItem("lang",document.querySelector(".select-box").value)
        this.fetchWeather();
    }
    

}

document.querySelector(".search button").addEventListener("click", function (){
    weather.search();
})

document.querySelector(".search-bar").addEventListener("keyup", function (event){
    if(event.key == "Enter"){
        weather.search();
    }
})

document.querySelector(".select-box").addEventListener("change", function (event){
    weather.language();
})

weather.fetchWeather();
