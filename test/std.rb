require "rhymer"

while str = STDIN.gets
  break if str.chomp == "exit"

  rhymer = Rhymer::Parser.new(str)
  rhymer.rhymes.each do |rhyme|
    puts [rhyme[0], rhyme[1]].join(" ")
  end

end
