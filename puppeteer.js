const puppeteer = require('puppeteer');

let start_url = 'https://960a0cdb-5ca5-494e-9229-7d9cc1b77c44.access.udf.f5.com/';
const ip = process.env.IP;

if (ip) {
  start_url = 'http://' + ip + '/';
}


function delay(time) {
  return new Promise(function(resolve) {
    setTimeout(resolve, time)
  });
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
    await page.type('input[name="username"]', 'admin', {delay: 1});
    await page.type('input[name="password"]', 'iloveblue', {delay: 1});
    await page.click('button');
    await page.waitForSelector('#buy_stocks_modal', {visible:true});
    await delay(2000);
    await page.click('#buy_stocks_modal');
    await page.waitForSelector('#stock_selected', {visible:true});
    await page.click('#stock_selected');
    await page.select('#stock_selected', 'f5');
    await page.type('#stock_qty', '258', {delay: 1});




    //await browser.close();
  }
})();