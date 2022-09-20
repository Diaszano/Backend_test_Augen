const express    = require('express');
const {body}     = require('express-validator');
const {param}    = require('express-validator');
const controller = require('../controllers/usuariosControllers');

const router = express.Router();

router.post("/cadastro",[
    body('email').isEmail().withMessage(
        "O campo email tem que ser um email válido."
    ),
    body('senha').isStrongPassword().withMessage(
        "O campo senha tem que ser uma senha forte."
    ),
    controller.store
]);

router.post("/login",[
    body('email').isEmail().withMessage(
        "O campo email tem que ser um email válido."
    ),
    body('senha').isString().withMessage(
        "O senha é uma string."
    ),
    controller.login
]);

module.exports = router;