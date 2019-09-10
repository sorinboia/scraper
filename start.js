process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
const axios = require('axios');

const bot_req = async ({user_agent,url,data}) => {
  return new Promise ((res,rej) => {
    const reqOptions = {
      method: data ? 'POST' : 'GET',
      url:url,
      data: data || '',
      headers: {
        'User-Agent' : user_agent || 'axios_user_agent'
      },
      timeout: 5000
    };
    axios(reqOptions)
      .then((data) => {
        res(data);
      })


  });
};



class Bot {
  constructor({url,data}) {
    this.url = url;
    this.data = data;

  }

  async simple() {
    const options = {
      url: this.url,
      data: this.data,
    };
    return await bot_req(options);
  }

  async impersonating () {
    const options = {
      url: this.url,
      data: this.data,
      user_agent: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
    };
    return await bot_req(options);
  }
}

module.exports = Bot;



