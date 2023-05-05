const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express()
const port = 3030

app.use(cors()); 
app.use(bodyParser.json()); 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/', (req, res) => {
    res.send("Hello world");
});

app.listen(port, () => {
    console.log(`api listening on port ${port}`)
})