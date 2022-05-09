const axios =  require('axios');
require('dotenv').config();
const {randomSelect, getNotionProperty} = require('./utils')

// envirment val
const DATABASE_ID = process.env.DATABASE_ID;
const TOKEN = process.env.TOKEN;
const BASE_URL = "https://api.notion.com/";

// Query
let queryURL = `${BASE_URL}v1/databases/${DATABASE_ID}/query`;

let headers = {
  Authorization: `Bearer ${TOKEN}`,
  "Notion-Version": "2022-02-22",
  "Content-Type": "application/json"
};

let sorts = [{
  "property": "Created",
  "direction": "descending"
}]

// create axios session
let reqInstance = axios.create({
  headers
})

reqInstance.post(
  queryURL,
  {sorts}
).then((response) => {
  // console.log(response.data);
  // 随机选择 query 返回列表中的 page
  let randRes;
  if (typeof response.data.results !== 'undefined'){
    randRes = randomSelect(response.data.results)
  }
  // console.log(randRes);
  // 查看 page 的标题
  console.log(getNotionProperty(randRes, 'Name'));
  console.log(getNotionProperty(randRes, 'Intro'));
  console.log(randRes.url);
}).catch((error) => {
  console.log(error);
})