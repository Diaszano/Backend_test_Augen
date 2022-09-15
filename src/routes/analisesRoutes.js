const express    = require('express');
const {body}     = require('express-validator');
const {param}    = require('express-validator');
const controller = require('../controllers/analisesControllers');

const router = express.Router();


router.get(
    '/', controller.index
);

router.get(
    '/data',[
        body('data').isDate().withMessage(
            "O campo de data é obrigatório e é uma date."
        )
    ], controller.get
    
);

router.get(
    '/:id',[
        param('id').isInt({'gt':0}).withMessage(
            "O parâmetro id tem que ser um inteiro maior que zero"
        )
    ], controller.show
);


router.post(
    '/',[
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
    '/:id',[
        param('id').isInt({'gt':0}).withMessage(
            "O parâmetro id tem que ser um inteiro maior que zero"
        )
    ], controller.delete
);


module.exports = router;