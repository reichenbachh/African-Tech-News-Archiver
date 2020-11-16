const express = require("express");
const admin = require("firebase-admin");
const techInAfricaScrape = require("./scrape");
const techAfricaScrape = require("./TechAfricaScraper");
const serviceAccount = require("./afritechinfo-b1f58-firebase-adminsdk-41c3j-852afd2fc8.json");
const cron = require("node-cron");
const date = require("./date");
const lodash = require("lodash");

const app = express();
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

//create instance of firebase database
const db = admin.firestore();

//"0 0 * * *"
cron.schedule("*/10 * * * *", async () => {
  try {
    const techAfricaData = await techAfricaScrape();
    const techInAfricaData = await techInAfricaScrape();
    const dateToday = date();
    let mergedData = lodash.merge(techAfricaData, techInAfricaData);
    const data = { [dateToday]: mergedData };
    await db.collection("scraped_tech_news").doc("today").set(data);
    return console.log("data persisted");
  } catch (error) {
    console.log(error);
  }
});

app.listen(5000, () => {
  console.log("server running  at port 5000");
});
