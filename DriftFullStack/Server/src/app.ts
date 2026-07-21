import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";

dotenv.config();

const PORT = process.env.PORT || 6969;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
