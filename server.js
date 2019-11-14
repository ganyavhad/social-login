const express = require('express');
const app = express();
const config = require('config');
console.log("11111111", config.get('facebook_client_id'))
const facebook = require('./service/facebook')
app.get('/', function (req, res) {
    res.json('Homepage')
})

app.use('/facebook', facebook);


app.listen(5000, () => {
    console.log("Listening on 5000")
});