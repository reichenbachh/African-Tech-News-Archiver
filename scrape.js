const puppeteer = require("puppeteer");
const fs = require("fs");

//TechniAfrica.com
const scrapeSiteData2 = async () => {
  try {
    console.log("starting...");
    const url = "https://www.techinafrica.com/";
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector(".entry-body");

    const pageLinksSelector = "h3.g1-gamma.g1-gamma-1st.entry-title > a";

    const pageLinks = await page.evaluate((pageLinksSelector) => {
      let links = Array.from(document.querySelectorAll(pageLinksSelector));
      let link = links.map((link) => link.href);
      return link;
    }, pageLinksSelector);

    let dataSet = [];
    console.log("scraping blog links");
    //loopo through links
    for (let newsPage of pageLinks) {
      await page.goto(`${newsPage}`);
      let articleTitle = await page.waitForSelector(
        ".entry-header.entry-header-01"
      );
      let articleImage = await page.waitForSelector(
        ".g1-img-wrap.mashsb-micro-wrapper"
      );
      let articleBody = await page.waitForSelector(
        ".g1-content-narrow.g1-typography-xl.entry-content"
      );
      const articleTitleText = articleTitle.$eval("h1", (h1) => h1.textContent);
      const articleImageLink = articleImage.$eval("img", (img) =>
        img.getAttribute("data-src")
      );
      const articleBodyText = await page.evaluate(
        (articleBody) => articleBody.innerText,
        articleBody
      );

      let techniAfricaData = {
        title: await articleTitleText,
        imageUrl: await articleImageLink,
        body: articleBodyText,
      };
      dataSet.push(techniAfricaData);
    }
    debugger;
    //close browser after scraping
    await browser.close();
    console.log("scraping is done");

    //get full date and time
    let today = new Date();
    let fullDate =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    let fullTime =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let currentDate = `${fullDate} / ${fullTime}`;
    let dataObject = { [currentDate]: { ...dataSet } };

    //store data in json file
    fs.writeFile(
      "./_data/TechniAfric.json",
      JSON.stringify(dataObject),
      (err, data) => {
        if (err) {
          console.log(err);
        }
        console.log("saved to file");
      }
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = scrapeSiteData2;
