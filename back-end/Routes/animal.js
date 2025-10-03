const router = require('express').Router();
const conexao = require('../db.js');

router.post('/', async (req, res) => {
    const { id_dono, nome_pet, especie, raca, data_nascimento, observacoes } = req.body;

    if (!id_dono) {
        return res.status(400).json({ message: "O ID do dono (id_dono) é obrigatório." });
    }

    try {
        const animalSql = 'INSERT INTO animal (id_dono, nome_pet, especie, raca, data_nascimento, observacoes) VALUES (?, ?, ?, ?, ?, ?)';
        const animalValues = [id_dono, nome_pet, especie, raca, data_nascimento, observacoes];
        
        await conexao.execute(animalSql, animalValues);

        res.status(201).json({ message: 'Animal cadastrado com sucesso!' });

    } catch (error) {
        console.error('Erro ao cadastrar animal:', error);
        res.status(500).json({ message: 'Erro ao cadastrar o animal. Por favor, tente novamente.' });
    }
});

router.get('/', (req, res) => {
    res.send('Rota de animais ativada. Use POST para criar um novo animal.');
});

module.exports = router;