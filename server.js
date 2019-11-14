const express = require('express');
const app = express();

const facebook = require('./service/facebook')
app.get('/', function (req, res) {
    res.json('Homepage')
})

app.use('/facebook', facebook);


app.listen(5000, () => {
    console.log("Listening on 5000")
});