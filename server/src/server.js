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
app.get('/getFilters', (req, res) => {
    res.send([
        {
            id: 1,
            name: "AZOO TWIN EFFECT BIO-DENITRATOR",
            image: "AZOO_TWIN_EFFECT_BIO_DENITRATOR.jpg",
            description: "służy do usuwania stale gromadzącego się azotu w formie azotanów (NO3)."
        },
        {
            id: 2,
            name: "ISTA SMART FILTER 16/22MM IF 102",
            image: "ISTA_SMART_FILTER_16_22MM_IF_102.jpg",
            description: "Ista Smart Filter to filtr zewnętrzny, który może pracować jako filtr wstępny, niezależny filtr kompaktowy lub, w połączeniu z innymi, jako system pre-filtracyjny. "
        },
        {
            id: 3,
            name: "EHEIM PROFESSIONEL 3 1200XL T",
            image: "EHEIM_PROFESSIONEL_3_1200XL_T.jpg",
            description: "Seria PROFESSIONEL 3 to ukoronowanie technologii filtracji światowej marki EHEIM. Nie ma chyba lepszych filtrów kubełkowych na świecie."
        },
        {
            id: 4,
            name: "UST-M RO6",
            image: "UST_M_RO6.jpg",
            description: "Filtr RO idealnie łączący możliwość łatwego zastosowania oczyszczonej wody do celów spożywczych jak również akwarystycznych. "
        }
    ]);
});
app.get('/getHeaters', (req, res) => {
    res.send([
        {
            id: 1,
            name: "AN NHA-25",
            image: "AN_NHA_25.jpg",
            description: "Grzałka z termostatem. Szkło QUARTZ, grzałka w pełni zanurzalna. Kontrolka ON/OFF określająca pracę grzałki."
        },
        {
            id: 2,
            name: "Oase HeatUp Basis 20",
            image: "Oase_HeatUp_Basis_20.jpg",
            description: "Ogrzewanie podżwirowe - kable grzewcze Oase HeatUp Basis 20W idealnie nadają się dla wymagających roślin akwariowych, które dzięki ich zastosowaniu na dnie akwarium lepiej się rozwijają."
        },
        {
            id: 3,
            name: "EHEIM thermocontrol+ e 300",
            image: "EHEIM_thermocontrol_e_300.jpg",
            description: "EHEIM thermocontrol+ e to to pierwsza regulowana grzałka z cyfrowym sterowaniem przez WLAN."
        }
    ]);
});
app.get('/getDecorations', (req, res) => {
    res.send([
        {
            id: 1,
            name: "Aqua Della CROCODILE HEAD M",
            image: "czaszka_krokodyla.jpg",
            description: "czaszka krokodyla 19.5x9.5x10.5cm"
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

app.get('/getFishTank', (req, res) => {
    console.log("Akwaria");
    res.send([
        { 
            id: 1, 
            name: "Akwarium 1"
        },
        { 
            id: 2, 
            name: "Akwarium 2"
        },
        { 
            id: 3, 
            name: "Akwarium 3"
        },
        { 
            id: 4, 
            name: "Akwarium 4"
        }
    ]);
});

app.get('/getFishTankDetails', (req, res) => {
    const id = req.query.id;
    if (id == 1) {
        res.send(
            { 
                id: 1, 
                name: "Akwarium 1"
            }
        );
    }
    if (id == 2) {
        res.send(
            { 
                id: 2, 
                name: "Akwarium 2"
            }
        );
    }
    if (id == 3) {
        res.send(
            { 
                id: 3, 
                name: "Akwarium 3"
            }
        );
    }
    if (id == 4) {
        res.send(
            { 
                id: 4, 
                name: "Akwarium 4"
            }
        );
    }
    
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})