# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "Destroying old data..."

User.destroy_all
Board.destroy_all
List.destroy_all
Card.destroy_all
Membership.destroy_all
Activity.destroy_all


puts "Creating users..."

5.times do |i|

User.create({username: "foobar#{i}",
						 email: "foobar#{i}@email.com",
						 password: "foobar#{i}"})
end

puts "Creating boards..."

User.first.boards.create({title: "The Great Kitchen Redesign"})

puts "Creating lists..."

board = Board.first
list_a = board.lists.create({title: "Ideas", description: "My awesome ideas"})
list_b = board.lists.create({title: "To Do", description: "Things I need to do"})
list_c = board.lists.create({title: "Doing", description: "Things I am doing right now"})

puts "Creating cards..."

list_a.cards.create({title: "Get a new window valence to match the cabinet colors", completed: false})
list_a.cards.create({title: "Install pot rack over the island", description: "The pots and pans are piling up on the ground and I'm always tripping over them. We need a pot rack.", completed: false})
list_b.cards.create({title: "Adjust water pressure of the sink", completed: false})
list_b.cards.create({title: "Remove old refrigerator and stove", completed: false})
list_b.cards.create({title: "Install new sink", completed: false})
list_b.cards.create({title: "Install new flooring", completed: false})
list_c.cards.create({title: "Pick countertop colors", completed: false})
list_c.cards.create({title: "Buy new kitchen cart", completed: false})

puts "Done!"


