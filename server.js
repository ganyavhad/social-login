const express = require('express');
const app = express();

// midleware for parsing data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const auth = require('./service/auth')

app.get('/', function (req, res) {
    res.json('Homepage')
})

app.use('/auth', auth);


app.listen(5000, () => {
    console.log("Listening on 5000")
});