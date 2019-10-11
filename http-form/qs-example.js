var queryString = require('querystring')
// querystring
console.log(queryString.parse('name=fuzhongfeng')); // { name: 'fuzhongfeng' }
console.log(queryString.parse('q=zhongfeng+fu')); // { q: 'zhongfeng fu' }