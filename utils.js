const { floor, random } = Math;

// 输入数组并随机返回
function randomSelect(arr) {
  // 非空判断
  if (typeof arr === 'undefined') {
    console.log(arr);
    return "no data"
  }
  let len = arr.length;
  let choice = floor(random()*len);
  // console.log(`len=${len} choice=${choice}`);
  return arr[choice];
}

// obj: Notion Database Query results Object
// colName: the wanted column name
function getNotionProperty(obj, colName) {
  // 非空判断
  if (typeof obj === 'undefined') {
    console.log(obj);
    return "no data"
  }
  let prop;
  if (typeof obj.properties === 'undefined'){
    return 'No properties';
  } else {
    prop = obj.properties[String(colName)];
    // console.log(`get prop! ${prop}`);
  }
  switch (prop.type) {
    case 'title':
      return prop.title[0].plain_text;
      break;
    case 'rich_text':
      return prop.rich_text[0] === undefined 
        ? `"${String(colName)}" is empty` : prop.rich_text[0].plain_text;
      break
    case 'checkbox':
      return prop.checkbox === true;
      break
    case 'select':
      return prop.select === undefined 
        ? `"${String(colName)}" is empty`
        : prop.select.name;
      break
    case 'created_time':
      return prop.created_time;
      break
    case 'url':
      return prop.url === undefined || prop.url === null
        ? 'URL property is empty' : prop.url
      break
    default:
      break;
  }
}

module.exports = {
  randomSelect,
  getNotionProperty
}