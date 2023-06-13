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
const getAllFishTank= async (id) => {
    try {
        const res = await pool.query(`SELECT * FROM public."Akwarium"`)
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
    pool.query(`SELECT id FROM users WHERE email = '${email}' AND password = '${password}'`, (err, response) => {
        if (err) {
            console.log(err);
            res.send({message: 'Błąd połączenia'});
        }
        else {
            console.log("id:" + response.rows[0].id);
            if(response.rows.length == 1) res.send({message: 'Sukces', id: response.rows[0].id});
            else res.send({message: 'Zła kombinacja email/hasło'});
        }
    });
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

app.get('/getFishTank', async (req, res) => {
    console.log("Akwaria");
    const query = 'SELECT id, nazwa FROM public."Akwarium"';
    const result = await pool.query(query);

    // Przekształcenie wyników na format JSON
    const listaAkwarium = result.rows.map(row => ({ id: row.id, name: row.nazwa }));

    // Zwrócenie listy akwarium jako odpowiedź
    res.json(listaAkwarium);
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

app.post('/postFishTank',async (req, res) => {
    try {
        // Odczytanie danych z ciała żądania
        const { name, width, height, depth, water, fish, user_id, date } = req.body;
        const fishJSON = JSON.stringify(fish);
        const waterJSON = JSON.stringify(water);
        // Wstawienie danych do tabeli Akwarium
        const query = 'INSERT INTO public."Akwarium"(nazwa, dlugosc_cm, szerokosc_cm, wysokosc_cm, pojemnosc_litr, data_zalozenia, ryby, parametry_wody, data_pomiaru, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
        const values = [name, width, height, depth, (width*height*depth)/1000, date, fishJSON, waterJSON, date, user_id];
        console.log(values);
        await pool.query(query, values);
        
        // Zwrócenie potwierdzenia dodania akwarium
        res.send({message: 'Sukces'})
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Wystąpił błąd podczas dodawania akwarium' });
      }
});

app.put('/akwarium/:id/wyposazenie', async (req, res) => {
    const id_akwarium = req.params.id;
    const { wyposazenie } = req.body;
    try {
      const query = 'UPDATE public."Akwarium" SET wyposazenie = $1 WHERE id = $2';
      await pool.query(query, [wyposazenie, id_akwarium]);
  
      res.json({ message: 'Pole "wyposazenie" zostało zaktualizowane.' });
    } catch (error) {
      res.status(500).json({ error: 'Wystąpił błąd podczas aktualizacji pola "wyposazenie".' });
    }
  });

// app.get('/akwarium/:id/wyposazenie', async (req, res) => {
// const id_akwarium = req.params.id;
// console.log("get:" + id_akwarium);
// try {
//     const query = 'SELECT * FROM public."Akwarium" WHERE id = $1';
//     const result = await pool.query(query, [id_akwarium]);

//     if (result.rows.length === 0) {
//     return res.status(404).json({ error: 'Akwarium o podanym id nie istnieje.' });
//     }

//     const wyposazenieJSON = result.rows[0].wyposazenie;
//     const wyposazenie = JSON.parse(wyposazenieJSON);

//     res.json(wyposazenie);
// } catch (error) {
//     res.status(500).json({ error: 'Wystąpił błąd podczas pobierania wyposażenia.' });
// }
// });

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})