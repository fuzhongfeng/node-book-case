var request = require('superagent')

module.exports = function search(query, fn) {
    // request.get('https://www.baidu.com/s') // 原有twitter地址已经废弃, get 方法也已经废弃
    // .data({wd: query})
    // .end(function(res) {
    //     if (res.body) {
    //         return fn(null, res.body)
    //     }
    //     fn(new Error('Bad request'))
    // })

    // 返回假数据
    fn(null, [{from_user: 'fu', text: 'fu'},{from_user: 'zhong', text: 'zhong'},{from_user: 'feng', text: 'feng'}])
}