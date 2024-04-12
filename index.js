const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const bot = require("./src/module/telegramBot");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  const data = {
    success: true,
    message: "backend is running well",
  };
  return res.json(data);
});

app.post(`/${process.env.TOKEN}`, (req, res) => {
  console.log(req.body);
  bot.processUpdate(req.body);
  res.status(200).json({ message: "ok" });
});

app.listen(port, () => {
  console.log(`\n\nServer running on port ${port}.\n\n`);
});
