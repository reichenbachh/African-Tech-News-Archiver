const express = require("express");
const admin = require("firebase-admin");
const techInAfricaScrape = require("./scrape");
const techAficaSrape = require("./TechAfricaScraper");
const serviceAccount = require("./afritechinfo-b1f58-firebase-adminsdk-41c3j-852afd2fc8.json");
const cron = require("node-cron");

const app = express();

cron.schedule("0 0 * * *", async () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  //create instance of firebase database
  const db = admin.firestore();

  try {
    (async () => {
      const techInAfricaData = await techInAfricaScrape();
      const techAfricaData = await techAficaSrape();
      const data = { ...techInAfricaData, ...techAfricaData };
      await db.collection("scraped_tech_news").doc("today").set(data);
      return console.log("data persisted");
    })();
  } catch (error) {
    console.log(error);
  }
});

app.listen(5000);
