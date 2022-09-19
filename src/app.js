const morgan          = require('morgan');
const express         = require('express');
const swaggerUI       = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

require("./database");

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const index        = require('./routes');
const usuarios     = require('./routes/usuariosRoutes');
const analises     = require('./routes/analisesRoutes');
const equipamentos = require('./routes/equipamentosRoutes');

app.use(async (req,res,next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if(res.method === 'OPTIONS'){
        res.header(
            'Access-Control-Allow-Methods',
            'PUT, POST, PATCH, DELETE, GET'
        );
        return res.status(200);
    }
    
    next();
});

app.use('/', index);
app.use('/usuarios', usuarios);
app.use('/analises', analises);
app.use('/equipamentos', equipamentos);
app.use('/docs',swaggerUI.serve,swaggerUI.setup(swaggerDocument));


app.use(async (req,res,next) => {
    const erro = new Error(
        "Não encontrado"
    );
    erro.status = 404;
    next(erro);
});

app.use(async (error,req,res,next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    })
});

module.exports = app;