const puppeteer = require("puppeteer");
const uuid = require("uuid");

//TechniAfrica.com
const scrapeSiteData2 = async () => {
  try {
    let dataSet = [];
    const url = "https://www.techinafrica.com";
    console.log("starting...");
    console.log(`scraping ${url}`);
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.goto(url);
    await page.waitForSelector("h3.g1-gamma.g1-gamma-1st.entry-title > a");

    const pageLinksSelector = "h3.g1-gamma.g1-gamma-1st.entry-title > a";

    //return all link card on page
    const pageLinks = await page.evaluate((pageLinksSelector) => {
      let links = Array.from(document.querySelectorAll(pageLinksSelector));
      let link = links.map((link) => link.href);
      return link;
    }, pageLinksSelector);
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
        id: uuid.v4(),
        title: await articleTitleText,
        imageUrl: await articleImageLink,
        body: articleBodyText,
      };
      dataSet.push(techniAfricaData);
    }
    debugger;
    //close browser after scraping
    await browser.close();
    console.log("scraping is done for techInAfricaNews");
    return dataSet;
  } catch (error) {
    console.log(error);
  }
};

module.exports = scrapeSiteData2;
