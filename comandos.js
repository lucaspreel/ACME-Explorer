//cambiarse a la base de datos o crearla si no existe
use ACME-Explorer

//crear el usuario de conexión
db.createUser({
    user: "ACME_EXPLORER_ADMIN_USER",
    pwd: "$3CUR3p455W0RDZOZZ",
    roles:  [{
        role: "userAdmin" ,
        db: "ACME-Explorer"
    }]
})

//instalar el complemento para generar data falsa
npm install @faker-js/faker --save-dev

//detectar errores en sintaxis
npx semistandard api/ --fix

//generar datos de prueba
node .\massiveLoad\0-generate.js

//comandos para autenticación con firebase
npm install --save firebase-admin