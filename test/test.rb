require "rhymer"

rhymer = Rhymer::Parser.new("今日はとても良い天気ですね。こんな日は自然に元気になります。")
rhymer.rhymes.each do |rhyme|
  puts [rhyme[0], rhyme[1]].join(" ")
end
