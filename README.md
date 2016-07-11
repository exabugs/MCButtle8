# MCButtle8

![ice-cube](https://cloud.githubusercontent.com/assets/1234874/16717116/4757542a-474a-11e6-9934-d8d4df65e665.jpg)

## 構築

 1. ユーザーローカル人工知能ボットAPI 登録

  http://ai.userlocal.jp/

 2. LINE デベロッパー 登録

  https://developers.line.me/

 3. rhymer gem インストール

   ```
$ cd
$ git clone https://github.com/suzuki86/rhymer.git
$ cd rhymer
$ gem build rhymer.gemspec
$ gem install rhymer-x.x.x.gem
```

 4. MCButtle8 インストール

   ```
$ cd
$ git clone https://github.com/exabugs/MCButtle8.git
$ cd MCButtle8
$ npm install
```

 5. キー 設定
   - index.js : ユーザローカルAPI

  ```
  var data = {
    key: "bd000000000000000000",
    ...
  };
  ```
   - lambda.js : LINE

  ```
  var ChannelID = 1400000000;
  var ChannelSecret = "de000000000000000000000000000000";
  var MID = "u00000000000000000000000000000000";
  ```

 6. 起動

   ```
   $ node index.js
   ```
   
## 実行
![img_2758](https://cloud.githubusercontent.com/assets/1234874/16717310/c53d5480-474e-11e6-8e20-a968e12b0a87.PNG)

## 注意
  - LINE は https 限定




