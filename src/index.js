import axios from "axios";
import SlimSelect from 'slim-select'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {fetchBreeds, fetchCatByBreed} from "./cat-api"


const selectEl = document.querySelector(".breed-select");
const loaderEl = document.querySelector(".loader");
const errorEl = document.querySelector(".error");
const pictureEl = document.querySelector(".cat-info");

selectEl.setAttribute('hidden', true)
fetchBreeds()
.then(data => {
    console.log(data);
    selectEl.innerHTML = data.map(Element => `<option value="${Element.id}">${Element.name}</option>`).join("")
})
.catch(onFetchError)
.finally(
    () => {
    loaderEl.setAttribute("hidden", true)
    selectEl.removeAttribute('hidden')
    }
)
pictureEl.classList.add('is-hidden');
selectEl.addEventListener("change", onChange)   

function onChange(event){
loaderEl.removeAttribute("hidden")
// selectEl.setAttribute("hidden", true)
pictureEl.classList.add('is-hidden');
    fetchCatByBreed(event.target.value)
    .then(data =>   {
        selectEl.removeAttribute("hidden")
       
        const img = data.map(element => 
        `<img src="${element.url}" alt="cat" width="400" height="400" class="cats">`).join("")
        pictureEl.innerHTML = img
        data.map(element => {
            element.breeds.forEach(cat => {
                const array = [cat]
                const findById = array.find(option => option.id === `${event.target.value}`)
                const markup = `<div class="flex">
                <h2>${findById.name}</h2>
                <p>${findById.description}</p>
                <h2>Temperament</h2>
                <p>${findById.temperament}</p>
                </div>`
                    pictureEl.insertAdjacentHTML("beforeend", markup)
                    
            });
           
        })
        if(data.length === 0) {
            Notify.failure(errorEl.textContent, {
                position: 'center-center',
                fontSize: '30px'
            })
        }
        pictureEl.classList.remove('is-hidden');
    })
    .catch(onFetchError)
    .finally(() => {
        loaderEl.setAttribute("hidden", true)
    }
    )
}

function onFetchError () {
    selectEl.removeAttribute('hidden');

    Notify.failure(errorEl.textContent, {
        position: 'center-center',
        fontSize: '30px'
    })
}