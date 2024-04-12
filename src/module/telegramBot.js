const dotenv = require("dotenv");
const TelegramBot = require("node-telegram-bot-api");
const data = require("../config/data");

dotenv.config();

const token = process.env.TOKEN;
var bot;

if (process.env.NODE_ENV === "production") {
  bot = new TelegramBot(token);
  bot.setWebHook(process.env.WEBHOOK_URL + bot.token);
  console.log("**** BOT initiated ***** ");
} else {
  bot = new TelegramBot(token, { polling: true });
}

console.log(`Bot started in the ${process.env.NODE_ENV} mode`);

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
      sendPhotosByCategory(chatId, 1);
      break;
    case "Pricelist":
      sendPhotosByCategory(chatId, 2);
      break;
    case "Type Villa":
      sendVillaTypes(chatId);
      break;
    case "Gold":
      sendPhotosByCategory(chatId, 3);
      break;
    case "Platinum":
      sendPhotosByCategory(chatId, 5);
      break;
    case "Diamond":
      sendPhotosByCategory(chatId, 4);
      break;
    case "Foto Lokasi SMC":
      bot.sendPhoto(chatId, data.image, {
        caption: "Here is the location photo!",
      });
      break;
    case "Website Sagara":
      bot.sendMessage(chatId, "Website of Sagara:");
      break;
    case "Copy Writing":
      bot.sendMessage(chatId, "Copywriting Details:");
      break;
    case "No Rek SMC":
      sendPhotosByCategory(chatId, 7);
      break;
    case "G Maps SMC":
      sendGoogleMapsMessage(chatId);
      break;
    case "Gallery Marketing":
      bot.sendMessage(chatId, "Marketing Gallery:");
      break;
    case "Form Survey Mitra":
      const formSurveyMitra = data.filter((item) => item.category === 6);
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

function sendPhotosByCategory(chatId, category) {
  const filteredData = data.filter((item) => item.category === category);
  filteredData.forEach((item, index) => {
    bot.sendPhoto(chatId, item.image);
  });
}

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

module.exports = bot;
