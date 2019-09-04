const speed = process.env.SPEED || 'slow';



const base = 'http://10.1.10.150/';
const form_url = 'http://10.1.10.150/create_form.php';

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

  process.stdout.write("Simple bot ");
  let r1 = await bot1.simple();
  if(r1.status === 200 && r1.data.indexOf('support ID') == -1 ) {
    console.log('SUCCESS');
  } else {
    console.log('DETECTED support ID ',r1.data.substring(r1.data.indexOf('support ID')+ 16,r1.data.indexOf('support ID')+ 36));
  }

  process.stdout.write("Impersonating bot ");
  let r2 = await bot1.impersonating();
  if(r2.status === 200 && r2.data.indexOf('support ID') == -1) {
    console.log('SUCCESS');
  } else {
    console.log('DETECTED support ID ',r2.data.substring(r2.data.indexOf('support ID')+ 16,r2.data.indexOf('support ID')+ 36));
  }

  process.stdout.write("Headless browser bot ");
  let r3 = await bot2.contact_headless();
  r3 ? console.log('SUCCESS') : console.log('DETECTED');

  process.stdout.write("Browser bot ");
  let r4 = await bot2.contact_head();
  r4 ? console.log('SUCCESS') : console.log('DETECTED');

  /*
  return Promise.all([bot1.simple(),bot1.impersonating(),bot2.contact_headless(),bot2.contact_head()]).
    then((data) => {
      if(data[0].status === 200 && data[0].data.indexOf('support ID') == -1 ) {
        console.log('Simple bot SUCCESS');
      } else {
        console.log('Simple bot DETECTED');
      }

    if(data[1].status === 200 && data[1].data.indexOf('support ID') == -1) {
      console.log('Impersonating bot SUCCESS');
    } else {
      console.log('Impersonating bot DETECTED');
    }


    data[2] ? console.log('Headless browser bot SUCCESS') : console.log('Headless browser bot DETECTED');
    data[3] ? console.log('Browser bot SUCCESS') : console.log('Browser bot DETECTED');
  });*/

};



if (speed == 'slow') {
  console.log('Running slowly')
  (async () => {
    for (let i=0;i<1000000;i++) {
      process.stdout.write('\033c');
      console.log('Iteration',i);
      await main();
      await delay(5000);
    }
  })();
} else {
  console.log('Running fast')
  setInterval(main,2000);

}





