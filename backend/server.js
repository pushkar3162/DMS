const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const app = express(); // Initialize Express before using it

// Middleware
app.use(express.json()); // Parse JSON request body
app.use(cors());

// Import routes
const fileRoutes = require("./routes/filesRoutes");
const folderRoutes = require('./routes/folderRoutes');

// Use routes after initializing 'app'
app.use("/api/files", fileRoutes);
app.use("/api/folders", folderRoutes);

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected Successfully"))
.catch(err => console.log(err));

// ----------------- Added from server.js2 -----------------
const connectDB = require("./config/db"); // Import database connection from server.js2
const userRoutes = require("./routes/userRoutes"); // Import userRoutes from server.js2

connectDB(); // Connect to the database from server.js2

// Updated CORS settings from server.js2
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true
}));

// Root route from server.js2
app.get("/", (req, res) => {
    res.send("\ud83d\ude80 API is working!");
});

// User routes from server.js2
app.use("/user_roles", userRoutes);
// --------------------------------------------------------

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
