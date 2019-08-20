const puppeteer = require('puppeteer');

(async () => {


  for (let i=0; i<1;i++) {
    const browser = await puppeteer.launch({
      headless: false,
      //slowMo: 1000
    });
    const page = await browser.newPage();
    await page.goto('https://377fd6ef-0d52-400e-ab26-210865bcaf12.access.udf.f5.com/login.php', {waitUntil: 'networkidle2'});
    //await page.screenshot({path: 'example.png'});
    await page.type('input[name="username"]', 'admin', {delay: 50});
    await page.type('input[name="password"]', 'password', {delay: 50});
    await page.click('input[name="Login"]');
    //await browser.close();
  }
})();