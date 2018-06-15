const Redis = require('ioredis');
const redis = new Redis();

(async function generateIDsToRedis() {
  for(let i = 0;i<450;i++){
    const arr = new Array(10000);
    for(let j = 0;j<10000;j++){
      arr.push(i*10000+j);
    }
    await redis.sadd('acfun_ids_generate',...arr);
  }
})()
  .then(r => {
    console.log('done')
  })
  .catch(e => {
  });










