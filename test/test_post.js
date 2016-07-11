var request = require('request');

var data = {
  "result": [
    {
      "toChannel": 1472840964,
      "to": [
        "u0e045f5daeb4f02becdcd8e78b803e81"
      ],
      "id": "WB1519-3583820009",
      "fromChannel": 1341301815,
      "from": "u206d25c2ea6bd87c17655609a1c37cb8",
      "eventType": "138311609000106303",
      "createdTime": 1467550830955,
      "content": {
        "seq": null,
        "contentType": 1,
        "deliveredTime": 0,
        "toType": 1,
        "createdTime": 1467550830897,
        "from": "uda2adc39eca70715c06d4724c866feb0",
        "location": null,
        "id": "4554295795185",
        "to": [
          "u0e045f5daeb4f02becdcd8e78b803e81"
        ],
        "text": "今日は天気、明日は換気だ",
        "contentMetadata": {
          "SKIP_BADGE_COUNT": "true",
          "AT_RECV_MODE": "2"
        }
      }
    }
  ]
};

//オプションを定義
var options = {
//  uri: 'http://127.0.0.1:80/callback',
  uri: 'http://127.0.0.1:80/',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  json: data
};

if (2 < process.argv.length) {
  data.result[0].content.text = process.argv[2];
}

//リクエスト送信
request(options, function (error, response, body) {
  //コールバックで色々な処理
  console.log(body);
});


