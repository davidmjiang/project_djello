class User < ApplicationRecord
	has_many :boards
	has_many :memberships
	has_many :cards, through: :memberships
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end
