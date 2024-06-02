

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

llamadaListas();

