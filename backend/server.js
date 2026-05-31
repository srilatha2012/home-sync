const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"])
//Import dotenv package and read environment variables from .env file
require("dotenv").config();

//Import Dependencies
const express = require("express");
const dbConnection = require("./config/connection");
const userRoutes = require("./routes/api/userRoutes");

//create express application
const app = express();

//Define port number from .env file
const PORT = process.env.PORT || 3000;

//Middleware
app.use(express.json());

app.use("/api/users", userRoutes);


//Routes
//GET - healthcheck
app.get("/api/health", (req, res) => {
    res.json({message: "HomeSync API is running "});
});



//Connect to MongoDB and start server
dbConnection()
    .then(() => {
        //PORT. start the server and listen on PORT  
        app.listen(PORT, () => {
            console.log(`Server listening on PORT ${PORT}`);
        });
    })
    .catch((error) =>{
        console.log("Failed to connect to MongoDB and start server:", error.message);
    })



