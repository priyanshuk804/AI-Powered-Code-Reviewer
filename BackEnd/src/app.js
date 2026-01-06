const express = require("express");
const aiRoutes = require("./routes/ai.routes");


const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ai-powered-code-reviewer-5a8v.vercel.app"
    ],
    methods: ["GET", "POST"],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/ai", aiRoutes);
module.exports = app;
