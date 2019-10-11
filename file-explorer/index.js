var fs = require('fs');
var stdout = process.stdout;
var stdin = process.stdin;

console.log('  \033[31m No files to show!\033[39m\n')
// 可以异步的读取文件和文件夹
fs.readdir(__dirname, function(err, files) {
    console.log('');
    if (!files.length) {
        return console.log('    \033[31m No files to show!\033[39m\n') // 红色
    }
    console.log('   Select which file or directory you want to see\n');

    var stats = [];

    function file(i) {
        var filename = files[i];

        fs.stat(__dirname + '/' + filename, function(err, stat) {
            stats[i] = stat;
            if (stat.isDirectory()) {
                console.log('   '+i+'   \033[36m' + filename + '/\033[39m');
            } else {
                console.log('   '+i+'   \033[90m' + filename + '/\033[39m')
            }

            i++;
            if (i == files.length) {
                read()
            } else {
                file(i)
            }
        })
    }

    function read() {
        console.log('');
        stdout.write('  \033[33mEnter your choice: \033[39m');
        stdin.resume();
        stdin.setEncoding('utf8')
        stdin.on('data', option)
    }

    // 当用户输入时被调用
    function option(data) {
        var filename = files[Number(data)]
        if (!files[Number(data)]) {
            stdout.write('  \033[31mEnter your choice: \033[39m')
        } else {
            stdin.pause();
            if (stats[Number(data)].isDirectory()) {
                fs.readdir(__dirname + '/' + filename, function(err, files) {
                    console.log('');
                    console.log(`   (${files.length} files)`)
                    files.forEach(function(file) {
                        console.log('   -   ' + file)
                    })
                })
            } else {
                // 异步读取
                fs.readFile(__dirname + '/' + filename, 'utf-8', function(err, data) {
                    console.log('');
                    console.log('\33[90m' + data.replace(/(.*)/g, '     $1') + '\033[39m') // 匹配除换行符 \n 之外的任何单字符
                })
            }
        }
    }

    file(0);
})
