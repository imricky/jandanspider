const axios = require('axios');
const cheerio = require('cheerio');

// async function GetTopTopic(){
//   axios({
//     method:'get',
//     url:'https://www.v2ex.com/',
//   })
//       .then(function (response) {
//         const $ = cheerio.load(response.data)
//         let TopTopic = [];
//         $('.item_hot_topic_title').each((i,el)=>{
//           var link = $(el).find('a').attr('href');
//           var title = $(el).find('a').text();
//           TopTopic.push({
//             link,
//             title
//           })
//
//         })
//         return TopTopic;
//       })
//       .catch(e=>{
//         next(e)
//       });
// }


async function GetTopTopic() {
  try {
    const response = await axios.get('https://www.v2ex.com/');
    const $ = cheerio.load(response.data)
    let TopTopic = [];
    $('.item_hot_topic_title').each((i,el)=>{
      var link = $(el).find('a').attr('href');
      var title = $(el).find('a').text();
      TopTopic.push({
        link,
        title
      })

    })
    return TopTopic;
  } catch (error) {
    console.error(error);
  }
}


module.exports = {
  GetTopTopic
}



