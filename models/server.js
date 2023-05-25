const express = require('express')
var cors = require('cors')


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.UserPath = '/api/usuarios';

        //middlewares - Funcion que siempre se ejecuta al levantarse el servidor
        this.middlewares();
        
        //Rutas de aplicacion
        this.routes();
    }

    middlewares(){

        this.app.use(cors()) //CORS

        this.app.use(express.json() )// lectura y parseo del body

        this.app.use(express.static('public')) //Directorio publico

    }

    routes() {
        this.app.use( this.UserPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server listening on port ', this.port)
        });
    }

}


module.exports = Server;