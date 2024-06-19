### README para el Proyecto de Libros BestSeller del New York Times
##### Descripción del Proyecto
Este proyecto es una aplicación web interactiva que permite a los usuarios explorar las listas de libros BestSeller del New York Times. Los usuarios pueden registrarse, iniciar sesión, filtrar y ordenar las listas de libros, y añadir libros a su lista de favoritos. 

La aplicación está construida utilizando HTML, CSS, JavaScript y Firebase para la autenticación, el almacenamiento de datos y el almacenamiento de archivos.

###  Requisitos Previos
Para ejecutar este proyecto, necesitarás:

- Un navegador web moderno (Chrome, Firefox, Safari, etc.)
- Conexión a Internet
- Una cuenta en Firebase para configurar tu propia base de datos y almacenamiento
- Configuración de Firebase
- Crear un Proyecto en Firebase


------------

1. Ve a Firebase Console y crea un nuevo proyecto.
1. Añade una nueva aplicación web al proyecto y copia la configuración de Firebase (firebaseConfig).
1. Configurar Firestore.
1. Habilita Firestore en modo de prueba para simplificar la configuración inicial.
1. Configurar Autenticación.
1. Habilita el proveedor de autenticación por correo electrónico/contraseña.
Configurar Almacenamiento.
1. Habilita Firebase Storage.
1. Configuración del Proyecto
1. Clona el repositorio.


------------

Abre el archivo script.js y reemplaza la configuración de Firebase con la tuya:
javascript


    const firebaseConfig = {
        apiKey: "TU_API_KEY",
        authDomain: "TU_AUTH_DOMAIN",
        projectId: "TU_PROJECT_ID",
        storageBucket: "TU_STORAGE_BUCKET",
        messagingSenderId: "TU_MESSAGING_SENDER_ID",
        appId: "TU_APP_ID"
    };

------------


#### Estructura del Proyecto

```
├── index.html
├── style.css
├── script.js
└── assets
    └── NYT-Bestseller-logo-818x200.png
```
##### index.html
El archivo index.html contiene la estructura principal del sitio web. Incluye enlaces a los archivos CSS y JS, así como elementos HTML necesarios para la interfaz de usuario.

##### style.css
El archivo style.css define los estilos para la aplicación, incluyendo la apariencia del spinner, botones, formularios y demás elementos visuales.

##### script.js
El archivo script.js contiene toda la lógica de la aplicación. Incluye la configuración de Firebase, las funciones para autenticación, manipulación de Firestore, y el manejo de la interfaz de usuario.

#### Funcionalidades Principales
#### 1. Mostrar Listas de BestSeller
La aplicación obtiene y muestra las listas de BestSeller del New York Times.

```
const llamadaListas = async () => {
    try {
        const respuesta = await fetch('https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=TU_API_KEY')
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
```
#### 2. Filtrar y Ordenar Listas
Los usuarios pueden filtrar y ordenar las listas de libros.

```javascript
filterButton.addEventListener('click', () => {
    const filterValue = filterInput.value.toLowerCase();
    filteredListas = listasGlobal.filter(lista =>
        lista.list_name.toLowerCase().includes(filterValue)
    );
    paintFirstPage(filteredListas);
});

ordenListas.addEventListener('change', () => {
    const selectOrden = ordenListas.value
    orderLists(selectOrden)
});
```
#### 3. Registro e Inicio de Sesión
Los usuarios pueden registrarse e iniciar sesión utilizando Firebase Authentication.

```javascript
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
```
#### 4. Añadir Libros a Favoritos
Los usuarios pueden añadir libros a su lista de favoritos.

```javascript
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
```

------------

Abre el archivo index.html en un navegador web.
###### Registrarse o Iniciar Sesión

Haz clic en "Register" para crear una nueva cuenta.
Haz clic en "Login" para iniciar sesión con una cuenta existente.

###### Explorar Listas de Libros

Usa el filtro y las opciones de ordenación para encontrar listas específicas.
Haz clic en "Read More!" para ver los libros de una categoría.

###### Añadir a Favoritos

Haz clic en el botón de favoritos para añadir un libro a tu lista de favoritos.

###### Subir Imagen de Perfil
Haz clic en "Subir Imagen" para subir una imagen de perfil.

------------


Créditos
Este proyecto fue desarrollado utilizando la API de The New York Times y Firebase. El diseño y la implementación fueron realizados por Luis Carlos Acosta.


Este README proporciona una visión completa del proyecto, incluyendo la configuración, funcionalidades y uso de la aplicación. Asegúrate de personalizarlo según sea necesario para tu proyecto específico.