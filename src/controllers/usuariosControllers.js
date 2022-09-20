const {validationResult} = require('express-validator');
const Usuarios           = require('../models/Usuarios');
const { Op }             = require("sequelize");
const bcrypt             = require('bcrypt');
const jwt                = require('jsonwebtoken');
require('dotenv').config();



exports.store = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(
            { errors: errors.array() }
        );
    }
    try {
        const {email,senha} = req.body;

        const usuario = await Usuarios.create({
            email: email,
            senha: await bcrypt.hash(senha,10)
        });

        const response = {
            mensagem: "Usuário criado com sucesso!",
            usuario : {
                id    : usuario.id,
                email : usuario.email,
                criado: usuario.createdAt
            }
        }

        return res.status(201).send(response);
    } 
    catch (error) {
        if(error.name == "SequelizeUniqueConstraintError"){
            return res.status(401).send({
                error: "Usuário já cadastrado!"
            })
        }
        return res.status(500).send({error:error});
    }
};

exports.login = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(
            { errors: errors.array() }
        );
    }
    try {
        const {email,senha} = req.body;

        const usuario = await Usuarios.findOne({
            where:{
                email: email
            }
        });

        if(usuario == null){
            return res.status(401).send({
                mensagem: "Falha na autenticação"
            });
        }

        result = await bcrypt.compare(senha,usuario.senha);

        if(!result){
            return res.status(401).send({
                mensagem: "Falha na autenticação"
            });
        }

        const token = jwt.sign(
            {
                id   : usuario.id,
                email: usuario.email
            }, 
            process.env.JWT_KEY,
            {
                expiresIn:"1h"
            }
        );
        
        const response = {
            mensagem:"Autenticado com sucesso!",
            token:token
        }

        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send({error:error});
    }
};