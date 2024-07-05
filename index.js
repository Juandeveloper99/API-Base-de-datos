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
app.get ('/Biblioteca_app', (req, res) => {
    //realiza la ruta
config.query('select * From biblioteca_app', (err, filas) => {
    if (err){
        console.log(err);
        res.status(500).send('Error al obtener los biblioteca_app');

    }else {
        res.json(filas);
    }

});
}
)

//Store a project in the database
app.post('/biblioteca_app', (req, res) => {
    // Get the data from the request
    const data = req.body;
    console.log(data);

    // Perform the query
    config.query('INSERT INTO Biblioteca_app SET ?', data, (err, result) => {
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


app.get ('/autores', (req, res) => {
    //realiza la ruta
config.query('select * From autores', (err, filas) => {
    if (err){
        console.log(err);
        res.status(500).send('Error al obtener los autores');

    }else {
        res.json(filas);
    }
});
}
)

app.get ('/biblioteca_app/:id_autores', (req, res) => {
    //realiza la ruta
config.query('select * From acutores where id_autores = ?', req.params.id,  (err, filas) => {
    if (err){
        console.log(err);
        res.status(500).send('Error al obtener los autores');

    }else {
        res.json(filas);
    }
});
}
)

//Store a project in the database
app.post('/Biblioteca_proyecto', (req, res) => {
    // Get the data from the request
    const data = req.body;
    console.log(data);

     // Perform the query
     config.query('INSERT INTO biblioteca_app SET ?', data, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error al guardar en la biblioteca');
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