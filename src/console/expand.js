import isObject from '../validate/isobject'

var MAX_DEPTH = 100;

function expand(item, depth){
  depth = depth || 30;

  if (depth > MAX_DEPTH ) {
    console.log(item);
    return;
  }

  if (isObject(item)) {
    for (var prop in item) {
      console.log(prop, item[prop]);
      console.group(prop + ' : ' +(typeof item[prop]));
      expand(item[prop], depth + 1);
      console.groupEnd();
    }
  } else {
    console.log(item);
  }
}

function stringify(object, space) {
  return JSON.stringify(object, null, space)
}

export {
  expand,
  stringify,
} ;