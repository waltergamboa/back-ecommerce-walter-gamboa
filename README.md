# Proyecto Final
# De la huerta a tu mesa

## Comentarios Generales
Hola Fede
La verdad me falta tiempo, pense que no iba a ser complicado, si bien son cosas que vimos me costo ordenar y agregar las funcionalidades que pedian. Trate de cumplir con la mayoria de las consignas.
jwt no use ya tenia armado todo para passport local. pug y handlebars tampoco, me decante por ejs y todo lo habia hecho con eso. No queria usar otra cosa.
No pude hacer front, me hubiera gustado seguir el proyecto de React que curse con vos, el de la huerta a tu mesa y sumar las apis. O sino con html puro.
Pero modularizar, ordenar, etc. me llevo mas de lo pensado. Con un front se podia enlazar mejor todo esto, hacer mas validaciones, etc.
Estan los archivos .rest para testear. Dejo algunos registros segun las pruebas.
Fui probando lo mas que pude, las apis, los mails, subir imagenes, etc. Seguro que algo me falta o se me paso. Pero en general estan funcionando.
Trate de profundizar en clases, singleton, objetos, capas, loggers, etc.
Como le habia comentado a Martin, mi tutor, me dio muchos errores, todo sirvio para entender, buscar informacion, solucionar, practicar. Desde ese punto de vista en lo personal me sirvio muchisimo.
Fijate en los config cambiar el mail asi te llegan a vos cuando se haga un nuevo registro y una nueva orden.
En los config esta development, se puede cambiar y cambia a persistencia archivo. Fui probando algunas cosas ahi, quizas no funcione todo ya que me concentre en mongodb.
Pero esta eso segun la consigna solicitada.
La base esta en mongo atlas.

Ya hay 2 usuarios:
uno@gmail.com pass: uno
admin@gmail.com pass: admin

Igual mi idea es seguir trabajando en este proyecto, haciendo el front en react. 
Creo que no me olvido de explicar nada.



## Raiz (/)

Al iniciar pide login, luego de validar, se accede a la ruta (/productos) que trae los productos.

## Api Productos (/productos)

Trae los productos.

## Api Productos (/productos/:id)

Trae un producto por su id.

## Api Productos (/productos/categoria/:categoria)

Trae los productos por categoria (frutas, vegetales, gourmet).

## Api Carritos (/carrito)

Trae los carritos.

## Api Ordenes (/ordenes)

Trae los carritos.

## Api Mensajes (/mensajes)

Trae los mensajes.

## Api Usuarios (/usuarios)

Trae los usuarios.

## /config

Trae la info de la configuracion actual.

## /uploads

Se pueden subir una o varias usando multer a la carpeta uploads.

## /chat

Trae el chat, se usa websockets. Por defecto toma el usuario registrado para mandar mensajes. Si el usuario no es administrador no aparece seleccionar un mensaje para responder al usuario que pregunto.

## /chat/:email

Filtra por los mensajes del usuario


