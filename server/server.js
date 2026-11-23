const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Database
connectDB();

// Routes
app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/projects", require("./routes/projectRoutes"));

app.use("/api/tasks", require("./routes/taskRoutes"));

app.use("/api/dashboard", require("./routes/dashboardRoutes"));

// Home route
app.get("/", (req, res) => {
    res.send("TaskFlow API is running");
});

// 404
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});