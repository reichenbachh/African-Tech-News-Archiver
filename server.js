const express = require("express");
const admin = require("firebase-admin");
const techInAfricaScrape = require("./scrape");
const techAfricaScrape = require("./TechAfricaScraper");
const serviceAccount = require("./afritechinfo-b1f58-firebase-adminsdk-41c3j-852afd2fc8.json");
const cron = require("node-cron");
const date = require("./date");
const lodash = require("lodash");
const { merge } = require("lodash");

const app = express();
const ip = process.env.IP || "0.0.0.0";
const port = process.env.PORT || 8080;
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.get("/", (req, res) => {
  res.status(200).json({
    sucess: false,
    message: "web scrpaper running",
  });
});

//create instance of firebase database
const db = admin.firestore();

//loop and persist all  page objects to firestore database
const persistData = async (dataSequence, createdAt) => {
  const dateData = {
    createdAt,
  };
  try {
    let docNum = 0;
    for (const data of dataSequence) {
      await db
        .collection("scraped_tech_news")
        .doc(`${docNum}`)
        .set(data)
        .then((data) => {
          docNum++;
          return "done";
        });
    }
    await db
      .collection("time_scraped")
      .doc(`createdAt`)
      .set(dateData)
      .then((data) => {
        return console.log("completed");
      });
    console.log("data persisted");
  } catch (error) {
    console.log(error);
  }
};

//remove duplicates
const removeDuplicate = async (dataSequence) => {
  dataSequence = dataSequence.filter(
    (thing, index, self) =>
      index === self.findIndex((t) => t.title === thing.title)
  );
  return dataSequence;
};

//("0 0 * * *");
cron.schedule("*/10 * * * *", async () => {
  try {
    const techAfricaData = await techAfricaScrape();
    const techInAfricaData = await techInAfricaScrape();
    const dateToday = date();
    let dataArray = [...techAfricaData, ...techInAfricaData];
    dataArray = await removeDuplicate(dataArray);
    await persistData(dataArray, dateToday);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, ip, () => {
  console.log("server running");
});
