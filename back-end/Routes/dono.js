const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Rota de donos ativada.');
});

module.exports = router;