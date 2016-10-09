class UsersController < ApplicationController
	def index
		@users = User.all
		respond_to do |format|
			format.json{render json: @users}
		end
	end

	def boards
		@user = User.find(params[:id])
		cards = @user.cards
		@boards = []
		cards.each do |c|
			@boards << c.list.board
		end
		@boards = @boards.uniq{ |b| b.id}
		respond_to do |format|
			format.json{render json: @boards}
		end
	end
end
