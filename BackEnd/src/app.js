const express = require("express");
const cors = require("cors");
const aiRoutes = require("./routes/ai.routes");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ai-powered-code-reviewer-5a8v.vercel.app",
      "https://code-reviewer-eosin-sigma.vercel.app",
      "https://code-reviewer-p51kx62i1-priyanshuk804s-projects.vercel.app"
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/ai", aiRoutes);

module.exports = app;
