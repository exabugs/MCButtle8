var lambda = require("./lambda");

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
        "text": "Hello!World!",
        "contentMetadata": {
          "SKIP_BADGE_COUNT": "true",
          "AT_RECV_MODE": "2"
        }
      }
    }
  ]
};

var context = {
  succeed: function() {}
};

lambda.handler(data, context, function () {

});
