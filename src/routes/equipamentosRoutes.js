const express    = require('express');
const {body}     = require('express-validator');
const {param}    = require('express-validator');
const controller = require('../controllers/equipamentosControllers');


const router = express.Router();


router.get(
    '/', controller.index
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
        body('nome').isString().withMessage(
            "O campo de nome é obrigatório e é uma string."
        ),
        body('cidade').isString().withMessage(
            "O campo da cidade é obrigatório e é uma string."
        )
    ], controller.store
);

router.put(
    '/:id',[
        param('id').isInt({'gt':0}).withMessage(
            "O parâmetro id tem que ser um inteiro maior que zero"
        )
    ],[
        body('nome').isString().withMessage(
            "O campo de nome é obrigatório e é uma string."
        ),
        body('cidade').isString().withMessage(
            "O campo da cidade é obrigatório e é uma string."
        )
    ], controller.edit
);

router.delete(
    '/:id',[
        param('id').isInt({'gt':0}).withMessage(
            "O parâmetro id tem que ser um inteiro maior que zero"
        )
    ], controller.delete
);


module.exports = router;