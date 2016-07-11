require 'open-uri'
require 'nokogiri'
require 'addressable/uri'

# スクレイピング先のURL
word = STDIN.gets
url = Addressable::URI.parse('https://ja.wikipedia.org/wiki/' + word).normalize

charset = nil
html = open(url) do |f|
  charset = f.charset # 文字種別を取得
  f.read # htmlを読み込んで変数htmlに渡す
end

# htmlをパース(解析)してオブジェクトを生成
doc = Nokogiri::HTML.parse(html, nil, charset)
# Pタグ内のテキストを表示
text = doc.xpath("/html//p").text
STDOUT.puts text

