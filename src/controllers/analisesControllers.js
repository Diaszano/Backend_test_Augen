const {validationResult} = require('express-validator');

// Listar todas análises (index)
exports.index = async (req, res, next) => {
    try {
        return res.status(200).send('Requisição recebida com sucesso!');
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
        return res.status(200).send('Requisição recebida com sucesso!');
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
        return res.status(200).send('Requisição recebida com sucesso!');
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
        return res.status(201).send('Requisição recebida com sucesso!');
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
        let id = req.params.id;
        return res.status(202).send(`Requisição recebida com sucesso! ${id}`);
    } catch (error) {
        return res.status(500).send({error:error});
    }
};