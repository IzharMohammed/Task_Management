// Importing express module
import express from "express"

const app = express();

// Handling the get request
app.get("/", (req, res) => {
    res.send("Hello World");
});

// Starting the server on the 80 port
app.listen(4000, () => {
    console.log(`The application started successfully on port ${4000}`);
});
