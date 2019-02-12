/**
 * 首字母大写
 * @param {*} str 
 */
function firstUpperCase(str) {
  str = str || '';
  str.toLowerCase().replace(/( |^)[a-z]/g, L => L.toUpperCase());
  return str;
}

module.exports = {
  firstUpperCase,
};