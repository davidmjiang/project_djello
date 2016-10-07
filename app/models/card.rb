class Card < ApplicationRecord
	belongs_to :list
	has_many :memberships
	has_many :members, through: :memberships, source: :user
end
