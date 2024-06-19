document.addEventListener('DOMContentLoaded', () => {
    const spinn = document.querySelector('#contenedor_spinner');
    spinn.style.visibility = 'hidden'
    spinn.style.opacity = '0'

    const firebaseConfig = {
        apiKey: "AIzaSyBVkaA9iczE9ZzyHV8sVjKagXY7QJwF-xg",
        authDomain: "bibliotecanyt-d28df.firebaseapp.com",
        projectId: "bibliotecanyt-d28df",
        storageBucket: "bibliotecanyt-d28df.appspot.com",
        messagingSenderId: "866614849707",
        appId: "1:866614849707:web:eddae51354a38bf52307ee"
    };
    firebase.initializeApp(firebaseConfig);

    const db = firebase.firestore();

    const seccion = document.querySelector('main section');
    const fragment = document.createDocumentFragment();
    const header = document.querySelector('header');
    const filterInput = document.querySelector('#filterInput');
    const filterButton = document.querySelector('#filterButton');
    let listasGlobal = [];
    let listBooks = [];
    let filteredListas = [];
    const frecuencia = document.querySelector('#frecuencia')
    const organizacion = document.querySelector('#organizacion')
    const ordenListas = document.querySelector('#orden')
    const selectFrecuencia = document.querySelector('#selectFrecuencia')
    const ordenBooks = document.querySelector('#ordenBestSellers')
    const divOrdenBS = document.querySelector('#divOrdenBestSellers')
    const btnLogin = document.querySelector('#btnLogin')
    const btnRegister = document.querySelector('#btnRegister')
    const btnCancelar = document.querySelectorAll('#cancelar')
    const registro = document.querySelector('#modal-container1')
    const login = document.querySelector('#modal-container2')
    const contenedorFormulario = document.querySelector('.contenedorFormularios')
    const botonesLog = document.querySelectorAll('.botones-Log')
    let booksFavoritos = [];
    let filteredBooks = [];
    let btnSalir = document.querySelector('#salir')
    let subirImagen = document.querySelector('.subirImagen')
    let imagenPerfil = document.querySelector('.profileImagen')
    let divImagenFav = document.querySelector('.subirImagen')


    btnLogin.addEventListener('click', () => {
        login.classList.add('showContainer')
    })
    btnRegister.addEventListener('click', () => {
        registro.classList.add('showContainer')
    })
    btnCancelar.forEach((boton) => {
        boton.addEventListener('click', () => {
            registro.classList.remove('showContainer')
            login.classList.remove('showContainer')
        })
    })

    seccion.addEventListener('click', (ev) => {
        if (ev.target.tagName === 'BUTTON') {
            const category = ev.target.value;
            llamadaBestSellers(category)
        }
    })
    filterButton.addEventListener('click', () => {
        const filterValue = filterInput.value.toLowerCase();
        filteredListas = listasGlobal.filter(lista =>
            lista.list_name.toLowerCase().includes(filterValue)
        );
        paintFirstPage(filteredListas);
    });
    const filterBookFunction = () => {
        const filterValue = filterInput.value.toLowerCase();
        filteredBooks = listBooks.filter((book) =>
            book.title.toLowerCase().includes(filterValue) || book.author.toLowerCase().includes(filterValue)
        );
        paintSecondPage(filteredBooks);
    }
    selectFrecuencia.addEventListener('change', () => {
        const selecFreq = selectFrecuencia.value.toUpperCase()
        orderLists(selecFreq)
    })
    ordenListas.addEventListener('change', () => {
        const selectOrden = ordenListas.value
        orderLists(selectOrden)
    })
    ordenBooks.addEventListener('change', () => {
        const selectBook = ordenBooks.value
        orderBook(selectBook)
    })

    const llamadaListas = async () => {
        try {
            const respuesta = await fetch('https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=qHjUDXnBShnno4hnrWYz0VW7jLmZ503q')
            if (respuesta.ok) {
                const data = await respuesta.json()
                listasGlobal = data.results;
                paintFirstPage(listasGlobal)
                return listasGlobal
            } else {
                throw (error)
            }
        } catch (error) {
            throw (error)
        }
    }
    const paintFirstPage = (listasGlobal) => {
        seccion.innerHTML = '';
        listasGlobal.forEach(lista => {
            const divLibros = document.createElement('DIV')
            const listasUl = document.createElement('UL')
            const listasLi = document.createElement('LI')
            const enlacePaginas = document.createElement('A')
            const buttonList = document.createElement('BUTTON')
            const parrafoOldBook = document.createElement('P')
            const parrafoNewBook = document.createElement('P')
            const parrafoUpdated = document.createElement('P')

            listasLi.textContent = lista.list_name
            parrafoOldBook.textContent = 'Oldest: ' + lista.oldest_published_date
            parrafoNewBook.textContent = 'Newest: ' + lista.newest_published_date
            parrafoUpdated.textContent = 'Updated: ' + lista.updated
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
    const orderLists = () => {
        const selectOrden = ordenListas.value;
        const selectFreq = selectFrecuencia.value.toUpperCase();
        let sortedList = [...filteredListas];

        if (selectFreq === 'WEEKLY' || selectFreq === 'MONTHLY') {
            sortedList = sortedList.filter(lista => lista.updated === selectFreq);
        }
        switch (selectOrden) {
            case 'allOptions':
                break;
            case 'byAscOldest':
                sortedList.sort((a, b) => a.oldest_published_date.localeCompare(b.oldest_published_date));
                break;
            case 'byDesOldest':
                sortedList.sort((a, b) => b.oldest_published_date.localeCompare(a.oldest_published_date));
                break;
            case 'byAscNewest':
                sortedList.sort((a, b) => a.newest_published_date.localeCompare(b.newest_published_date));
                break;
            case 'byDescNewest':
                sortedList.sort((a, b) => b.newest_published_date.localeCompare(a.newest_published_date));
                break;
            case 'byCategoryAZ':
                sortedList.sort((a, b) => a.list_name.localeCompare(b.list_name));
                break;
            case 'byCategoryZA':
                sortedList.sort((a, b) => b.list_name.localeCompare(a.list_name));
                break;
            default:
                break;
        }
        paintFirstPage(sortedList);
    };

    const orderBook = () => {
        const selectBook = ordenBooks.value;
        const sortedBook = [...filteredBooks];
        switch (selectBook) {
            case 'allOptions':
                break;
            case 'byTitleAZ':
                sortedBook.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'byTitleZA':
                sortedBook.sort((a, b) => b.title.localeCompare(a.title));
                break;
            case 'byAuthorAZ':
                sortedBook.sort((a, b) => a.author.localeCompare(b.author));
                break;
            case 'byAuthorZA':
                sortedBook.sort((a, b) => b.author.localeCompare(a.author));
                break;
            default:
                break;
        }
        paintSecondPage(sortedBook);
    }

    const llamadaBestSellers = async (category) => {
        try {
            const respuesta = await fetch(`https://api.nytimes.com/svc/books/v3/lists/current/${category}.json?api-key=qHjUDXnBShnno4hnrWYz0VW7jLmZ503q`)
            if (respuesta.ok) {
                const data = await respuesta.json()
                const nombreListas = data.results
                listBooks = data.results.books
                paintSecondPage(listBooks, nombreListas)
                return { listBooks, nombreListas }
            } else {
                throw (error)
            }
        } catch (error) {
            throw (error)
        }
    }
    const clearSecondPageHeader = () => {
        const elements = header.querySelectorAll('h2, .buttonGoBack');
        elements.forEach(element => element.remove());
    }

    const paintSecondPage = (books) => {
        seccion.innerHTML = '';
        frecuencia.innerHTML = '';
        organizacion.innerHTML = '';
        divOrdenBS.style.display = 'block'
        clearSecondPageHeader();
        const headingLista = document.createElement('H2')
        const enlaceGoBack = document.createElement('A')
        const buttonGoBack = document.createElement('BUTTON')
        headingLista.textContent = books.title
        buttonGoBack.innerHTML = `<span><</span> Back To Index`
        buttonGoBack.classList.add('buttonGoBack')
        enlaceGoBack.setAttribute('href', 'index.html')
        enlaceGoBack.append(buttonGoBack)
        header.append(headingLista, enlaceGoBack)

        books.forEach((book) => {
            const divLibros = document.createElement('DIV')
            divLibros.classList.add('topBook')
            const tituloLibro = document.createElement('H3')
            const imagen = document.createElement('IMG')
            const weekInList = document.createElement('P')
            const description = document.createElement('P')
            const enlaceAmazon = document.createElement('A')
            const buttonFavorito = document.createElement('BUTTON')
            const buttonAmazon = document.createElement('BUTTON')
            const isFavorite = booksFavoritos.some(favBook => favBook.title === book.title);
            if (isFavorite) {
                buttonFavorito.classList.add('btn-favorito-active');
            } else {
                buttonFavorito.classList.add('btn-favorito');
            }
            buttonFavorito.value = book.title
            tituloLibro.textContent = `#${book.rank} ${book.title}`
            imagen.setAttribute('src', book.book_image)
            weekInList.textContent = 'Weeks on list: ' + book.weeks_on_list
            description.textContent = book.description
            enlaceAmazon.setAttribute('href', book.amazon_product_url)
            enlaceAmazon.setAttribute('target', "_blank")
            buttonAmazon.textContent = 'Buy at Amazon!'
            buttonAmazon.classList.add('buttonAmazon')
            enlaceAmazon.append(buttonAmazon)
            divLibros.append(tituloLibro, imagen, weekInList, description, buttonFavorito, enlaceAmazon)
            seccion.append(divLibros)

            buttonFavorito.addEventListener('click', () => {
                if (firebase.auth().currentUser) {
                    toggleFavoriteBook(book, firebase.auth().currentUser.uid, buttonFavorito, books);
                } else {
                    registro.classList.add('showContainer');
                }
            });
        });
        filterButton.addEventListener('click', filterBookFunction);
    }

    const toggleFavoriteBook = async (book, userId, buttonFavorito, books) => {
        const userRef = db.collection('users').doc(userId);
        const favoritesRef = userRef.collection('favorites');
        const query = favoritesRef.where('title', '==', book.title);

        try {
            const snapshot = await query.get();
            if (snapshot.empty) {
                const foundBook = books.find(element => element.title === book.title);
                if (foundBook) {
                    createBooks(foundBook, userId, buttonFavorito);
                } else {
                    console.error("Libro no encontrado en lista:", book.title);
                    alert("Libro no encontrado.");
                }
            } else {
                snapshot.forEach(doc => {
                    doc.ref.delete();
                    console.log(`${book.title} deleted from favorites`);
                    alert(`${book.title} deleted from favorites`);
                    buttonFavorito.classList.remove('btn-favorito-active')
                    buttonFavorito.classList.add('btn-favorito')
                });
            }
        } catch (error) {
            console.error("Error en la busqueda del libro: ", error);
        }
    };
    const createBooks = (foundBook, userId, buttonFavorito) => {
        const userRef = db.collection('users').doc(userId);
        userRef.collection('favorites')
            .add({
                title: foundBook.title,
                book_image: foundBook.book_image,
                weeks_on_list: foundBook.weeks_on_list,
                description: foundBook.description,
                author: foundBook.author,
                rank: foundBook.rank,
                amazon_product_url: foundBook.amazon_product_url
            })
            .then(docRef => {
                console.log("Favorite book added with ID: ", docRef.id);
                alert("Book added to favorites!");
                buttonFavorito.classList.remove('btn-favorito')
                buttonFavorito.classList.add('btn-favorito-active')
            })
            .catch(error => {
                console.error("Error adding favorite book: ", error);

            });
    };

    const readAllFavoriteBooks = (userId) => {
        const userRef = db.collection('users').doc(userId.uid);
        userRef.collection('favorites')
            .get()
            .then((querySnapshot) => {
                booksFavoritos = [];
                querySnapshot.forEach((doc) => {
                    booksFavoritos.push(doc.data())
                });
            })
            .catch(() => console.log('Error reading documents'));;

        const btnUser = document.createElement('BUTTON')
        btnUser.textContent = 'Mi Perfil'
        btnUser.classList.add('btn-user')
        header.append(btnUser)
        btnUser.addEventListener('click', () => {
            paintSecondPage(booksFavoritos)
        })
    };

    document.getElementById("form1").addEventListener("submit", (ev) => {
        ev.preventDefault();
        let email = ev.target.elements.email.value;
        let pass = ev.target.elements.pass.value;
        let pass2 = ev.target.elements.pass2.value;
        pass === pass2 ? signUpUser(email, pass) : alert("error password");
    })
    const createUser = (user) => {
        db.collection("users")
            .doc(user.id)
            .set(user)
            .then((docRef) => console.log("Document written with ID: ", docRef.id))
            .catch((error) => console.error("Error adding document: ", error));
    };
    const signUpUser = (email, pass) => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, pass)
            .then((userCredential) => {
                let user = userCredential.user;
                console.log(`se ha registrado ${user.email} ID:${user.uid}`);
                alert(`se ha registrado ${user.email} ID:${user.uid}`);
                contenedorFormulario.innerHTML = '';
                createUser({
                    id: user.uid,
                    email: user.email,
                    message: "hola!",
                });
            })
            .catch((error) => {
                console.log("Error en el sistema" + error.message, "Error: " + error.code);
            });
    };

    document.getElementById("form2").addEventListener("submit", (ev) => {
        ev.preventDefault();
        let email = ev.target.elements.email2.value;
        let pass = ev.target.elements.pass3.value;
        signInUser(email, pass)
    })

    const signInUser = (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                let user = userCredential.user;
                console.log(`se ha logado ${user.email} ID:${user.uid}`)
                alert(`se ha logado ${user.email} ID:${user.uid}`)
                console.log("USER", user);
                contenedorFormulario.innerHTML = '';
            })
            .catch((error) => {
                alert('Usuario no registrado')
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log(errorCode)
                console.log(errorMessage)
            });
    }
    const signOut = () => {
        let user = firebase.auth().currentUser;
        firebase.auth().signOut().then(() => {
            console.log("Sale del sistema: " + user.email)
            window.location.reload();
        }).catch((error) => {
            console.log("hubo un error: " + error);
        });
    }
    document.getElementById("salir").addEventListener("click", signOut);

    const uploadFile = () => {
        const file = document.getElementById("files").files[0];
        const user = firebase.auth().currentUser;
        const storageRef = firebase.storage().ref();
        const thisRef = storageRef.child(`images/${user.uid}.jpg`);

        thisRef.put(file).then((snapshot) => {
            alert("Imagen subida");
            console.log('Imagen subida correctamente!');
            return thisRef.getDownloadURL();
        }).then((url) => {
            return user.updateProfile({
                photoURL: url
            }).then(() => {
                console.log("Perfil actualizado con la nueva imagen");
                displayImage(url);
            });
        }).catch((error) => {
            console.error("Error al subir imagen o actualizar perfil: ", error);
            alert("Error al subir imagen o actualizar perfil.");
        });
    }
    document.getElementById("uploadButton").addEventListener("click", uploadFile);

    const displayImage = (url) => {
        const img = document.createElement('img');
        img.src = url;
        img.classList.add('styleProfile')
        imagenPerfil.innerHTML = '';
        imagenPerfil.append(img);
        divImagenFav.style.display = 'none'

    }
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            botonesLog.forEach((boton) => {
                boton.innerHTML = '';
            })
            readAllFavoriteBooks(firebase.auth().currentUser)
            btnSalir.style.display = 'block';
            subirImagen.style.display = 'block'
            if (user.photoURL) {
                displayImage(user.photoURL);
            }
            console.log(`Está en el sistema:${user.email} ${user.uid}`);
            document.getElementById("message").innerText = `Está en el sistema: ${user.email}`;
        } else {
            document.getElementById("message").innerText = `No connect`;
        }
    });

    llamadaListas();
})


