//0. Iniciamos servidor
//1. Importamos express y mongodb

const express = require("express");
const mongodb = require("mongodb");
const BodyParser = require("body-parser");
const ObjectId = require("mongodb").ObjectID;


const Port=process.env.PORT||3000;
//const URI="mongodb+srv://gowusUser:Vc805778@cluster0.mjyi4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const URI= "mongodb+srv://gowusUser:Vc805778@cluster0.mjyi4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


//3.Creamos el objeto mongoClient para que nos permita conectarnos a un servidor mongodb 
const mongoClient = mongodb.MongoClient;

const MongoClient = require('mongodb').MongoClient;
let db; //Hemos creado esta variable para almacenar la base de datos (Gowus)

//4.Nos conectamos al mongodb y hacemos una condicional para saber si nos hemos conectado correctamente con la base de datos.

mongodb.MongoClient.connect(URI,{ useNewUrlParser: true }, function (err, client) {
    if (err !== null) {
        console.log(err);
         return err;
     } else {
         db = client.db('Gowus');
     }
 })


const mongoose = require('mongoose')

const url = "mongodb+srv://gowusUser:Vc805778@cluster0.mjyi4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// const connectionParams={
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true 
// }
// mongoose.connect(url,connectionParams)
//     .then( () => {
//         console.log('Connected to database ')
//     })
//     .catch( (err) => {
//         console.error(`Error connecting to the database. \n${err}`);
//     })



//  const client = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true });
//  client.connect(err => {
//    db= client.db("Gowus");
//    console.log("conexted")
//    // perform actions on the collection object
//   client.close();
//  });

//5.Iniciamos el servidor e indicamos al servidor q use archivos de static public
const app = express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

//6. POST, para agregar nuevos contactos
app.post('/Gowus', function (req, res) {
    //7. Creamos el objeto contacto y toda la info q el usuario introducirá como objeto (body)
    let contacto = {
        nombre: req.body.nombre,
        correo:req.body.correo,
        comentario: req.body.comentario
    }
    console.log(contacto);
    //9. Añadimos los contactos a la colección ContactGowus
    db.collection('ContactGowus').insertOne(contacto, function (err, result) {
        if (err !== null) {
            res.send("No se ha realizado la solicitud correctamente, intente de nuevo y disculpe las molestias.");
        } else {
            res.send({ mensaje: "La solicitud se ha enviado correctamente." })
            console.log("hola");
        }
    })
});


// GET, para ver todos los contactos
app.get('/Gowus', function (req, res) {
    db.collection('ContactGowus').find().toArray(function (err, respuesta) {
        if (err !== null) {
            console.log(err);
            res.send(err);
        } else {
            res.send(respuesta);
        }
    })
});


//6. Añadimos el puerto
app.listen(Port,()=>console.log('server started'));
