const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// app.post(`/bot/${process.env.TOKEN}`, (req, res) => {
//   bot.processUpdate(req.body);
//   res.sendStatus(200);
// });

app.get("/", (req, res) => {
  const data = {
    success: true,
    message: "backend is running well",
  };
  return res.json(data);
});

app.listen(port, () => {
  console.log(`Express server is listening on port ${port}`);
});
