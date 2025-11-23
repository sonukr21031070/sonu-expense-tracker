require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// Middleware to handle CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], 
  })
);

app.use(express.json());

connectDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// If running in production, serve the frontend build (if present).
// This makes it easier to deploy a single service on platforms like Render.
if (process.env.NODE_ENV === "production") {
  const frontendDist = path.join(__dirname, "..", "frontend", "expense-tracker", "dist");
  if (fs.existsSync(frontendDist)) {
    app.use(express.static(frontendDist));

    // Serve index.html for any unknown routes (client-side routing)
    app.get("*", (req, res) => {
      res.sendFile(path.join(frontendDist, "index.html"));
    });
  }
}
