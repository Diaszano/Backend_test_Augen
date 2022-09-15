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
        body('nome').isString().isLength({'max':30,'min':2}).withMessage(
            "O campo de nome é obrigatório e é uma string, "+
            'com tamanho mínimo de 2 e máximo de 30'
        ),
        body('cidade').isString().isLength({'max':40,'min':3}).withMessage(
            "O campo da cidade é obrigatório e é uma string, "+
            'com tamanho mínimo de 3 e máximo de 40'
        )
    ], controller.store
);

router.put(
    '/:id',[
        param('id').isInt({'gt':0}).withMessage(
            "O parâmetro id tem que ser um inteiro maior que zero"
        )
    ],[
        body('nome').isString().isLength({'max':30,'min':2}).withMessage(
            "O campo de nome é obrigatório e é uma string, "+
            'com tamanho mínimo de 2 e máximo de 30'
        ),
        body('cidade').isString().isLength({'max':40,'min':3}).withMessage(
            "O campo da cidade é obrigatório e é uma string, "+
            'com tamanho mínimo de 3 e máximo de 40'
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