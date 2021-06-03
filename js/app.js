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
const url = `http://gateway.marvel.com/v1/public/comics?limit=20&offset=${offset}&ts=${timestamp}&apikey=${publica}&hash=${hash}`

const fetchData = (url) => {
    // const url = `http://gateway.marvel.com/v1/public/comics?limit=20&offset=${offset}&ts=${timestamp}&apikey=${publica}&hash=${hash}`

    fetch(url)
    .then(response => response.json())
    .then(obj => printData(obj.data.results))
    .catch(error => console.error(error))

}
fetchData(url);

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

let comicId = '';
const getId = (id) => {
    // console.log(id);
    const url = `https://gateway.marvel.com/v1/public/comics/${id}?ts=${timestamp}&apikey=${publica}&hash=${hash}`;
    fetch(url)
        .then(resp => resp.json())
        .then(obj => printDetailComic(obj.data.results))
        .catch(err => console.error(err))
    comicId = id
    characterComicId(comicId)
    return comicId
}

//  const id = '428'
//  const url = `http://gateway.marvel.com/v1/public/comics?limit=20&offset=${offset}&ts=${timestamp}&apikey=${publica}&hash=${hash}`
//  fetch(url)
//      .then(resp => resp.json())
//      .then(obj => console.log(obj))

// FILTROS

const search = document.getElementById('search');
const SType = document.getElementById('type');
const SOrder = document.getElementById('order');
const searchBtn =document.getElementById('search-btn')

//Buscador


const characterComicId = (id) => {
    const url = `https://gateway.marvel.com/v1/public/comics/${id}/characters?ts=${timestamp}&apikey=${publica}&hash=${hash}`
    fetch(url)
        .then(response => response.json())
        .then(obj => printCharactersComic(obj.data.results, 'comicCharactersResults'))
        .catch(err => console.error(err))
};


//personaje

let characterId = '';
const getCharacterId = (id) => {
    const url = `https://gateway.marvel.com/v1/public/characters/${id}?ts=${timestamp}&apikey=${publica}&hash=${hash}`
    fetch(url)
        .then(response => response.json())
        .then(obj => printInfoCharater(obj.data.results))
        .catch(err => console.error(err))
    characterId = id
    getComicsCharacterId(characterId)
    return characterId
};

const getComicsCharacterId = (id) => {
    const url = `https://gateway.marvel.com/v1/public/characters/${id}/comics?ts=${timestamp}&apikey=${publica}&hash=${hash}`
    fetch(url)
        .then(response => response.json())
        .then(obj => printComicsCharacter(obj.data.results))
        .catch(err => console.error(err))
};


//Nav

const fetchCharacters = (url) => {
    fetch(url)
        .then(response => response.json())
        .then(obj => {
            printCharactersComic(obj.data.results, '')
            total = obj.data.total
            totalResult.innerHTML = total
        })
        .catch(err => console.error(err))
};

const searchURLUpdate = () => {
    const input = search.value
    const type = SType.value
    const order = SOrder.value
    console.log(input);
    let url2 = ''
    if (type === 'comics' && input != '') {
        url2 = `https://gateway.marvel.com/v1/public/${type}?titleStartsWith=${input}&orderBy=${order}&limit=20&offset=${offset}&ts=${timestamp}&apikey=${publica}&hash=${hash}`
        fetchData(url2)
    }
    if (type === 'comics' && input === '') {
        url = `https://gateway.marvel.com/v1/public/comics?&orderBy=${order}&limit=20&offset=${offset}&ts=${timestamp}&apikey=${publica}&hash=${hash}`
        fetchData(url)
    }
    if (type === 'characters' && input != '') {
        const url3 = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${input}&orderBy=${order}&limit=20&offset=${offset}&ts=${timestamp}&apikey=${publica}&hash=${hash}`
        fetchCharacters(url3)
    }
    if (type === 'characters' && input === '') {
        const url4 = `https://gateway.marvel.com/v1/public/characters?&orderBy=${order}&limit=20&offset=${offset}&ts=${timestamp}&apikey=${publica}&hash=${hash}`
        fetchCharacters(url4)
    };

}

searchBtn.addEventListener('click', searchURLUpdate);
SType.addEventListener('change', () => {
    const type = SType.value
    if (type === 'comics') {
        SOrder.innerHTML = `
        <option value='title'>A/Z</option>
        <option value='-title'>Z/A</option>
        `
    }
    if (type === 'characters') {
        SOrder.innerHTML = `
        <option value='name'>A/Z</option>
        <option value='-name'>Z/A</option>
        `
    }
})




