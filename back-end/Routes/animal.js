const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Rota de animais ativada.');
});

module.exports = router;