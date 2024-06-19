README
Descripción del Proyecto
Este proyecto es una aplicación web que se integra con la API de Best Sellers del New York Times y Firebase para proporcionar una interfaz fácil de usar para explorar, filtrar y organizar listas de libros y best sellers. Los usuarios pueden registrarse, iniciar sesión, ver listas de libros, filtrarlas por varios criterios, marcar libros como favoritos y cargar imágenes de perfil.

Características
Listas de Best Sellers del NYT:

Obtener y mostrar varias listas de libros de la API del NYT.
Filtrar y ordenar listas por nombre, fecha de publicación y frecuencia de actualización.
Detalles del Libro:

Ver información detallada sobre los libros en las listas seleccionadas.
Filtrar y ordenar libros por título y autor.
Autenticación de Usuarios:

Registro e inicio de sesión utilizando Firebase Authentication.
Mantener sesiones de usuario y permitir a los usuarios cerrar sesión.
Favoritos:

Marcar libros como favoritos.
Ver y gestionar una lista de libros favoritos almacenados en Firebase Firestore.
Gestión de Perfil:

Cargar y mostrar imágenes de perfil utilizando Firebase Storage.
Empezando
Requisitos Previos
Asegúrese de tener un navegador web moderno.
Necesita un proyecto de Firebase con Firestore, Authentication y Storage habilitados.
Obtener claves API para NYT y Firebase.
Configuración
Clonar el repositorio:

bash
Copiar código
git clone https://github.com/tu-repo/proyecto.git
cd proyecto
Actualizar Configuración:

Reemplace la configuración de Firebase en el script con las credenciales de su proyecto:

javascript
Copiar código
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
};
Reemplace la clave API del NYT en las funciones llamadaListas y llamadaBestSellers:

javascript
Copiar código
const respuesta = await fetch('https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=TU_NYT_API_KEY');
Ejecutar la Aplicación
Abra el archivo index.html en su navegador web.

Estructura de Archivos
index.html: El archivo HTML principal que contiene la estructura de la aplicación web.
style.css: El archivo CSS para el estilo de la aplicación.
app.js: El archivo JavaScript que contiene toda la lógica para interactuar con la API del NYT, Firebase y manejar eventos de la interfaz de usuario.
Principales Funciones de JavaScript
Inicialización:

document.addEventListener('DOMContentLoaded', ...) - Inicializa la aplicación y configura los listeners de eventos una vez que el DOM está completamente cargado.
Configuración de Firebase:

Inicializa Firebase con la configuración proporcionada y configura Firestore.
Listeners de Eventos:

Maneja interacciones del usuario como iniciar sesión, registrarse, filtrar listas y libros, y marcar libros como favoritos.
Llamadas a la API:

llamadaListas() - Obtiene listas de libros de la API del NYT.
llamadaBestSellers(category) - Obtiene libros en una categoría específica de la API del NYT.
Funciones de Renderizado:

paintFirstPage(listasGlobal) - Renderiza las listas de libros en la página principal.
paintSecondPage(books) - Renderiza los libros de una lista seleccionada.
Ordenar y Filtrar:

orderLists() - Ordena las listas de libros según los criterios seleccionados.
orderBook() - Ordena los libros según los criterios seleccionados.
Autenticación de Usuarios:

signUpUser(email, pass) - Registra un nuevo usuario.
signInUser(email, password) - Inicia sesión un usuario existente.
signOut() - Cierra sesión del usuario actual.
Gestión de Favoritos:

toggleFavoriteBook(book, userId, buttonFavorito, books) - Alterna el estado de favorito de un libro.
createBooks(foundBook, userId, buttonFavorito) - Agrega un libro a los favoritos del usuario.
readAllFavoriteBooks(userId) - Lee y muestra todos los libros favoritos de un usuario.
Carga de Imágenes de Perfil:

uploadFile() - Maneja la carga de imágenes de perfil a Firebase Storage.
displayImage(url) - Muestra la imagen de perfil cargada.
Despliegue
Para desplegar esta aplicación, puede alojarla en cualquier servicio de alojamiento de sitios estáticos como GitHub Pages, Netlify o Firebase Hosting. Asegúrese de tener la configuración correcta y las claves API configuradas en su entorno.

Licencia
Este proyecto está licenciado bajo la Licencia MIT.

Agradecimientos
New York Times por su API de Best Sellers.
Firebase por su completo conjunto de herramientas para aplicaciones web.