const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const pg = require("pg")
require('dotenv').config()

const app = express()
const port = 3030
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env
const client = new pg.Client({
    user: PGUSER,
    host: PGHOST,
    database: PGDATABASE,
    password: PGPASSWORD,
    port: process.env.PGPORT,
    ssl: true
})
client.connect();

const testDB = async () => {
    try {
        const res = await client.query('SELECT * FROM users')
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
    client.query(`SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`, (err, response) => {
        if (err) {
            console.log(err);
            res.send({message: 'Błąd połączenia'});
        }
        else {
            console.log(response);
            if(response.rows.length == 1) res.send({message: 'Sukces'});
            else res.send({message: 'Zła kombinacja email/hasło'});
        }
    })
});

app.listen(port, () => {
    console.log(`api listening on port ${port}`)
})