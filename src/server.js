const app = require('./app');
const config = require('./config/environments');

const main = async () =>{
  await app.listen(config.PORT)
  console.log(`Application running on: http://localhost:${config.PORT}`);
}

main();