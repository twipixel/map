// https://github.com/jonschlinkert/isobject/blob/master/index.js
export default function isObject(val) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
};