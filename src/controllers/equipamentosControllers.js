const {validationResult} = require('express-validator');
const Equipamentos       = require('../models/Equipamentos');
const Cidades            = require('../models/Cidades');

// Listar todos equipamentos (index)
exports.index = async (req, res, next) => {
    try {
        const equipamentos = await Equipamentos.findAll({
            include: {
                association: 'cidade'
            }
        });
        var response = {
            quantidade  : equipamentos.length,
            equipamentos: equipamentos.map(
                prod => {
                    return {
                        id     : parseInt(prod.id),
                        nome   : prod.nome,
                        cidade : prod.cidade.nome,
                        request: {
                            tipo     : 'GET',
                            descricao: 'Retorna os detalhes do ' +
                                        'equipamento',
                            url: 'http://localhost:3000/' +
                                'produtos/' + prod.id
                        }
                    }
                }
            )
        };
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send({error:error});
    }
};

// Listar equipamento pelo id (show)
exports.show = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(
            { errors: errors.array() }
        );
    }
    try {
        return res.status(200).send('Requisição recebida com sucesso!');
    } catch (error) {
        return res.status(500).send({error:error});
    }
};

// Adicionar novo equipamento (store)
exports.store = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(
            { errors: errors.array() }
        );
    }
    try {
        var {nome,cidade} = req.body;
            cidade        = await Cidades.findOne({
            where: { nome: cidade }
        });

        if(cidade == null){
            cidade = await Cidades.create(
                {
                    nome: req.body.cidade
                }
            )
        }

        var equipamento = await Equipamentos.create({
            nome     : nome,
            cidade_id: cidade.id
        });

        return res.status(201).send(equipamento);
    } catch (error) {
        return res.status(500).send({error:error});
    }
};

// Editar o equipamento (edit)
exports.edit = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(
            { errors: errors.array() }
        );
    }
    try {
        let id = req.params.id;
        return res.status(202).send(`Requisição recebida com sucesso! ${id}`);
    } catch (error) {
        return res.status(500).send({error:error});
    }
};

// Excluir o equipamento (soft delete)
exports.delete = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(
            { errors: errors.array() }
        );
    }
    try {
        let id = req.params.id;
        return res.status(202).send(`Requisição recebida com sucesso! ${id}`);
    } catch (error) {
        return res.status(500).send({error:error});
    }
};