//crear un servidor con express
const express = require ('express');

//incliur el cors
const cors = require('cors');

//incluir la body-parcer (para procesar peticiones post)
const bodyParser = require('body-parser');

//incluir la conexcion mysql
const config = require ('./config');

//crear un server con express
const app = express();

//usar el cors
app.use (cors());

//usar el body-parser para procesar peticiones POST
app.use(bodyParser.json());

//usar el puerto 3000
const port = 3000;

//crear una ruta por defecto
app.get ('/', (req, res) => {
    res.send('hello world')
});

//crear una ruta para obtener todos los proyectos
app.get ('/proyectos', (req, res) => {
    //realiza la ruta
config.query('select * From proyectos', (err, filas) => {
    if (err){
        console.log(err);
        res.status(500).send('Error al obtener los proyectos');

    }else {
        res.json(filas);
    }

});
}
)
//crear una ruta para obtener todos los proyectos
app.get ('/miembro', (req, res) => {
    //realiza la ruta
config.query('select * From miembro', (err, filas) => {
    if (err){
        console.log(err);
        res.status(500).send('Error al obtener los miembro');

    }else {
        res.json(filas);
    }
});
}
)


//crear una ruta para obtener todas las actividades de un proyecto de id en la URL
//luego la query
//
app.get ('/proyecto/:id/actividades', (req, res) => {
    //realiza la ruta
config.query('select * From actividades where proyecto_id = ?', req.params.id,  (err, filas) => {
    if (err){
        console.log(err);
        res.status(500).send('Error al obtener los miembro');

    }else {
        res.json(filas);
    }
});
}
)

//Store a project in the database
app.post('/proyecto', (req, res) => {
    // Get the data from the request
    const data = req.body;
    console.log(data);

    // Perform the query
    config.query('INSERT INTO proyectos SET ?', data, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error al guardar el proyecto');
        } else {
            // Return the response
            res.json({
                id: result.insertId,
                ...data
            });
        }
    });
});


//iniciar el servidor
app.listen (port, ()  => {
console.log(`sever running on port ${port}`);
});