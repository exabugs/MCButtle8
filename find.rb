require "rhymer"
require "natto"
require "set"

nm = Natto::MeCab.new

msg = STDIN.gets
rhymer = Rhymer::Parser.new(msg)
arr = []
rhymer.rhymes.each do |rhyme|
    word = ""
    nm.parse(rhyme[0]) do |n|
        break if n.surface == ""
        word = n.surface
    end
    arr.push(word)
end
arr = arr.uniq
puts arr
