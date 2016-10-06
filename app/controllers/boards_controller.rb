class BoardsController < ApplicationController
	def index
		@boards = Board.all
		respond_to do |format|
			format.json{ render json: @boards}
		end
	end

	def show
		@board = Board.find(params[:id])
		respond_to do |format|
			format.json{ render json: @board, include: :user}
		end
	end

	def create
		@board = Board.new(board_params)
		respond_to do |format|
			if @board.save
				format.json{ render json: @board }
			else
				format.json{ render json: {error: @board.errors.full_messages.join(', ')} }
			end
		end
	end

	private
	def board_params
		params.require('board').permit(:title, :user_id)
	end

end
