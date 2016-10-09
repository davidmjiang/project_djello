class Board < ApplicationRecord
	belongs_to :user
	has_many :lists
	has_many :cards, through: :lists
end
