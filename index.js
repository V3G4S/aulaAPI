const express = require('express');

const app = express();
const PORT = 8000;
app.use(express.json());

const bancoDeDados =[{
    id: 1,
    titulo: 'Aula de Node.js',
    descricao: 'Aula de Node.js para iniciantes'
}]

app.get('/aulas', (req, res) => {res.status(200).send(bancoDeDados)});

app.get('/aulas/:id', (req, res) => {
    const id = req.params.id;
})

app.post('/aulas', (req, res) => {
    const dados = req.body;
    dados['id'] = bancoDeDados.length + 1;
    res.status(201).send(`Aula criada: ${dados}`);
});

app.listen(PORT, () => {console.log(`Servidor ativo em: http://localhost:${PORT}`)});