const root = document.getElementById('root');
// const botonNextPage = document.getElementById('boton-nextpage');
// const botonFirstPage = document.getElementById('boton-firstpage');

const printData = arr => {
    // const rota = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'
    const pathNonFoundNowanted = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";
    const pathNonFoundWanted = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/portrait_uncanny";
  let cajita = '';
  arr.forEach(comic => {
    // console.log(comic);
    const {title, thumbnail: {extension, path}, id} = comic;
    cajita += `
    <div class="column is-one-fifth" onclick="getId(${id})">
      <figure>
        <a href="#"><img src="${path === pathNonFoundNowanted ? pathNonFoundWanted : path}.${extension}" alt="${title}">
          <p>${title}</p>
        </a>
      </figure>
    </div>`
  });
  root.innerHTML = cajita
}

const printDetailComic = arr => {
  let cajita = '';
  arr.forEach(comic => {
    const {thumbnail: {extension, path}, title, description, dates, creators} = comic
    const releaseDate = new Intl.DateTimeFormat('es-AR').format(new Date(dates?.find(el => el.type === 'onsaleDate').date))
    const writer = creators?.items?.filter(el => el.role === 'writer')
    cajita += ` 
    <div class="columns">
    <div class="column is-one-quarter">
        <figure class="img-detalle">
            <img src="${path}.${extension}" alt="${title}">
        </figure>
    </div>
    <div class="column">
        <h3>${title}</h3>
        <h4>Publicado</h4>
        <p>${releaseDate}</p>
        <h4>Guionistas:</h4>
        <p>${writer ? writer[0]?.name : 'Sin información'}</p>
        <h4>Descripción:</h4>
        <p>${description}</p>
    </div>
    </div>`
  })
  root.innerHTML = cajita
  console.log(arr);
}

const container = document.getElementById('container');

const printCharactersComic = (arr, containerText) => {
    if(arr.length === 0){
        containerText.innerHTML = `
            <h3 class="title mb-2 title-color">Personajes</h3>
            <p class="is-size-6 has-text-weight-bold mt-0">${arr.length} Resultado(s)</p>
            <p class="subtitle has-text-weight-bold mt-6 title-color">No se han encontrado resultados</p>`
    }
    let cajita = '';
    arr.forEach(character => {
        const {name, thumbnail: {extension, path}, id} = character;
        const pathNonFoundNowanted = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";
        const pathNonFoundWanted = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/portrait_uncanny";
        containerText.innerHTML = `
                <h3 class="title mb-2 title-color">Personajes</h3>
                <p class="is-size-6 has-text-weight-bold mt-0">${arr.length} Resultado(s)</p>`
        cajita += `<div class="column is-one-fifth" onclick="getCharacterId(${id})">
                    <div class="card-character" data-title="Character" >
                        <img src="${path === pathNonFoundNowanted ? pathNonFoundWanted : path}.${extension}" alt="${name}" class="img-comic-character">
                        <span class="red"></span>
                        <p class="name is-size-5 has-text-weight-bold has-text-centered mt-1 p-3">${name}</p>
                    </div>
                </div> `
    });
  root.innerHTML = cajita
};
    
const printInfoCharater = (arr) =>{
    let cajita = '';
    arr.forEach(character => {
        const {name, thumbnail: {extension, path}, description} = character;
        const pathNonFoundNowanted = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";
        const pathNonFoundWanted = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/portrait_uncanny";
        cajita += `
        <div class="columns">
            <div class="column is-one-quarter">
                <figure class="img-detalle">
                <img src="${path === pathNonFoundNowanted ? pathNonFoundWanted : path}.${extension}" alt="${name}" class="img-comic-info">
                </figure>
            </div>
            <div class="column is-size-5 px-6 py-4 label-select">
                <h3 class="title title-color">${name}</h3>
                <h4 class="has-text-weight-bold m-0 mt-3 mb-2">Descripción:</h4>
                <p class="has-text-justified pr-6">${description ? description : 'Sin información'}</p>
            </div>
        </div>`
    })
    root.innerHTML = cajita;

    if(arr[0].comics.available == 0){
        characterComicsResults.innerHTML = `
            <h3 class="title mb-2 title-color">Comics</h3>
            <p class="is-size-6 has-text-weight-bold mt-0 label-select">${arr[0].comics.available} Resultado(s)</p>
            <p class="subtitle has-text-weight-bold mt-6 title-color">No se han encontrado resultados</p>`
    } else{
        characterComicsResults.innerHTML = `
        <h3 class="title mb-2 title-color">Comics</h3>
        <p class="is-size-6 has-text-weight-bold mt-0 label-select">${arr[0].comics.available} Resultado(s)</p>`
    }
};
        
const printComicsCharacter = arr => {
    let cajita = '';
    arr.forEach(comic => {
        const {title, thumbnail: {extension, path}, id} = comic;
        const pathNonFoundNowanted = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";
        const pathNonFoundWanted = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/portrait_uncanny";
        cajita += `
        <div class="column is-one-fifth" onclick="getId(${id})">
            <figure>
                <a>
                    <img class="height_img" src="${path === pathNonFoundNowanted ? pathNonFoundWanted : path}.${extension}" alt="${title}">
                    <p class="has-text-centered">${title}</p>
                </a>
            </figure>
        </div>`  
    })

  root.innerHTML = cajita
};

