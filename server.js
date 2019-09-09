const express = require("express");
const connectDB = require("./config/db");
const app = express();

connectDB();

//Init middleware
app.use(express.json({ extended: false }));

// Define routes
app.use("/api/students", require("./routes/api/students"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/jobs", require("./routes/api/jobs"));
app.use("/api/companies", require("./routes/api/companies"));
app.use("/api/admin", require("./routes/api/admin"));
app.use("/api/profile", require("./routes/api/profile"));

//const PORT = process.env.PORT || 3001;
const PORT = 3001;
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
