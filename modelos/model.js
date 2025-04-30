const fs = require('fs');

function lerBancoDeDados(callback) {
    fs.readFile('bancoDeDados.json', 'utf-8', (err, data) => {
        if (err) return callback(err);
        try {
            const json = JSON.parse(data);
            callback(null, json);
        } catch (parseErr) {
            callback(parseErr);
        }
    });
}

module.exports = { lerBancoDeDados };