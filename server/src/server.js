const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const pg = require("pg")
require('dotenv').config()

const app = express()
const port = 3030
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env
const credentialsDB = {
    user: PGUSER,
    host: PGHOST,
    database: PGDATABASE,
    password: PGPASSWORD,
    port: process.env.PGPORT,
    ssl: true
}
const pool = new pg.Pool(credentialsDB)

const testDB = async () => {
    try {
        const res = await pool.query('SELECT * FROM users')
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}

app.use(cors()); 
app.use(bodyParser.json()); 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/', (req, res) => {
    testDB();
    res.send("Hello world");
});

app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    pool.query(`SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`, (err, response) => {
        if (err) {
            console.log(err);
            res.send({message: 'Błąd połączenia'});
        }
        else {
            if(response.rows.length == 1) res.send({message: 'Sukces'});
            else res.send({message: 'Zła kombinacja email/hasło'});
        }
    })
});

app.post('/register', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    pool.query(`INSERT INTO users(email, password) VALUES ('${email}', '${password}')`, (err, response) => {
        if (err) {
            console.log(err);
            res.send({message: 'Użytkownik o poadnym e-mailu już istnieje'});
        }
        else {
            res.send({message: 'Sukces'});
        }
    })
});

app.get('/getFish', (req, res) => {
    console.log("Ryby");
    res.send([
        { 
            id: 1, 
            name: "Bystrzyk pięknopłetwy",
            image: "Bystrzyk_pięknopłetwy.jpg",
            description: "gatunek słodkowodnej ryby z rodziny kąsaczowatych (Characidae). Hodowana w akwariach."
        },
        { 
            id: 2, 
            name: "Danio Kerra",
            image: "Danio_Kerra.jpg",
            description: "gatunek słodkowodnej ryby z rodziny karpiowatych (Cyprinidae). Bywa hodowana w akwariach."
        },
        { 
            id: 3, 
            name: "Bystrzyk czarny",
            image: "Bystrzyk_czarny.jpg",
            description: "gatunek słodkowodnej ryby z rodziny kąsaczowatych (Characidae)."
        },
        { 
            id: 4, 
            name: "Sum rekini",
            image: "Sum_rekini.jpg",
            description: "gatunek słodkowodnej ryby sumokształtnej z rodziny Pangasiidae, poławiany gospodarczo i hodowany w celach konsumpcyjnych, pomimo dużych rozmiarów jest często spotykany jako ryba akwariowa."
        }
    ]);
});

app.get('/getFishDetails', (req, res) => {
    const id = req.query.id;
    if (id == 1) {
        res.send(
            { 
                id: 1, 
                name: "Bystrzyk pięknopłetwy",
                image: "Bystrzyk_pięknopłetwy.jpg",
                description: "gatunek słodkowodnej ryby z rodziny kąsaczowatych (Characidae). Hodowana w akwariach."
            }
        );
    }
    if (id == 2) {
        res.send(
            { 
                id: 2, 
                name: "Danio Kerra",
                image: "Danio_Kerra.jpg",
                description: "gatunek słodkowodnej ryby z rodziny karpiowatych (Cyprinidae). Bywa hodowana w akwariach."
            }
        );
    }
    if (id == 3) {
        res.send(
            { 
                id: 3, 
                name: "Bystrzyk czarny",
                image: "Bystrzyk_czarny.jpg",
                description: "gatunek słodkowodnej ryby z rodziny kąsaczowatych (Characidae)."
            }
        );
    }
    if (id == 4) {
        res.send(
            { 
                id: 4, 
                name: "Sum rekini",
                image: "Sum_rekini.jpg",
                description: "gatunek słodkowodnej ryby sumokształtnej z rodziny Pangasiidae, poławiany gospodarczo i hodowany w celach konsumpcyjnych, pomimo dużych rozmiarów jest często spotykany jako ryba akwariowa."
            }
        );
    }
    
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})