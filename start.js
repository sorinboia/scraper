process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

const axios = require('axios');
const base_domain = ['https://377fd6ef-0d52-400e-ab26-210865bcaf12.access.udf.f5.com'];

const end_points = [
  {
    url:'/login.php',
    method: 'POST',
    data: {
      username: 'admin',
      password: 'password'
    }
  },
  {
    url: '/'
  }
];




const simple = async (batchNumber, user_agent) => {
  return new Promise ((res,rej) => {
    let req_array = [];

    for (let i=0;i<batchNumber;i++) {
      base_domain.forEach((base) => {
        end_points.forEach((end_point) => {
          const reqOptions = {
            method: end_point.method || 'GET',
            url:base+end_point.url,
            data: end_point.data || '',
            headers: {
              'User-Agent' : user_agent || 'axios_user_agent'
            }
          };
          req_array.push(
            axios(reqOptions)
          );
        });
      });
    }
    Promise.all(req_array)
      .then((data) => {
        res(data);
      })
      .catch((err) => {
        rej(err);
      });

  });
};





const main = async () => {

  for (let j=0; j<100000;j++) {
    console.log('Batch',j);
    await simple(50).catch((err) => {
      console.log(err.code);
    });

    await simple(20,'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)').catch((err) => {
      console.log(err);
    });
  }

};

main();



