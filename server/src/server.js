const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const pg = require("pg")
const bcrypt = require("bcryptjs");

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
const getUserFishTank= async (id) => {
    try {
        const res = await pool.query(`SELECT * FROM public."Akwarium" WHERE user_id = ${id}`)
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

app.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    pool.query(`SELECT *
                FROM users
                WHERE email = '${email}'`, (err, response) => {
        if (err) {
            console.log(err);
            res.send({message: 'Błąd połączenia'});
        } else {
            if (response.rows.length === 1)
            {
                if(bcrypt.compareSync(password, response.rows[0].password))
                    res.send({message: 'Sukces',id: response.rows[0].id});}
            else res.send({message: 'Zła kombinacja email/hasło'});
        }
    });
});
app.post('/register', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    let hashedPassword = await bcrypt.hash(password, 8);
    pool.query(`INSERT INTO users(email, password) VALUES ('${email}', '${hashedPassword}')`, (err, response) => {
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
    const id = req.query.id;
    const aquariums = await getUserFishTank(id);
    res.send(aquariums.rows);
});
app.get('/deleteFishTank', async (req, res) => {
    const id = req.query.id;
    await delFishTank(id);
    res.send({message: "Usunięto akwarium o id: " + id});
});

app.get('/getFishTankDetails', async (req, res) => {
        const id = req.query.id;
        const temp = await getFishTank(id);
        const fishtank = temp.rows[0];
        let tempfishes=[];
        if(fishtank.ryby != null) {
            let ryby = fishtank.ryby.substring(2, fishtank.ryby.length - 2)
            ryby = ryby.split('(');
            for (let i = 0; i < ryby.length; i++) {
                ryby[i] = ryby[i].split(',');
                if (ryby[i][1]) {
                    console.log(ryby[i][1]);
                    const fish = await getFish((ryby[i][1]).toString());
                    tempfishes.push(fish.rows[0]);
                }
            }
        }
        console.log(fishtank);
    let tempEquipment = [];
    if(fishtank.wyposazenie != null) {
            let equipment = fishtank.wyposazenie.id.split(',');
            for (let i = 0; i < equipment.length; i++) {
                const eq = await getEquipment((equipment[i]).toString());
                tempEquipment.push(eq.rows[0]);
            }
        }
        if(fishtank.parametry_wody != null) {
            fishtank.parametry_wody = fishtank.parametry_wody.substring(1, fishtank.parametry_wody.length - 1);
            fishtank.parametry_wody = fishtank.parametry_wody.split(',');
        }
        fishtank.ryby = tempfishes;
        fishtank.wyposazenie = tempEquipment;
        console.log(fishtank);

        res.send(temp.rows[0]);
});

app.post('/postFishTank',async (req, res) => {
    try {
        // Odczytanie danych z ciała żądania
        const { name, width, height, depth, water, fishes, user_id, date } = req.body;
        
        console.log("dane "+fishes);
        // Wstawienie danych do tabeli Akwarium
        const fishesArray = JSON.parse(fishes);
        const query = 'INSERT INTO public."Akwarium"(nazwa, dlugosc_cm, szerokosc_cm, wysokosc_cm, pojemnosc_litr, data_zalozenia, ryby, data_pomiaru, user_id,parametry_wody) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
        const values = [name, width, height, depth, (width*height*depth)/1000, date, fishesArray, date, user_id, water];
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