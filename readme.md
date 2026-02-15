## 🛠️ E4-M6 Ejercicio

### Libro de Visitas con Persistencia en Archivos 💾

**Objetivo:** Crear una aplicación web interactiva que permita a los usuarios dejar mensajes, los cuales persistirán incluso si el servidor se reinicia. Aprenderás a leer y escribir archivos en el servidor utilizando el módulo `fs` (File System) de Node.js para simular una base de datos simple con un archivo JSON.

## Instrucciones:

### Paso 1: Preparación del Entorno

**Archivo de Datos:** En la raíz de tu proyecto, crea un archivo llamado `mensajes.json`. Inicialízalo con un array vacío. Este será tu "base de datos".

**Formulario de Envío:** En tu carpeta `public`, modifica tu `index.html` (o crea uno nuevo) para que incluya un formulario simple. Este formulario debe:

- Tener un campo de texto (`<input type="text">`) para que el usuario escriba su nombre.
- Tener un área de texto (`<textarea>`) para el mensaje.
- Utilizar el método `POST` y apuntar a la ruta `/nuevo-mensaje`.

Importante: Dale un atributo `name` a cada uno de tus inputs (ej: `name="usuario"` y `name="mensaje"`) para que puedas identificarlos en el servidor.

### Paso 2: Configuración del Servidor Express

**Importar Módulos:** En tu archivo `app.js`, asegúrate de importar `express` y, lo más importante, el módulo `fs` para manejar archivos:

```js
const fs = require('fs');
```

**Middleware para Formularios:** Para que Express pueda leer los datos enviados desde un formulario (en formato `x-www-form-urlencoded`), necesitas añadir un middleware. Coloca esta línea después de crear la instancia de `app`:

```js
app.use(express.urlencoded({ extended: true }));
```

### Paso 3: Lógica de las Rutas

#### Ruta GET / (Mostrar Mensajes):

- Crea una ruta que responda a peticiones GET en la raíz (`/`).
- Dentro de esta ruta, lee el contenido del archivo `mensajes.json` de forma síncrona usando `fs.readFileSync('mensajes.json', 'utf-8')`.
- El contenido que obtienes es un string. Conviértelo a un array de objetos de JavaScript usando `JSON.parse()`.
- Genera una vista que muestre los mensajes. Puedes crear un string de HTML simple o usar el motor de plantillas `hbs` para renderizar una vista.
- Envía la vista generada como respuesta al cliente.

#### Ruta POST /nuevo-mensaje (Guardar Mensaje):

- Crea una ruta que responda a peticiones `POST` en `/nuevo-mensaje`.
- Dentro de la ruta, los datos del formulario estarán disponibles en `req.body`. Crea un nuevo objeto de mensaje (ej: `{ usuario: req.body.usuario, mensaje: req.body.mensaje }`).
- Lee el archivo `mensajes.json` y conviértelo a un array (mismos pasos que en la ruta GET).
- Añade el nuevo objeto de mensaje al final del array usando `.push()`.
- Convierte el array modificado de vuelta a un string en formato JSON usando `JSON.stringify(array, null, 2)`.
- Escribe el nuevo string JSON de vuelta en el archivo `mensajes.json` de forma síncrona usando `fs.writeFileSync()`.
- Finalmente, redirige al usuario de vuelta a la página principal con `res.redirect('/')`.

## Conceptos a Aplicar:

- **Módulo fs (File System):** El módulo nativo de Node.js para interactuar con el sistema de archivos del servidor.
- **fs.readFileSync():** Lee un archivo de forma bloqueante (síncrona).
- **fs.writeFileSync():** Escribe en un archivo de forma bloqueante, reemplazando su contenido.
- **JSON:** El formato estándar para el intercambio de datos.
- **JSON.parse():** Convierte un string JSON en un objeto de JavaScript.
- **JSON.stringify():** Convierte un objeto de JavaScript en un string JSON.
- **Middleware express.urlencoded():** Parsea cuerpos `urlencoded` y hace los datos de formularios accesibles en `req.body`.
- **Método POST:** El método HTTP usado para enviar datos al servidor.
- **res.redirect():** Redirige la petición del cliente a una URL diferente.

## Entrega:

El trabajo deberá ser entregado a través de un repositorio público en GitHub. No olvides incluir el `.gitignore`. Por favor, comparte únicamente el enlace a dicho repositorio. 📤
