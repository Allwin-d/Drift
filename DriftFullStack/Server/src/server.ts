import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectToDb from "./Db/Db.js";
import authRoutes from "./Routes/authRoutes/authRoutes.js";
import entryRoutes from "./Routes/entryRoutes/entryRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 6969;
const app = express();

app.use(cors());
app.use(express.json()); //parse the incoming requested JSON

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

connectToDb();

//auth Routes
app.use("/api/auth", authRoutes);

//Entry Routes
app.use("/api/entries", entryRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
