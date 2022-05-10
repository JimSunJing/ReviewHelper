const axios =  require('axios');
require('dotenv').config();
const {randomSelect, getNotionProperty} = require('./utils')

// envirment val
const DATABASE_ID = process.env.DATABASE_ID;
const TOKEN = process.env.TOKEN;
const BASE_URL = "https://api.notion.com/";

// query settings
// need to think about how to adjust it 
const QUERY_NUM = 2;
const QUERY_KEYS = ['Name', 'Intro', 'Created'];

(async () => {
  // Query
  let queryURL = `${BASE_URL}v1/databases/${DATABASE_ID}/query`;

  // set notion API integration auth header
  let headers = {
    Authorization: `Bearer ${TOKEN}`,
    "Notion-Version": "2022-02-22",
    "Content-Type": "application/json"
  };

  let sorts = [{
    "property": "Created",
    "direction": "descending"
  }]

  // create a axios session
  let reqInstance = axios.create({
    headers
  })

  // Database Query POST Request
  // see https://developers.notion.com/reference/post-database-query
  let results;
  results = await reqInstance.post(
    queryURL,
    {sorts}
  ).then((response) => {
    // console.log(response.data);
    let queryRes = [];
    if (typeof response.data.results !== 'undefined'){
      for (let i = 0; i < QUERY_NUM; i++) {
        // get random selected item from query
        let t = randomSelect(response.data.results);
        // extract wanted values
        QUERY_KEYS.forEach(key => {
          // console.log(`(${i}, ${key}), key type:${typeof key}`);
          if (queryRes[i] === undefined) queryRes[i] = {};
          queryRes[i][key] = getNotionProperty(t, key);
        });
        // add url in every item
        queryRes[i].url = t.url;
      }
    }
    // console.log(queryRes);
    return queryRes;
  }).catch((error) => {
    console.log(error);
    process.exit(1);
  });

  // generate email content
  // console.log(results);
  // set output for other jobs
  // see https://docs.github.com/en/actions/using-jobs/defining-outputs-for-jobs
  console.log(`::set-output name=message::`+genMail(results));
  // console.log('Wanted Review Reminder Content Generated.');
})();

function genMail(ResultArray) {
  let message = '';
  // This Email message will be sent using https://github.com/dawidd6/action-send-mail
  message += '# It\'s Time to Review Your Notion Notes!';
  for (let i = 0; i < ResultArray.length; i++) {
    const note = ResultArray[i];
    // console.log(note);
    message += `\\n${i+1}. `
    for (k in note) {
      message += `${k}: ${note[k]}\\n`;
    }
  }
  return message;
}