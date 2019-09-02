const base = 'https://87fdcadf-6418-4937-9102-5d3329b50b17.access.udf.f5.com/';
const form_url = 'https://87fdcadf-6418-4937-9102-5d3329b50b17.access.udf.f5.com/create_form.php';

const bot1 = new (require('./start'))({
  url:form_url,
  data: {
    fname: 'bot1',
    lname: 'bot1_1',
    email: 'bot1@bot1.com',
    message: 'I am a bad bot'
  }
});

const bot2 = new (require('./puppet'))({
  base_url: base
});



function delay(time) {
  return new Promise(function(resolve) {
    setTimeout(resolve, time)
  });
}


const main = async () => {
  //process.stdout.write('\033c');

  Promise.all([bot1.simple(),bot1.impersonating(),bot2.contact_head()]).
    then((data) => {
      if(data[0].status === 200 && data[0].data.indexOf('support ID') == -1 ) {
        console.log('Simple bot successful');
      } else {
        console.log('Simple bot failed');
      }

    if(data[1].status === 200 && data[1].data.indexOf('support ID') == -1) {
      console.log('Impersonating bot successful');
    } else {
      console.log('Impersonating bot DETECTED');
    }

    console.log('Less',data[2]);
    console.log('Head',data[3]);


  });

};


(async () => {
  for (let i=0;i<1000000;i++) {
    await main();
  }
})();


