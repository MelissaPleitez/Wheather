const container_result= document.querySelector('#results')
const form= document.querySelector('#form')


window.addEventListener('load', ()=>{
    form.addEventListener('submit', API_requests)
})


function API_requests(e){
    e.preventDefault()

const cities= document.querySelector('#city').value 
const countries= document.querySelector('#country').value

if(cities==='' || countries===''){
    alerts('Empty Inputs')
    return
}


getting_APIContent(cities, countries)

}

function alerts(message){

    Toastify({
        text:`${message} ` ,
        className: "info",
        duration: 3000,
        style: {
          background: "#9d263a",
        }
      }).showToast();
}

function getting_APIContent(cities, countries){

const apiID= '432db61f205856fc59480463e4d011ba'
const apiURL= `https://api.openweathermap.org/data/2.5/weather?q=${cities},${countries}&appid=${apiID}`

spinner()

fetch(apiURL).then(results=> results.json())
.then(data => {
    if(data.cod==='404'){
        alerts('The city does not exit')
        return
    }
    cleanHTML()
    creatingData(data)
})

}

function creatingData(data){

    const {name, main:{temp, temp_max, temp_min, humidity} }= data

    const country_name= document.createElement('h2')
    country_name.textContent= name
    country_name.classList.add('text-white', 'bolder', 'text-center')

    const temper= kelvins(temp)
    const max= kelvins(temp_max)
    const min = kelvins(temp_min)

   const container_temper= document.createElement('p')
   container_temper.classList.add('text-white', 'bolder', 'text-center', 'fs-1')
   container_temper.innerHTML=`<i class="bi bi-thermometer-sun"></i> ${temper} &#8451`


   const container_max= document.createElement('p')
   container_max.classList.add('text-white', 'bolder', 'text-center')
   container_max.innerHTML=`Max: ${max} &#8451`

   const container_min= document.createElement('p')
   container_min.classList.add('text-white', 'bolder', 'text-center')
   container_min.innerHTML=`Min: ${min} &#8451`

   container_result.appendChild(country_name)
   container_result.appendChild(container_temper)
   container_result.appendChild(container_max)
   container_result.appendChild(container_min)
}

function kelvins(temperature){
    return parseInt(temperature - 273.15)
}

function cleanHTML(){
    while(container_result.firstChild){
        container_result.removeChild(container_result.firstChild)
    }
}


function spinner(){
    cleanHTML()

const div_spinner= document.createElement('div')
div_spinner.classList.add('sk-fading-circle', 'text-center')

div_spinner.innerHTML= `
<div class="sk-circle1 sk-circle"></div>
  <div class="sk-circle2 sk-circle"></div>
  <div class="sk-circle3 sk-circle"></div>
  <div class="sk-circle4 sk-circle"></div>
  <div class="sk-circle5 sk-circle"></div>
  <div class="sk-circle6 sk-circle"></div>
  <div class="sk-circle7 sk-circle"></div>
  <div class="sk-circle8 sk-circle"></div>
  <div class="sk-circle9 sk-circle"></div>
  <div class="sk-circle10 sk-circle"></div>
  <div class="sk-circle11 sk-circle"></div>
  <div class="sk-circle12 sk-circle"></div>
`

container_result.appendChild(div_spinner)

}