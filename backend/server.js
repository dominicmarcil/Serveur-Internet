import express from "express";
import cors from "cors";
import tasksRouter from "./routes/tasks.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", tasksRouter);

app.get("/", (req, res) => {
  res.json({ message: "Backend actif" });
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';
app.listen(PORT, HOST, () => console.log(`Backend écoute sur ${HOST}:${PORT}`));
