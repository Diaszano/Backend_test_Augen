const {validationResult} = require('express-validator');
const Equipamentos       = require('../models/Equipamentos');
const Cidades            = require('../models/Cidades');

// Listar todos equipamentos (index)
exports.index = async (req, res, next) => {
    try {
        const equipamentos = await Equipamentos.findAll({
            include:[
                {
                    association: 'cidade'
                },
                {
                    association: 'analises'
                }
            ]
        });
        const response = {
            quantidade  : equipamentos.length,
            equipamentos: equipamentos.map(
                equipamento => {
                    return {
                        id          : equipamento.id,
                        nome        : equipamento.nome,
                        cidade      : equipamento.cidade.nome,
                        qtd_analises: equipamento.analises.length,
                        request     : {
                            tipo     : 'GET',
                            descricao: 'Retorna os detalhes do ' +
                                        'equipamento',
                            url: 'http://localhost:3000/' +
                                'equipamentos/' + equipamento.id
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
        const id          = parseInt(req.params.id);
        const equipamento = await Equipamentos.findByPk(id,{
            include:[
                {
                    association: 'cidade'
                },
                {
                    association: 'analises'
                }
            ]
        });

        if(equipamento == null){
            return res.status(404).send({
                mensagem: 'Não foi encontrado o equipamento com esse ID'
            });
        }

        const response = {
            equipamento:{
                id        : equipamento.id,
                nome      : equipamento.nome,
                criado    : equipamento.createdAt,
                atualizado: equipamento.updatedAt,
                cidade    : {
                    nome: equipamento.cidade.nome
                },
                qtd_analises: equipamento.analises.length,
                analises    : equipamento.analises.map(
                    analise => {
                        return {
                            id     : analise.id,
                            ph     : analise.ph,
                            cloro  : analise.cloro,
                            fluor  : analise.fluor,
                            vazao  : analise.vazao,
                            request: {
                                tipo     : 'GET',
                                descricao: 'Retorna os detalhes do ' +
                                            'equipamento',
                                url: 'http://localhost:3000/' +
                                    'analises/' + analise.id
                            }
                        }
                    }
                ),
                request : {
                    tipo     : 'GET',
                    descricao: 'Retorna todos os equipamentos',
                    url      : 'http://localhost:3000/equipamentos'
                }
            }
        }
        return res.status(200).send(response);
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
        var cidade        = await Cidades.findOne({
            where: { nome: cidade }
        });

        if(cidade == null){
            cidade = await Cidades.create(
                {
                    nome: req.body.cidade
                }
            )
        }

        const equipamento = await Equipamentos.create({
            nome     : nome,
            cidade_id: cidade.id
        });

        const response = {
            mensagem   : "Equipamento inserido com sucesso.",
            equipamento: {
                id  : equipamento.id,
                nome: equipamento.nome
            },
            request   : {
                tipo     : 'GET',
                descricao: 'Retorna todos os equipamentos',
                url      : 'http://localhost:3000/equipamentos'
            }
        }

        return res.status(201).send(response);
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
        const id          = parseInt(req.params.id);
        const equipamento = await Equipamentos.findByPk(id,{
            include: {
                association: 'cidade'
            }
        });

        if(equipamento == null){
            return res.status(404).send({
                mensagem: 'Não foi encontrado o equipamento com esse ID'
            });
        }

        const novo = {
            nome  : req.body.nome,
            cidade: req.body.cidade
        };

        if(equipamento.cidade.nome == novo.cidade){
            if(equipamento.nome != novo.nome){
                equipamento.nome = novo.nome;
            }else{
                return res.status(400).send(
                    {
                        mensagem: "Não tem alterações a ser feita"
                    }
                )
            }
        }else{
            var cidade = await Cidades.findOne({
                where: { nome: novo.cidade }
            });
            
            if(cidade == null){
                cidade = await Cidades.create(
                    {
                        nome: novo.cidade
                    }
                )
            }

            equipamento.nome      = novo.nome;
            equipamento.cidade_id = cidade.id;
        }
        console.log("Antes do erro?")
        const resultadoSave = await equipamento.save();

        const response = {
            mensagem: "Equipamento atualizado com sucesso.",
            id      : resultadoSave.id,
            nome    : resultadoSave.nome,
            cidade  : novo.cidade,
            request : {
                tipo     : 'GET',
                descricao: 'Retorna os detalhes do produto',
                url      : 'http://localhost:3000/' +
                        'equipamentos/' + resultadoSave.id
            }
        }

        return res.status(202).send(response);
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
        const id          = parseInt(req.params.id);
        const equipamento = await Equipamentos.findByPk(id,{
            include: {
                association: 'cidade'
            }
        });

        if(equipamento == null){
            return res.status(404).send({
                mensagem: 'Não foi encontrado o equipamento com esse ID'
            });
        }

        equipamento.destroy();

        const response = {
            mensagem: "Equipamento deletado com sucesso.",
            request : {
                tipo     : 'POST',
                descricao: 'Insere um novo equipamento',
                url      : 'http://localhost:3000/equipamentos',
                body     : {
                    nome  : "String",
                    cidade: "String"
                }
            }
        };
        return res.status(202).send(response);
    } catch (error) {
        return res.status(500).send({error:error});
    }
};