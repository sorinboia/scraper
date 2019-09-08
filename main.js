const speed = process.env.SPEED || 'slow';

let colors = require('colors');

const base = 'http://10.1.10.150/';
const form_url = 'http://10.1.10.150/create_form.php';


//const base = 'https://9eed511b-d348-4251-b2aa-33f5fdf29264.access.udf.f5.com/';
//const form_url = 'https://9eed511b-d348-4251-b2aa-33f5fdf29264.access.udf.f5.com/create_form.php';


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
  console.log('Bot Type\t\t\t\tStatus'.grey);
  process.stdout.write("Simple bot\t\t\t\t".yellow);
  let r1 = await bot1.simple();
  if(r1.status === 200 && r1.data.indexOf('support ID') == -1 ) {
    console.log('SUCCESS'.green);

  } else {
    console.log('DETECTED'.red);
  }

  process.stdout.write("Impersonating bot\t\t\t".white);
  let r2 = await bot1.impersonating();
  if(r2.status === 200 && r2.data.indexOf('support ID') == -1) {
    console.log('SUCCESS'.green);
  } else {
    console.log('DETECTED'.red);
  }

  process.stdout.write("Headless browser bot\t\t\t".magenta);
  let r3 = await bot2.contact_headless();
  r3 ? console.log('SUCCESS'.green) : console.log('DETECTED'.red);

  process.stdout.write("Browser bot\t\t\t\t".cyan);
  let r4 = await bot2.contact_head();
  r4 ? console.log('SUCCESS'.green) : console.log('DETECTED'.red);

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
  console.log('Running slowly');
  (async () => {
    for (let i=0;i<1000000;i++) {
      process.stdout.write('\033c');
      //console.log('Iteration\t\t\t',i);
      await main();
      await delay(5000);
    }
  })();
} else {
  console.log('Running fast');
  setInterval(main, 5000);

}