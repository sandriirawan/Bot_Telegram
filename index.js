const express = require("express");
const dotenv = require("dotenv");
const TelegramBot = require("node-telegram-bot-api");
const data = require("./src/config/data");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const token = process.env.TOKEN;
const bot = new TelegramBot(token, { polling: true });

app.use(bodyParser.json());

app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  switch (messageText) {
    case "/start":
      sendCommandsList(chatId);
      break;
    case "Go Back":
      sendCommandsList(chatId);
      break;
    case "Siteplan":
      const siteplan = data.filter((item) => item.category === 1);
      siteplan.forEach((item, index) => {
        setTimeout(() => {
          bot.sendPhoto(chatId, item.image);
        }, index * 1000);
      });
      break;
    case "Pricelist":
      const pricelist = data.filter((item) => item.category === 2);
      pricelist.forEach((item, index) => {
        setTimeout(() => {
          bot.sendPhoto(chatId, item.image);
        }, index * 1000);
      });
      break;
    case "Type Villa":
      sendVillaTypes(chatId);
      break;
    case "Gold":
      const gold = data.filter((item) => item.category === 3);
      gold.forEach((item, index) => {
        setTimeout(() => {
          bot.sendPhoto(chatId, item.image);
        }, index * 1000);
      });
      break;
    case "Platinum":
      const platinum = data.filter((item) => item.category === 5);
      platinum.forEach((item, index) => {
        setTimeout(() => {
          bot.sendPhoto(chatId, item.image);
        }, index * 1000);
      });
      break;
    case "Diamond":
      const diamond = data.filter((item) => item.category === 4);
      diamond.forEach((item, index) => {
        setTimeout(() => {
          bot.sendPhoto(chatId, item.image);
        }, index * 1000);
      });
      break;
    case "Foto Lokasi SMC":
      bot.sendPhoto(chatId, data.image, {
        caption: "Here is the location photo!",
      });
      break;
    case "Website Sagara":
      bot.sendMessage(chatId, "Website of Sagara:");
      bot.sendPhoto(chatId, data.image, { caption: "Website Screenshot" });
      break;
    case "Copy Writing":
      bot.sendMessage(chatId, "Copywriting Details:");
      bot.sendPhoto(chatId, data.image, { caption: "Copywriting Info" });
      break;
    case "No Rek SMC":
      const noRekData = data.find((item) => item.id === "15");
      if (noRekData) {
        bot.sendPhoto(chatId, noRekData.image, { caption: "No Rekening SMC" });
      } else {
        bot.sendMessage(chatId, "Error Server");
      }
      break;
    case "G Maps SMC":
      sendGoogleMapsMessage(chatId);
      break;
    case "Gallery Marketing":
      bot.sendMessage(chatId, "Marketing Gallery:");
      break;
    case "Form Survey Mitra":
      const formSurveyMitra = data.filter((item) => item.category === 7);
      bot.sendMessage(chatId, formSurveyMitra[0].link);
      break;
    case "Form Survey Agency":
      bot.sendMessage(chatId, "Agency Survey Form:");
      break;
    case "SOP Marketing":
      bot.sendMessage(chatId, "Marketing SOP:");
      break;
    case "View SMC":
      bot.sendMessage(chatId, "SMC View:");
      break;
    case "Alur Follow Up":
      bot.sendMessage(chatId, "Follow-up Flow:");
      break;
    case "Kontak Admin":
      bot.sendMessage(chatId, "Contact Admin:");
      break;
    case "FAQ Sagara Mountain Ciwidey":
      bot.sendMessage(chatId, "FAQ of Sagara Mountain Ciwidey:");
      break;
    default:
      bot.sendMessage(chatId, "Unknown command. Type /start to begin.");
      break;
  }
});

function sendGoogleMapsMessage(chatId) {
  const message = `
    📍 Maps Lokasi Suvey
    
    Sagara Mountain Ciwidey Aset Eksklusif 
    Masa Depan
    
    https://g.co/kgs/vYL92gn
    _____
    
    Arahkan Rute Terbaik : 
    Keluar Tol Soreang ke arah Ciwidey
    
    Pintu Tol Soreang  > 
    Belok kiri di Masjid Raya Alfathu >
    Lurus melewati 2 persimpangan >
    Belok kiri di pertigaan Sadu > 
    Alun-Alun Ciwidey > 
    Belok kanan ke arah pasar Cibeureum 
    / Sukawening > 
    
    Dari Tol Soreang kurang lebih 35 menit.
  `;

  bot.sendMessage(chatId, message);
}

function sendCommandsList(chatId) {
  const keyboard = {
    keyboard: [
      [{ text: "Siteplan" }, { text: "Pricelist" }, { text: "Type Villa" }],
      [
        { text: "Foto Lokasi SMC" },
        { text: "Website Sagara" },
        { text: "Copy Writing" },
      ],
      [
        { text: "No Rek SMC" },
        { text: "G Maps SMC" },
        { text: "Gallery Marketing" },
      ],
      [
        { text: "Form Survey Mitra" },
        { text: "Form Survey Agency" },
        { text: "SOP Marketing" },
      ],
      [{ text: "View SMC" }, { text: "Alur Follow Up" }],
      [{ text: "Kontak Admin" }],
      [{ text: "FAQ Sagara Mountain Ciwidey" }],
    ],
    resize_keyboard: true,
    one_time_keyboard: true,
  };

  bot.sendMessage(chatId, "Pilih Menu", {
    reply_markup: JSON.stringify(keyboard),
  });
}

function sendVillaTypes(chatId) {
  const keyboard = {
    keyboard: [
      [{ text: "Gold" }, { text: "Platinum" }, { text: "Diamond" }],
      [{ text: "Go Back" }],
    ],
    resize_keyboard: true,
    one_time_keyboard: true,
  };

  bot.sendMessage(chatId, "Pilih Type", {
    reply_markup: JSON.stringify(keyboard),
  });
}

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

const webhookUrl = `${process.env.WEBHOOK_URL}/bot${token}`;
bot.setWebHook(webhookUrl);