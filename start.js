process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
const axios = require('axios');

const bot_req = async (user_agent) => {
  return new Promise ((res,rej) => {
    const reqOptions = {
      method: end_point.method || 'GET',
      url:base+end_point.url,
      data: end_point.data || '',
      headers: {
        'User-Agent' : user_agent || 'axios_user_agent'
      }
    };
    axios(reqOptions)
      .then((data) => {
        res(data);
      })


  });
};



class Bot {
  constructor(url) {
    this.url = url;
  }

  async simple() {
    return await bot_req();
  }

  async impersonating () {
    return await bot_req('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)');
  }
}

module.exports = {
  simple,
  impersonating
};



