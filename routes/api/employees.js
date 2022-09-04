const express = require('express');
const router =express.Router();
const path = require('path');

const data = {};
data.employees = require('../../data/employees.json');

router.route('/')
    .get((req, res) => {
        res.json(data.employees);
    })
    .post((req, res) => {
        const { firstname, lastname } = req.body;
        res.json({ firstname, lastname});
    })
    .put((req, res) => {
        const { firstname, lastname } = req.body;
        res.json({ firstname, lastname});
    })
    .delete((req, res) => {
        res.json({ 
            "id": req.body.id,
        });
    });

router.route('/:id')
    .get((req, res) => {
        res.json({ "id": req.params.id});
    })

module.exports = router;