const axios =  require('axios');
require('dotenv').config();
const {randomSelect, getNotionProperty} = require('./utils')

// envirment val
const DATABASE_ID = process.env.DATABASE_ID;
const TOKEN = process.env.TOKEN;
const BASE_URL = "https://api.notion.com/";

// query settings
// need to think about how to adjust it 
const QUERY_NUM = 2
const QUERY_KEYS = ['Name', 'Intro', 'Created']

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
reqInstance.post(
  queryURL,
  {sorts}
).then((response) => {
  // console.log(response.data);
  let randRes = [];
  if (typeof response.data.results !== 'undefined'){
    for (let i = 0; i < QUERY_NUM; i++) {
      // get random selected item from query
      let t = randomSelect(response.data.results);
      // extract wanted values
      QUERY_KEYS.forEach(key => {
        console.log(`(${i}, ${key}), key type:${typeof key}`);
        randRes[i] === undefined ? randRes[i] = {} : 2+2 === 5
        randRes[i][key] = getNotionProperty(t, key);
      });
      // add url in every item
      randRes[i].url = t.url;
    }
  }
  console.log(randRes);
}).catch((error) => {
  console.log(error);
})