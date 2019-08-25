const puppeteer = require('puppeteer');

let start_url = 'https://960a0cdb-5ca5-494e-9229-7d9cc1b77c44.access.udf.f5.com/';
const ip = process.env.IP;

if (ip) {
  start_url = 'http://' + ip + '/';
}

(async () => {


  for (let i=0; i<1;i++) {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      //slowMo: 1000
    });
    const page = await browser.newPage();
    await page.goto(start_url, {waitUntil: 'networkidle2'});
    await page.click('a[href="trading/login.php"]', {waitUntil: 'networkidle2'});
    //await page.screenshot({path: 'example.png'});
    await page.waitForSelector('input[name="username"]');
    await page.type('input[name="username"]', 'admin', {delay: 200});
    await page.type('input[name="password"]', 'iloveblue', {delay: 200});
    await page.click('.buy_stocks_modal');
    //await browser.close();
  }
})();