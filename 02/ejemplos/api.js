//fetch api

fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(error => console.log(error))

//axios

axios.get('https://jsonplaceholder.typicode.com/posts')
  .then(response => console.log(response.data))
  .catch(error => console.log(error))

//fetch api con async await

const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  const json = await response.json()
  console.log(json)
}

fetchPosts()


//pokedex

const fetchPokedex = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon')
  const json = await response.json()
  console.log(json)
}

fetchPokedex()

// API: https://pokeapi.co/

// Listado: GET /api/v2/pokemon?limit=20&offset=0

// Detalle: GET /api/v2/pokemon/{name|id}
