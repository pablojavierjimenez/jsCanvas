

const { parse } = require('url');

var url ='https://dev.to/gmartigny/why-the-js-ecosystem-is-awesome-48nl';

var final = parse(url, true);
final.levels = final.path.split('/');
final.levels.shift();
console.log(final);
