const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 8000;
app.use(express.json());

const bancoDeDados =[]

app.get('/aulas', (req, res) => {
    fs.readFile('bancoDeDados.json', 'utf-8', (err, data) => {
        if(err){
            res.status(500).json({error: 'Erro ao ler o banco de dados'});
        }
        res.status(200).json(JSON.parse(data));
    });
});

app.get('/aulas/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile('bancoDeDados.json', 'utf-8', (err, data) => {
        if(err){
            res.status(500).json({error: 'Erro ao ler o banco de dados'});
        }
        const aulas = JSON.parse(data);
        const aula = aulas.find(aula => aula.id == id);
        if(aula){
            res.status(200).json(aula);
        }
        res.status(404).json({error: 'Usuário não encontrado'});
    });
})

app.post('/aulas', (req, res) => {
    fs.readFile('bancoDeDados.json', 'utf-8', (err, data) => {
        if(err){
            res.status(500).json({error: 'Erro ao ler o banco de dados'});
        }
        const aulas = JSON.parse(data);
        dados['id'] = aulas.length + 1;
        aulas.push(dados);
        fs.writeFile('bancoDeDados.json', aulas, (err) => {
            if(err){
                res.status(500).json({error: 'Erro ao salvar o banco de dados'});
            }
        });
        res.status(200).json(JSON.parse(data));
    });
});

app.put('/aulas/:id', (req, res) => {
    const id = req.params.id;
    const usuario = bancoDeDados.find(aula => aula.id == id);
    if(!usuario){
        res.status(404).json({error: 'Usuário não encontrado'});
    }
})

app.delete('/aulas/:id', (req, res) => {
    const id = req.params.id;
    const usuario = bancoDeDados.findIndex(aula => aula.id == id);
    if(usuario === -1){
        res.status(404).json({error: 'Usuário não encontrado'});
    }
    bancoDeDados.splice(usuario, 1);
    res.status(204).send();
});

app.listen(PORT, () => {console.log(`Servidor ativo em: http://localhost:${PORT}`)});