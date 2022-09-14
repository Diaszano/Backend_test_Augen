const express = require('express');
const router  = express.Router();

router.get('/',async (req, res, next) => {
    return res.status(200).send({
        title  : "Node Express API",
        version: "0.1.0"
    });
});

module.exports = router;