'use strict';

// チャット・ヒント
// 1. 人に役立つ(賢い答えを導き出す)
// 2. 楽しい(暇つぶし出来るオモシロボット)
//   話題性・プロモ効果
// 3. もっと話したい(好き・心を動かす)
//   性別や声、容姿 映画;her エキスマキナ
// 4. 感情のあるなし、空気を読む ジーボ、ペッパー

var ChannelID = 1400000000;
var ChannelSecret = "de000000000000000000000000000000";
var MID = "u00000000000000000000000000000000";



var request = require('request');


exports.handler = function (event, context, callback) {
  var result = event.result && event.result[0];
  if (result) {
    var content = result.content || {};
    send_line(content, callback);
  } else {
 console.log("error");
    callback();
  }
};

// https://chatbot-api.userlocal.jp/api/chat?message=%E9%87%8E%E7%90%83%E3%81%97%E3%81%9F%E3%81%84&key=5cd47a3b5bdd3eb0c497
function userlocal(content, callback) {
  var data = {
    key: "5cd47a3b5bdd3eb0c497", // exabugs
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
    content.text = body.result;
    send_line(content, callback);
  });

}

// LINE
function send_line(content, callback) {
  var message = {
    "to": [content.from],
    "toChannel": 1383378250, // 1383378250 Fixed value
    "eventType": "138311608800106203", // “138311608800106203” Fixed value.
    "content": {
      "contentType": 1,
      "toType": 1,
      "text": content.text
    }
  };
  send(message, function () {
    callback();
  });
}

function send(data, callback) {
  var options = {
    uri: 'https://trialbot-api.line.me/v1/events',
    json: data,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charser=UTF-8',
      'X-Line-ChannelID': ChannelID,
      'X-Line-ChannelSecret': ChannelSecret,
      'X-Line-Trusted-User-With-ACL': MID
    }
  };
  request(options, function (error, response, body) {
    callback();
  });
}

