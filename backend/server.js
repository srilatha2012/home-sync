const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"])
//Import dotenv package and read environment variables from .env file
require("dotenv").config();

//Import Dependencies
const express = require("express");
const dbConnection = require("./config/connection");
const routes = require("./routes");
const cors = require("cors");

//create express application
const app = express();

//Define port number from .env file
const PORT = process.env.PORT || 3000;

//Middleware
const allowedOrigins = [
    "http://localhost:5173",
    process.env.FRONTEND_URL
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

app.use(express.json());

//GET - healthcheck
app.get("/api/health", (req, res) => {
    res.json({ message: "HomeSync API is running " });
});

//Main routes
app.use(routes);

//Connect to MongoDB and start server
dbConnection()
    .then(() => {
        //PORT. start the server and listen on PORT  
        app.listen(PORT, () => {
            console.log(`Server listening on PORT ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("Failed to connect to MongoDB and start server:", error.message);
    })


