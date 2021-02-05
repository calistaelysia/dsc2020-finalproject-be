const express = require('express');
const rateLimit = require('express-rate-limit');
// const bodyParser = require('body-parser');

const provinceRoute = require('./src/routes/province');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static('public'));

app.disable('x-powered-by');

// const cors = (req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Method', 'GET');
//     next();
// }

const checkApiKey = (req, res, next) => {
    console.log(req.headers);
    const apiKey = req.headers['x-api-key'];
    if (apiKey === undefined){
        return res.send({message: "Api key not found"});
    } else if (apiKey !== "DSC2020BACKEND") {
        return res.send({message: "Api key invalid"});
    }
    next();
}

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

app.use(checkApiKey);
app.use(limiter);
app.use('/api/v1/provinces', provinceRoute);

// app.get('/', (req, res) => {
//     let query = "SELECT * FROM provinces";
//     conn.query(query, (err, result, field) => {
//         res.send({message: 'Hello World', data: result});
//     });
// });

app.listen(3000, console.log('Listening PORT:3000'));