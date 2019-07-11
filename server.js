import express from "express";
import connectDB from "./config/db";
const app = express();

connectDB();

app.get("/", (req, res) => {
  res.send("API Runnnuing");
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
