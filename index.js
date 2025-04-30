const express = require('express');
const router = require('./roteamento/route');

const app = express();
const PORT = 8000;
app.use(express.json());

app.use('/aulas', router);

app.listen(PORT, () => {console.log(`Servidor ativo em: http://localhost:${PORT}`)});