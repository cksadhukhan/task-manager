const express = require('express');
const router = express.Router();

router.get('/tasks', (req, res) => {
    res.json({message: "Get All Tasks"})
});

router.get('/tasks/:id', (req, res) => {
    const id = req.params.id
    
    res.json({message: `Get Task with ID ${id}`})
});

router.post('/tasks', (req, res) => {
    res.json({message: "Create Task"})
});

router.put("/tasks/:id", (req, res) => {
    const id = req.params.id

    res.json({message: `Update Task with ID ${id}`})
})

router.delete("/tasks/:id", (req, res) => {
    const id = req.params.id

    res.json({message: `Delete Task with ID ${id}`})
})

module.exports = router;
