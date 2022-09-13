exports.index = async (req, res, next) => {
    return res.status(200).send('Requisição recebida com sucesso!');
};

exports.show = async (req, res, next) => {
    return res.status(200).send('Requisição recebida com sucesso!');
};

exports.store = async (req, res, next) => {
    return res.status(201).send('Requisição recebida com sucesso!');
};

exports.edit = async (req, res, next) => {
    let id = req.params.id;
    return res.status(202).send(`Requisição recebida com sucesso! ${id}`);
};

exports.delete = async (req, res, next) => {
    let id = req.params.id;
    return res.status(202).send(`Requisição recebida com sucesso! ${id}`);
};