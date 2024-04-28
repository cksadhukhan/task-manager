const express = require('express');
const {taskRoutes} = require("./routes")
const {loggerMiddleware} = require("./middlewares")

const app = express();
const port = 3000;

app.use(loggerMiddleware)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', taskRoutes);

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;