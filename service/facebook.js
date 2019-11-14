const express = require('express');
const router = express.Router();

router.get('/auth', (req, res) => {
    res.json('Facebook auth')
})
module.exports = router;
