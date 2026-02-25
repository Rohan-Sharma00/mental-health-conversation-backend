const dotenv = require("dotenv");
const env = process.env.NODE_ENV || "local";
dotenv.config({ path: `.env.${env}` });

const { app } = require("./app");
const { connectDB }= require("./config/db");
const PORT = process.env.PORT || 3333;

const connectDatabaseAndStartServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.log("problem in starting server");
    }

};

connectDatabaseAndStartServer();