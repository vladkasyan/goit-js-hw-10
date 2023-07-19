const options = {
    headers: {
        'x-api-key': 'live_aQAZzl4UpGeY5Mhdp1DzqXZrA79V1en5ClHXUgWeZnqLwqCu69fOvci14nBSUktr'}
}

export const fetchBreeds = function() {
    return fetch("https://api.thecatapi.com/v1/breeds", options)
    .then(response => {
        if(!response.ok){
            throw new Error(response.statusText)
        }
       return response.json()
    })
}  

export const fetchCatByBreed = function(breedId) {
    return fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`, options)
    .then(response => {
        if(!response.ok) {
            throw new Error(response.statusText)
        }
        return response.json()
    })
}