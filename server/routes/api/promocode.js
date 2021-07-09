const express = require('express');

const router = express.Router(); 

router.post('/', async (req, res) => {
    const promo = req.body.promocode;

    if (promo === 'OFFICE20') {
        res.send({
            success: true,
            discount: 0.2
        });
    }
    else res.send({
        success: false
    })
});

module.exports = router;