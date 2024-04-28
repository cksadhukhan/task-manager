// In-memory data store
let tasks = [];

exports.getAllTasks = (req, res) => {
    res.json({message: "Get All Tasks"})
};

exports.getTask = (req, res) => {
    const id = req.params.id

    res.json({message: `Get Task with ID ${id}`})
}

exports.createTask = (req, res) => {
    res.json({message: "Create Task"})
};

exports.updateTask = (req, res) => {
    const id = req.params.id

    res.json({message: `Update Task with ID ${id}`})
}

exports.deleteTask = (req, res) => {
    const id = req.params.id

    res.json({message: `Delete Task with ID ${id}`})
}



