//HASHEAR NUESTRAS KEYS

const privada = '04776c49efedd37186be034b9ac89b275d5b0dea'
const publica = 'e3711f50cafa051f00022795d2c92ba4'
const timestamp = Date.now();

const hash = md5(timestamp + privada + publica);

// console.log(hash);

let offset = 0;

// const url = `http://gateway.marvel.com/v1/public/comics?ts=${timestamp}&apikey=${publica}&hash=${hash}`
// const url = `http://gateway.marvel.com/v1/public/comics?limit=20&offset=${offset}&ts=${timestamp}&apikey=${publica}&hash=${hash}`


// fetch(url)
// .then(response => console.log(response))
// .catch(error => console.error(error))


const fetchData = () => {
    const url = `http://gateway.marvel.com/v1/public/comics?limit=20&offset=${offset}&ts=${timestamp}&apikey=${publica}&hash=${hash}`

    fetch(url)
    .then(response => response.json())
    .then(obj => printData(obj.data.results))
    .catch(error => console.error(error))

}
fetchData();

const botonNextPage = document.getElementById('boton-nextpage');
const botonFirstPage = document.getElementById('boton-firstpage');

offset <= 0 ? botonFirstPage.setAttribute ('disabled', true) : botonFirstPage.setAttribute ('disabled', false)

botonNextPage.addEventListener('click', ()=> {
    offset <= 0 ? botonFirstPage.setAttribute ('disabled', true) : botonFirstPage.setAttribute ('disabled', false)
    offset += 20;
    fetchData()
})

botonFirstPage.addEventListener('click', ()=> {
    offset -= 20;
    fetchData()
})

const getId = (id) => {
    // console.log(id);
    const url = `https://gateway.marvel.com/v1/public/comics/${id}?ts=${timestamp}&apikey=${publica}&hash=${hash}`;
    fetch(url)
        .then(resp => resp.json())
        .then(obj => printDetailComic(obj.data.results))
}

//  const id = '428'
//  const url = `http://gateway.marvel.com/v1/public/comics?limit=20&offset=${offset}&ts=${timestamp}&apikey=${publica}&hash=${hash}`
//  fetch(url)
//      .then(resp => resp.json())
//      .then(obj => console.log(obj))