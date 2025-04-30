const express = require('express');
const { v4: uuidv4 } = require('uuid');
const novoId = uuidv4();

const router = express.Router();

app.get('', (req, res) => {
    lerBancoDeDados((err, aulas) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao ler o banco de dados' });
        }
        res.status(200).json(aulas);
    });
});

app.get('/:id', (req, res) => {
    const id = req.params.id;
    lerBancoDeDados((err, aulas) => {
        if(err){
            return res.status(500).json({error: 'Erro ao ler o banco de dados'});
        }
        const aula = aulas.find(aula => aula.id == id);
        if(aula){
            return res.status(200).json(aula);
        }
        res.status(404).json({error: 'Usuário não encontrado'});
    });
})

app.post('', (req, res) => {
    lerBancoDeDados((err, aulas) => {
        if(err){
            return res.status(500).json({error: 'Erro ao ler o banco de dados'});
        }
        const dados = req.body;
        dados['id'] = uuidv4();
        aulas.push(dados);
        fs.writeFile('bancoDeDados.json', JSON.stringify(aulas), (err) => {
            if(err){
                return res.status(500).json({error: 'Erro ao salvar o banco de dados'});
            }
            res.status(200).json(dados);
        });
    });
});

app.put('/:id', (req, res) => {
    const id = req.params.id;
    lerBancoDeDados((err, aulas) => {
        if(err){
            return res.status(500).json({error: 'Erro ao ler o banco de dados'});
        }
        const aulaIndex = aulas.findIndex(aula => aula.id == id);
        if(aulaIndex !== -1){
            const dados = req.body;
            for(const key in dados){
                aulas[aulaIndex][key] = dados[key];
            }
            fs.writeFile('bancoDeDados.json', JSON.stringify(aulas), (err) => {
                if(err){
                    return res.status(500).json({error: 'Erro ao salvar o banco de dados'});
                }
            });
            res.status(200).json(aulas[aulaIndex]);
        } else {
            return res.status(404).json({error: 'Aula não encontrado'});
        }
    })
})

app.delete('/:id', (req, res) => {
    lerBancoDeDados((err, aulas) => {
        if(err){
            return res.status(500).json({error: 'Erro ao ler o banco de dados'});
        }});
    const usuario = bancoDeDados.findIndex(aula => aula.id == id);
    if(usuario === -1){
        return res.status(404).json({error: 'Usuário não encontrado'});
    }
    bancoDeDados.splice(usuario, 1);
    res.status(204).send();
});

module.exports = router;