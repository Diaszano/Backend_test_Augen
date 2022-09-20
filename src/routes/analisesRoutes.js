const express    = require('express');
const {body}     = require('express-validator');
const {param}    = require('express-validator');
const controller = require('../controllers/analisesControllers');
const login      = require("../middleware/login");

const router = express.Router();


router.get(
    '/', login, controller.index
);

router.get(
    '/data', login, [
        body('data').isString().matches(
                '^([0-9]{4}[-]{1}((0[13-9]|1[012])[-]{1}(0[1-9]|[12][0-9]|30)|(0[13578]|1[02])[-]{1}31|02[-]{1}(0[1-9]|1[0-9]|2[0-8]))|([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00)[-]{1}02[-]{1}29)$'
            ).withMessage(
            "O campo de data é obrigatório e é yyyy-MM-dd."
        )
    ], controller.get
    
);

router.get(
    '/:id', login, [
        param('id').isInt({'gt':0}).withMessage(
            "O parâmetro id tem que ser um inteiro maior que zero"
        )
    ], controller.show
);


router.post(
    '/', login, [
        body('ph').isFloat().withMessage(
            "O campo do ph é obrigatório e é um float."
        ),
        body('cloro').isFloat({'max':100}).withMessage(
            "O campo do cloro é obrigatório e é um float"
            +" menor que igual a 100."
        ),
        body('fluor').isFloat({'max':100}).withMessage(
            "O campo do fluor é obrigatório e é um float"
            +" menor que igual a 100."
        ),
        body('vazao').isFloat({'gt':0}).withMessage(
            "O campo da vazão é obrigatório e é um float "
            +"maior que zero."
        ),
        body('equipamento_id').isInt({'gt':0}).withMessage(
            "O campo equipamento_id tem que ser" + 
            " um inteiro maior que zero."
        )
    ], controller.store
);

router.delete(
    '/:id', login, [
        param('id').isInt({'gt':0}).withMessage(
            "O parâmetro id tem que ser um inteiro maior que zero"
        )
    ], controller.delete
);


module.exports = router;