const express = require('express');
const rateLimit = require('express-rate-limit');

const provinceRoute = require('./src/routes/province');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.disable('x-powered-by');

const checkApiKey = (req, res, next) => {
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

app.listen(3000, console.log('Listening PORT:3000'));