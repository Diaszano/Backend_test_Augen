const express            = require('express');
const {body}             = require('express-validator');
const {param}            = require('express-validator');
const {validationResult} = require('express-validator');
const controller         = require('../controllers/equipamentos');


const router = express.Router();


router.get(
    '/', controller.index
);

router.get(
    '/:id',
    param('id').isInt({'gt':0}).withMessage(
    "O parâmetro id tem que ser um inteiro maior que zero"
    ), controller.show
);

router.post(
    '/', controller.store
);

router.put(
    '/:id',
    param('id').isInt({'gt':0}).withMessage(
    "O parâmetro id tem que ser um inteiro maior que zero"
    ), controller.edit
);

router.delete(
    '/:id',
    param('id').isInt({'gt':0}).withMessage(
    "O parâmetro id tem que ser um inteiro maior que zero"
    ), controller.delete
);


module.exports = router;