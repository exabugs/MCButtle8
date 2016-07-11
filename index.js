// LINE Bot

var spawn = require('child_process').spawn;
var request = require('request');
var lambda = require("./lambda");
var async = require("async");
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/healthcheck', function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('OK\n');
});

app.post('/', function (req, res) {
  var data = req.body;

  var result = data.result && data.result[0];
  var content = result.content || {};

async.waterfall([
  function (next) {
    if (content.text.indexOf(":") === 0) {
      next(null, content.text.slice(1), 1);
    } else {
      find(content, function(error, array) {
        if (array.length) {
          console.log("find : " + array[0]);
          next(null, array[0], 2);
        } else {
          // userlocal
          next(-1);
        }
      });
    }
  },

  function (word, flag, next) {
    content.text = word;
    oota(content, function(error, array) {
      console.log(array)
      if (array.length) {
        content.text = array[0];
        next(null, word, flag);
      } else {
        // userlocal
        next(-1);
      }
    });
  },

  function (keyword, flag, next) {
    rhymer(content, function(error, array) {
      console.log("rhymer end");
      console.log(array);
      if (array.length) {
        content.text = flag === 1 ? "作詞" : "む!? 踏んだな!?ワッサー!!";
        lambda.handler(data, {}, function() {

          var values = array.reduce(function (memo, v) {
            if (v.indexOf(keyword) !== -1) {
              memo.push(v);
            }
            return memo;
          }, []);

          console.log("Length : " + values.length);
          var index = ~~(Math.random() * values.length);
          console.log("index  : " + index);

          var results = [values[index]];

          if (results) {
            results.forEach(function (v) {
              content.text = v ? v : "見つからない。。";
              lambda.handler(data, {}, function() {
              });
            });
          } else {
            console.log("見つからない");
          }
        });
      } else {
        // userlocal
        next(-1);
      }
    });
  }
 ], function (err) {
   if (err) {
      userlocal(content, function() {
        lambda.handler(data, {}, function() {
        });
      });
   }
 });


});

function oota(content, callback) {

  var p = spawn('ruby', ['oota.rb']);

  var array = [];

  p.stdout.on('data', function (text) {
    console.log("find out 1");
    console.log(text.toString());

    array = [text.toString()];
console.log("oota end");
console.log(array);
    //  callback(null, array);
  });

  p.on('exit', function (code) {
    console.log("oota exit");
    callback(null, array);
  });

  p.on('error', function (err) {
    console.error(err);
  });

  console.log("oota: " + content.text);
  p.stdin.write(content.text);
  p.stdin.end();
}

function find(content, callback) {

  var p = spawn('ruby', ['find.rb']);

  var array = [];

  p.stdout.on('data', function (text) {
    console.log("find out 1");
    console.log(text.toString());

    array = text.toString().split("\n");
console.log("find end");
console.log(array);
    //  callback(null, array);
  });

  p.on('exit', function (code) {
    console.log("find exit");
    callback(null, array);
  });

  p.on('error', function (err) {
    console.error(err);
  });

  console.log("TEST: " + content.text);
  p.stdin.write(content.text);
  p.stdin.end();
}


function rhymer(content, callback) {

  var p = spawn('ruby', ['std.rb']);

  var array = [];

  p.stdout.on('data', function (text) {
    console.log("out 1");
    console.log(text.toString());

    array = text.toString().split("\n");
console.log("rhymer end");
console.log(array);
    //  callback(null, array);
  });

  p.on('exit', function (code) {
    console.log("rythmer exit");
    callback(null, array);
  });

  p.on('error', function (err) {
    console.error(err);
  });

  console.log("TEST: " + content.text);
  p.stdin.write(content.text);
  p.stdin.end();
}

// ruby /Users/dreamarts/WebstormProjects/linebot_IN/rhymer/test.rb


function userlocal(content, callback) {
  var data = {
    key: "bd000000000000000000", // team8
    character_type: "custom",
    message: content.text
  };
  var options = {
    uri: 'https://chatbot-api.userlocal.jp/api/chat',
    form: data,
    json: true,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charser=UTF-8'
    }
  };
  request(options, function (error, response, body) {
    console.log(body);
    content.text = body.result + "YO!";

    callback(error, content);
  });

}


app.listen(80);


