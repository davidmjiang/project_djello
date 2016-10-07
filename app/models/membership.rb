class Membership < ApplicationRecord
	belongs_to :user
	belongs_to :card
end
