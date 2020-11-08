const puppeteer = require("puppeteer");
const fs = require("fs");

try {
  const scrapeSiteData = async () => {
    let dataSet = [];
    try {
      console.log("starting...");
      let url = "https://www.techafricanews.com/";
      let pageNum = 2;
      for (let i = 0; i < 3; i++) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);
        await page.waitForSelector(".post-thumbnail.clearfix > a");

        const pageLinksSelector = ".post-thumbnail.clearfix > a";
        const pageLinks = await page.evaluate((pageLinksSelector) => {
          let links = Array.from(document.querySelectorAll(pageLinksSelector));
          let link = links.map((link) => link.href);
          return link;
        }, pageLinksSelector);

        console.log("scraping blog links");
        for (newsPage of pageLinks) {
          await page.goto(`${newsPage}`);
          let articleTitle = await page.waitForSelector(".post-content > h1");
          let articleBody = await page.waitForSelector(".post-content");
          let articleImage = await page.waitForSelector(
            ".wp-block-image.thumb > img"
          );

          const articleTitleText = await page.evaluate(
            (articleTitle) => articleTitle.innerText,
            articleTitle
          );
          const articleBodyText = await page.evaluate(
            (articleBody) => articleBody.innerText,
            articleBody
          );
          const articleImageLink = await page.evaluate(
            (articleImage) => articleImage.getAttribute("src"),
            articleImage
          );

          let data = {
            title: articleTitleText,
            imageUrl: articleImageLink,
            body: articleBodyText,
          };
          dataSet.push(data);
        }
        await browser.close();
        url = `${url}page/${pageNum}`;
        pageNum++;
      }
    } catch (error) {
      console.log(error);
    }

    console.log("scraping done");
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

    return dataObject;
  };
} catch (error) {
  console.log(error);
}

module.exports = scrapeSiteData;
