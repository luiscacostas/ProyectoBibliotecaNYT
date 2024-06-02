const seccion = document.querySelector('main section');
const fragment = document.createDocumentFragment();
const header = document.querySelector('header')

seccion.addEventListener('click', (ev)=>{
    if (ev.target.tagName === 'BUTTON') {
        const valorClick = ev.target.value;
        llamadaBestSellers(valorClick)
    }
})

const llamadaListas = async() => {
    try {
        const respuesta = await fetch('https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=qHjUDXnBShnno4hnrWYz0VW7jLmZ503q')
        if (respuesta.ok) {
            const data = await respuesta.json()
            const listas = data.results
            paintFirstPage(listas)
        } else {
            throw error
        }
    } catch (error) {
        throw console.log(error)
    }
}
const paintFirstPage = (listas)=>{
    seccion.innerHTML = '';
    listas.forEach(lista => {
        const divLibros = document.createElement('DIV')
        const listasUl = document.createElement('UL')
        const listasLi = document.createElement('LI')
        const enlacePaginas = document.createElement('A')
        const buttonList = document.createElement('BUTTON')
        const parrafoOldBook = document.createElement('P')
        const parrafoNewBook = document.createElement('P')
        const parrafoUpdated = document.createElement('P')
        
        listasLi.textContent = lista.list_name
        parrafoOldBook.textContent = 'Oldest: '+lista.oldest_published_date
        parrafoNewBook.textContent = 'Newest: '+lista.newest_published_date
        parrafoUpdated.textContent = 'Updated: '+ lista.updated
        buttonList.innerHTML = `Read More! <span>></span>`
        buttonList.classList.add('buttonStyle')
        buttonList.setAttribute('value', lista.list_name_encoded)
        divLibros.classList.add('divStyle')
        enlacePaginas.append(buttonList)
        listasUl.append(listasLi, parrafoOldBook, parrafoNewBook, parrafoUpdated, enlacePaginas)
        divLibros.append(listasUl)
        
        fragment.append(divLibros) 
    });
    seccion.append(fragment)
}

const llamadaBestSellers = async(valorClick) => {
    try {
        const respuesta = await fetch(`https://api.nytimes.com/svc/books/v3/lists/current/${valorClick}.json?api-key=qHjUDXnBShnno4hnrWYz0VW7jLmZ503q`)
        if (respuesta.ok) {
            const data = await respuesta.json()
            const listBooks = data.results.books 
            paintSecondPage(listBooks)
        } else {
            throw error
        }
    } catch (error) {
        throw console.log(error)
    }
}

const paintSecondPage = (listBooks)=>{
    seccion.innerHTML = '';
    const enlaceGoBack = document.createElement('A')
    const buttonGoBack = document.createElement('BUTTON')
    buttonGoBack.innerHTML = `<span><</span> Back To Index`
    buttonGoBack.classList.add('buttonGoBack')
    enlaceGoBack.setAttribute('href', 'index.html')
    enlaceGoBack.append(buttonGoBack)
    header.append(enlaceGoBack)
    
    listBooks.forEach((book, i) => {
      
        const divLibros = document.createElement('DIV')
        divLibros.classList.add('topBook')
        const tituloLibro = document.createElement('H3')
        const imagen = document.createElement('IMG')
        const weekInList = document.createElement('P')
        const description = document.createElement('P')
        const enlaceAmazon = document.createElement('A')
        const buttonAmazon = document.createElement('BUTTON')
        
        tituloLibro.textContent = `#${i+1} ${book.title}`
        imagen.setAttribute('src', book.book_image) 
        weekInList.textContent= 'Weeks on list: ' + book.weeks_on_list
        description.textContent = book.description
        enlaceAmazon.setAttribute('href', book.amazon_product_url)
        buttonAmazon.textContent = 'Buy at Amazon!'
        buttonAmazon.classList.add('buttonAmazon')
        enlaceAmazon.append(buttonAmazon)
        divLibros.append(tituloLibro, imagen, weekInList, description, enlaceAmazon)
        seccion.append(divLibros)  
    })
}


llamadaListas(); 

