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
  let type = prop.type;
  switch (type) {
    case 'title':
      return prop.title[0].plain_text;
      break;
    case 'rich_text':
      return prop.rich_text[0] === undefined 
        ? `"${String(colName)}" is empty` : prop.rich_text[0].plain_text;
      break
  
    default:
      break;
  }
}

module.exports = {
  randomSelect,
  getNotionProperty
}