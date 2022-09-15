const {validationResult} = require('express-validator');
const Analises           = require('../models/Analises');
const Equipamentos       = require('../models/Equipamentos');
const { Op }             = require("sequelize");


// Listar todas análises (index)
exports.index = async (req, res, next) => {
    try {
        const analises = await Analises.findAll({
            include:{
                association: 'equipamento'
            }
        })

        const response = {
            quantidade: analises.length,
            analises  : analises.map(
                analise => {
                    return {
                        id     : analise.id,
                        ph     : analise.ph,
                        cloro  : analise.cloro,
                        fluor  : analise.fluor,
                        vazao  : analise.vazao,
                        request: {
                            tipo     : 'GET',
                            descricao: 'Retorna os detalhes da ' +
                                        'analise',
                            url: 'http://localhost:3000/' +
                                'analises/' + analise.id
                        }
                    }
                }
            )
        }
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send({error:error});
    }
};

// Listar análise pelo id (show)
exports.show = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(
            { errors: errors.array() }
        );
    }
    try {
        const id      = parseInt(req.params.id);
        const analise = await Analises.findByPk(id,{
            include:{
                association: "equipamento"
            }
        });

        if(analise == null){
            return res.status(404).send({
                mensagem: 'Não foi encontrado o analise com esse ID'
            });
        }

        const response = {
            analise:{
                id         : analise.id,
                ph         : analise.ph,
                cloro      : analise.cloro,
                fluor      : analise.fluor,
                vazao      : analise.vazao,
                criado     : analise.createdAt,
                equipamento: {
                    id  : analise.equipamento.id,
                    nome: analise.equipamento.nome
                },
                request : {
                    tipo     : 'GET',
                    descricao: 'Retorna todos as análises',
                    url      : 'http://localhost:3000/analises'
                }
            }
        };
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send({error:error});
    }
};

// Listar análises conforme a data solicitada na requisição
exports.get = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(
            { errors: errors.array() }
        );
    }
    try {
        const {data}   = req.body;
        const este_dia = new Date(data);
        const prox_dia = new Date(data);
        prox_dia.setDate(prox_dia.getDate()+1);
        const analises = await Analises.findAll(
            {
                where:{
                    createdAt: {
                        [Op.between]: [
                            este_dia,
                            prox_dia
                        ]
                    }
                }
            }
        );
        
        const response = {
            quantidade: analises.length,
            analises  : analises.map(
                analise => {
                    return {
                        id     : analise.id,
                        ph     : analise.ph,
                        cloro  : analise.cloro,
                        fluor  : analise.fluor,
                        vazao  : analise.vazao,
                        request: {
                            tipo     : 'GET',
                            descricao: 'Retorna os detalhes da ' +
                                        'analise',
                            url: 'http://localhost:3000/' +
                                'analises/' + analise.id
                        }
                    }
                }
            )
        }

        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send({error:error});
    }
};

// Adicionar nova análise (store)
exports.store = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(
            { errors: errors.array() }
        );
    }
    try {
        const id          = parseInt(req.body.equipamento_id);
        const equipamento = await Equipamentos.findByPk(id);

        if(equipamento == null){
            return res.status(404).send({
                mensagem: 'Não foi encontrado o equipamento com esse ID'
            });
        }

        const {ph,cloro,fluor,vazao,equipamento_id} = req.body;

        const analise = await Analises.create(
            {ph,cloro,fluor,vazao,equipamento_id}
        );

        const response = {
            mensagem: "Análise inserida com sucesso.",
            analise : {
                id     : analise.id,
                ph     : analise.ph,
                cloro  : analise.cloro,
                fluor  : analise.fluor,
                vazao  : analise.vazao,
                request: {
                    tipo     : 'GET',
                    descricao: 'Retorna todas as análises',
                    url      : 'http://localhost:3000/analises'
                }
            }
        };

        return res.status(201).send(response);
    } catch (error) {
        return res.status(500).send({error:error});
    }
};

// Excluir a análise (delete)
exports.delete = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(
            { errors: errors.array() }
        );
    }
    try {
        const id      = parseInt(req.params.id);
        const analise = await Analises.findByPk(id,{
            include:{
                association: "equipamento"
            }
        });
        
        if(analise == null){
            return res.status(404).send({
                mensagem: 'Não foi encontrada a análise com esse ID'
            });
        }

        analise.destroy();

        const response = {
            mensagem: "Análise deletada com sucesso.",
            request : {
                tipo     : 'POST',
                descricao: 'Insere uma nova análises',
                url      : 'http://localhost:3000/analise',
                body     : {
                    ph            : 'Float',
                    cloro         : 'Float',
                    fluor         : 'Float',
                    vazao         : 'Float',
                    equipamento_id: 'Integer'
                }
            }
        };

        return res.status(202).send(response);
    } catch (error) {
        return res.status(500).send({error:error});
    }
};