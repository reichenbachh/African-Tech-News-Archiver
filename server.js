const admin = require("firebase-admin");
const fs = require("fs");
const techInAfricaScrape = require("./scrape");
const techAficaSrape = require("./TechAfricaScraper");

const serviceAccount = require("./afritechinfo-b1f58-firebase-adminsdk-41c3j-852afd2fc8.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

//create instance of firebase database
const db = admin.firestore();

(async () => {
  await techInAfricaScrape();
  await techAficaSrape();
  try {
    fs.readFile("./_data/TechniAfric.json", "utf-8", async (err, data) => {
      if (err) {
        console.log(err);
      }
      let scrapedData = JSON.parse(data);
      await db.collection("scraped_tech_news").doc("today").set(scrapedData);
      return console.log("data persisted");
    });
    fs.readFile("./_data/TechAfrica.json", "utf-8", async (err, data) => {
      if (err) {
        console.log(err);
      }
      let scrapedData = JSON.parse(data);
      await db
        .collection("scraped_tech_news")
        .doc("today")
        .set(scrapedData, { merge: true });
      return console.log("data persisted");
    });
  } catch (error) {
    console.log(errors);
  }
})();
