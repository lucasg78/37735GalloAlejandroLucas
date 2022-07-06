# Ahumadero Ushuaia

---

## Acerca de la app

El proyecto se realizó en el marco del curso de React JS dictado por Coderhouse y consistió en el desarrollo de la tienda online de la empresa **Ahumadero Ushuaia**. Consta de una página principal, donde se incluyen todos los productos del catálogo, y tres secciones para agruparlos en categorías. Para cada item, se puede acceder al detalle, que incluye una imagen con zoom, el precio unitario y el stock disponible. Al seleccionar la cantidad deseada de cada item, se puede optar por agregarla al carrito y seguir comprando, o ir directamente al detalle del carrito, donde se presenta el contenido y se pueden borrar items (individualmente o todos juntos) o ir al Checkout, donde se corroboran los datos personales y el resumen del pedido y se accede a un formulario para agregar los datos de envío. Finalmente, se puede confirmar la compra, obteniendo un número de orden generado automáticamente y volviendo al inicio, o cancelarla, lo cual vacía al carrito y también redirige al inicio. Allí, se puede optar por realizar otra compra o por desloguearse de la aplicación.

---

## Características y herramientas

La aplicación se desarrolló utilizando los componentes de React JS con los hooks `useState`, `useEffect` y `useContext` y el custom hook `useProductos`. Además, se creó un context con la herramienta `createContext` para compartir información global para ciertos componentes, como `authContext` para el cliente autenticado y `cartContext` para el carrito que está utilizando dicho cliente. Por otro lado, se utilizó React Router Dom para gestionar las rutas y se implementó React Bootstrap para el estilado de algunos elementos, React Icons para añadir íconos, Formik para el formulario de confirmación de la compra, Yup para analizar y validar los datos de dicho formulario, Sweet Alert para generar cuadros de diálogo más atractivos visualmente, React Number Format para introducir el separador de miles en los importes y Firebase para alojar las imágenes en Storage y la base de datos en Cloud Firestore, sincronizando el stock de los productos en tiempo real. Con el objetivo de administrar las diferentes versiones del proyecto se utilizó el sistema Git, mientras que el repositorio con toda la documentación se creó en GitHub. 

---

 ## Autor

Alejandro Lucas Gallo - Julio 2022

---

 ## Ejecución

En el directorio del proyecto, la app se ejecuta con `npm start` luego de instalar [npm](https://www.npmjs.com/) con `npm install`. La ruta para visualizarla en el navegador es http://localhost:3000, donde la página se refrescará automáticamente cada vez que se guarden los cambios realizados en el código. 

Instalación de librerías y plataformas:
- [**React Router Dom**](https://reactrouter.com/docs/en/v6/getting-started/installation#basic-installatio): `npm install react-router-dom`

- [**React Bootstrap**](https://react-bootstrap.github.io/getting-started/introduction/): `npm install react-bootstrap bootstrap`

- [**React Icons**](https://react-icons.github.io/react-icons/): `npm install react-icons --save`

- [**Formik**](https://formik.org/docs/overview): `npm install formik --save`

- [**Yup**](https://www.npmjs.com/package/yup): `npm install -S yup`

- [**Sweet Alert**](https://sweetalert2.github.io/#download): `npm install sweetalert2`

- [**React Number Formar**](https://www.npmjs.com/package/react-number-format): `npm install react-number-format --save`

- [**Firebase**](https://firebase.google.com/docs/web/setup): `npm install firebase`

Datos para loguearse a la aplicación por primera vez:
- E-mail: alejandro.lucas@gallo.com
- Contraseña: gallo123

---

## Recorrido virtual en video
https://youtu.be/Hn0Fp4YI4Tc

---

## Link a la app desplegada en Vercel

https://ahumaderoushuaia.vercel.app/

---

## Agradecimientos
Agradezco a Coderhouse por desarrollar este curso y ofrecer la posibilidad de acceder a la beca, haciendo accesible para todos el aprendizaje de la herramienta. Al profesor Conrado Lanusse, por su forma tan clara, práctica y amena de explicar los conceptos y por su compromiso con el grupo. Y al tutor José Armando Pérez Pérez, por acompañarme con paciencia y comprensión en este proceso, brindando soporte en forma permanente y respondiendo a todas las consultas.

---