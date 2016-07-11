var childProcess = require('child_process');

var p = childProcess.spawn('ruby', ['std.rb'], { stdio: ['pipe', 'inherit', 'inherit'] });

p.on('exit', function (code) {
    console.log('child process exited.');
});

p.on('error', function (err) {
    console.error(err);
    process.exit(1);
});

p.stdin.write('test hello hello');
p.stdin.end();
