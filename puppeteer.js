const puppeteer = require('puppeteer');

const start_url = 'http://10.1.10.150/';



(async () => {


  for (let i=0; i<1;i++) {
    const browser = await puppeteer.launch({
      headless: false,
      //slowMo: 1000
    });
    const page = await browser.newPage();
    await page.goto(start_url, {waitUntil: 'networkidle2'});
    await page.click('a[href="trading/login.php"]', {waitUntil: 'networkidle2'});
    //await page.screenshot({path: 'example.png'});
    await page.waitForSelector('input[name="username"]');
    await page.type('input[name="username"]', 'admin', {delay: 200});
    await page.type('input[name="password"]', 'iloveblue', {delay: 200});
    await page.click('button');
    //await browser.close();
  }
})();