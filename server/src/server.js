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
const getFishTank= async (id) => {
    try {
        const res = await pool.query(`SELECT * FROM public."Akwarium" WHERE id = ${id}`)
        console.log(res)
        return res;
    } catch (error) {
        console.log(error)
    }
}
const getFishes= async () => {
    try {
        const res = await pool.query(`SELECT * FROM public."Ryby"`)
        return res;
    } catch (error) {
        console.log(error)
    }
}
const getAllEquipment= async () => {
    try {
        const res = await pool.query(`SELECT * FROM public."Wyposazenie"`)
        return res;
    } catch (error) {
        console.log(error)
    }
}

const getEquipment= async (id) => {
    try {
        const res = await pool.query(`SELECT * FROM public."Wyposazenie" WHERE id = ${id}`)
        return res;
    } catch (error) {
        console.log(error)
    }
}
const getFish= async (id) => {
    try {
        const res = await pool.query(`SELECT * FROM public."Ryby" WHERE id = ${id}`)
        return res;
    } catch (error) {
        console.log(error)
    }
}
const delFishTank= async (id) => {
    try {
        const res = await pool.query(`DELETE FROM public."Akwarium" WHERE id = ${id}`)
        return res;
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

app.get('/getFish', async (req, res) => {
    console.log("Ryby");
    const ryby = await getFishes();
    res.send(ryby.rows);
});
app.get('/getEquipment', async (req, res) => {
    console.log("Wyposazenie");
    const wyposazenie = await getAllEquipment();
    res.send(wyposazenie.rows);
});
app.get('/getFishDetails', async (req, res) => {
    const id = req.query.id;
    const temp = await getFish(id);
    console.log(temp.rows[0]);
    if(temp.rows[0].parametrywodymin != null) {
        temp.rows[0].parametrywodymin = temp.rows[0].parametrywodymin.substring(1, temp.rows[0].parametrywodymin.length - 1);
        temp.rows[0].parametrywodymin = temp.rows[0].parametrywodymin.split(',');
    }
    if(temp.rows[0].parametrywodymax != null) {
        temp.rows[0].parametrywodymax = temp.rows[0].parametrywodymax.substring(1, temp.rows[0].parametrywodymax.length - 1);
        temp.rows[0].parametrywodymax = temp.rows[0].parametrywodymax.split(',');
    }
    console.log(temp.rows[0].parametrywodymax);
    res.send(temp.rows[0]);
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
app.get('/deleteFishTank', async (req, res) => {
    const id = req.query.id;
    await delFishTank(id);
    res.send({message: "Usunięto akwarium o id: " + id});
});

app.get('/getFishTankDetails', async (req, res) => {
    const id = req.query.id;
    if (id == 1) {
        res.send(
            {
                id: 1,
                name: "Akwarium 1",
                ryby: [{
                    id: 1,
                    gatunek: "Bystrzyk pięknopłetwy",
                    obraz: "Bystrzyk_pięknopłetwy.jpg",
                    opis: "gatunek słodkowodnej ryby z rodziny kąsaczowatych (Characidae). Hodowana w akwariach."
                },
                    {
                        id: 2,
                        gatunek: "Danio Kerra",
                        obraz: "Danio_Kerra.jpg",
                        opis: "gatunek słodkowodnej ryby z rodziny karpiowatych (Cyprinidae). Bywa hodowana w akwariach."
                    },
                    {
                        id: 3,
                        gatunek: "Bystrzyk czarny",
                        obraz: "Bystrzyk_czarny.jpg",
                        opis: "gatunek słodkowodnej ryby z rodziny kąsaczowatych (Characidae)."
                    },
                    {
                        id: 3,
                        gatunek: "Bystrzyk czarny",
                        obraz: "Bystrzyk_czarny.jpg",
                        opis: "gatunek słodkowodnej ryby z rodziny kąsaczowatych (Characidae)."
                    },
                ],
                wyposazenie: [{
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
                ],
                wysokosc_cm: 50,
                szerokosc_cm: 25,
                dlugosc_cm: 30,
                parametry_wody: {
                    ph: 7.5,
                    twardosc: 5,
                    temperatura: 25,
                    amoniak: 0,
                    azotyn: 0,
                    azotan: 0,
                    fosforany: 0,
                    wapn: 0,
                    magnez: 2,
                    chlor: 1,
                    dwutlenek_wegla: 0
                },
                data_pomiaru: "2021-05-01 12:00:00"

            },
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
    if (id == 6) {
        const temp = await getFishTank(id);
        const fishtank = temp.rows[0];
        let tempfishes=[];
        let ryby = fishtank.ryby.substring(2, fishtank.ryby.length - 2)
        ryby = ryby.split('(');
        for (let i = 0; i < ryby.length; i++) {
            ryby[i] = ryby[i].split(',');
            if(ryby[i][1]) {
                console.log(ryby[i][1]);
                const fish = await getFish((ryby[i][1]).toString());
                tempfishes.push(fish.rows[0]);
            }
        }
        console.log(fishtank);

        let equipment = fishtank.wyposazenie.id.split(',');
        let tempEquipment = [];
        for (let i = 0; i < equipment.length; i++) {
            const eq = await getEquipment((equipment[i]).toString());
            tempEquipment.push(eq.rows[0]);
        }
        if(fishtank.parametry_wody != null) {
            fishtank.parametry_wody = fishtank.parametry_wody.substring(1, fishtank.parametry_wody.length - 1);
            fishtank.parametry_wody = fishtank.parametry_wody.split(',');
        }
        fishtank.ryby = tempfishes;
        fishtank.wyposazenie = tempEquipment;
        console.log(fishtank);
        console.log(ryby);

        res.send(temp.rows[0]);
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

app.post('/postFishTank', (req, res) => {
    const fish = req.body.fish
    const data = req.body
    console.log(fish)
    console.log(data)
    res.send({message: 'Sukces'})
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})