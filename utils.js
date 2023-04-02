const { floor, random } = Math;

// 输入数组并随机返回
function randomSelect(arr) {
  // 非空判断
  if (typeof arr === "undefined") {
    console.log(arr);
    return "no data";
  }
  let len = arr.length;
  let choice = floor(random() * len);
  // console.log(`len=${len} choice=${choice}`);
  return arr[choice];
}

// obj: Notion Database Query results Object
// colName: the wanted column name
function getNotionProperty(obj, colName) {
  // 非空判断
  if (typeof obj === "undefined") {
    console.log(obj);
    return "no data";
  }
  let prop;
  if (typeof obj.properties === "undefined") {
    return "No properties";
  } else {
    prop = obj.properties[String(colName)];
    // console.log(`get prop! ${prop}`);
  }
  switch (prop.type) {
    case "title":
      return prop.title
        .map((item) => item.plain_text.replace(/\n/g, ""))
        .join(" ");
      break;
    case "rich_text":
      const texts = prop.rich_text
        .map((item) => item.plain_text.replace(/\n/g, ""))
        .join(" ");
      return texts ? `'${String(colName)}' is empty` : texts;
      break;
    case "checkbox":
      return prop.checkbox === true;
      break;
    case "select":
      return prop.select === undefined
        ? `'${String(colName)}'\(select\) is empty`
        : prop.select.name;
      break;
    case "created_time":
      return prop.created_time;
      break;
    case "url":
      return prop.url === undefined || prop.url === null
        ? `'${String(colName)}'\(url\) is empty`
        : prop.url;
      break;
    case "date":
      return prop.date === null
        ? `'${String(colName)}'\(date\) is empty`
        : prop.date;
      break;
    case "number":
      return prop.number;
      break;
    case "phone":
      return prop.phone_number;
      break;
    case "email":
      return prop.email;
      break;
    case "multi_select":
      let names = [];
      if (prop.multi_select === undefined || prop.multi_select.length === 0) {
        return `'${String(colName)}'\(date\) is empty`;
      } else {
        for (let i = 0; i < prop.multi_select.length; i++) {
          const select = prop.multi_select[i];
          names.push(select.name);
        }
      }
      return names;
      break;

    default:
      break;
  }
}

module.exports = {
  randomSelect,
  getNotionProperty,
};
