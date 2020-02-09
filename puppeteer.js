const puppeteer = require('puppeteer');

let start_url = 'https://arcadia.test.sorinb.cloud/';
const ip = process.env.IP;
const pace = 150;


function delay_between(min=2000, max=4000) {
  return Math.random() * (max - min) + min;
}


if (ip) {
  start_url = 'http://' + ip + '/';
}

function delay(time) {
  return new Promise(function(resolve) {
    setTimeout(resolve, time)
  });
}

(async () => {


  for (let i=0; i<99999999999;i++) {
    console.log('Iteration ',i+1)
    const browser = await puppeteer.launch({
      headless: true,
      defaultViewport: null,
      executablePath: '/usr/bin/chromium-browser',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
      //slowMo: 1000
    });
    const page = await browser.newPage();
    await page.goto(start_url, {waitUntil: 'networkidle2'});
    await page.click('a[href="trading/login.php"]', {waitUntil: 'networkidle2'});
    await page.waitForSelector('input[name="username"]');
    await page.type('input[name="username"]', 'admin', {delay: pace});
    await page.type('input[name="password"]', 'iloveblue', {delay: pace});
    await page.click('button');

    //Buy stocks
    await page.waitForSelector('#buy_stocks_modal', {visible:true});
    await delay(delay_between());

    await page.click('#buy_stocks_modal');
    await page.waitForSelector('#stock_selected', {visible:true});
    await page.click('#stock_selected');
    await page.select('#stock_selected', 'f5');
    await page.type('#stock_qty', '258', {delay: pace});
    await page.click('#buy_owned_qty');
    await page.click('#buy_stocks_button');
    await page.waitForSelector('#result_button_stocks', {visible:true});
    await delay(delay_between());
    await page.click('#result_button_stocks');



    //Sell stocks
    await page.waitForSelector('button[data-target="#sell_stocks"]', {visible:true});
    await delay(delay_between());
    await page.click('button[data-target="#sell_stocks"]');

    await page.waitForSelector('#sell_stock_selected', {visible:true});
    await page.click('#sell_stock_selected');

    await page.select('#sell_stock_selected', 'f5');
    await page.type('#sell_stock_qty', '258', {delay: pace});

    await page.click('#sell_owned_qty');

    await page.click('#sell_stocks_button');
    await page.waitForSelector('#result_button_stocks', {visible:true});
    await delay(delay_between());
    await page.click('#result_button_stocks');

    await browser.close();
  }
})().catch(
    (e) => {
      console.log(e);
      process.exit(1);
    }
) ;