const puppeteer = require('puppeteer');

function delay(time) {
  return new Promise(function(resolve) {
    setTimeout(resolve, time)
  });
}


class Puppet {
  constructor({base_url}) {
    this.base_url = base_url;
    this.pace = 10;
  }

  async contact_form({headless}) {
    const browser = await puppeteer.launch({
      headless: headless || false,
      defaultViewport: null,
      //slowMo: 1000
    });
    const page = await browser.newPage();
    await page.goto(this.base_url, {waitUntil: 'networkidle2'});
    //await delay(2000);

    if ((await page.evaluate(() => document.body.innerHTML)).indexOf('support ID') !== -1 ) {
      await browser.close();
      return 0;
    }

    await page.click('a[href="contact.html"]').catch(async (err) => {
      await browser.close();
      return 0;
    });
    await delay(2000);
    if ((await page.evaluate(() => document.body.innerHTML)).indexOf('support ID') !== -1 ) {
      await browser.close();
      return 0;
    }
    await page.waitForSelector('input[name="fname"]');
    await page.type('input[name="fname"]', 'Smart', {delay: this.pace});
    await page.type('input[name="lname"]', 'Bot', {delay: this.pace});
    await page.type('input[name="email"]', 'smart_bot@bot.com', {delay: this.pace});
    await page.type('textarea[name="message"]', 'You will not defeat me', {delay: this.pace});
    await page.click('input[value="Send Message"]');
    await delay(2000);
    await browser.close();
    return 1;
  }

  async contact_head() {
    return (await this.contact_form({}));
  }

  async contact_headless() {
    return (await this.contact_form({headless:true}));
  }

}

module.exports = Puppet;

/*const test = new Puppet({
  base_url: 'https://87fdcadf-6418-4937-9102-5d3329b50b17.access.udf.f5.com/'
});
(async () => {
  await test.contact_form();
})();*/