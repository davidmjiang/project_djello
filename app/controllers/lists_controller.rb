class ListsController < ApplicationController
	def index
		@lists = List.where(board_id: params[:board_id])
		respond_to do |format|
			format.json{ render json: @lists}
		end
	end

	def create
		@list = List.new(list_params)
		respond_to do |format|
			if @list.save
				format.json{ render json: @list}
			else
				format.json{render json: {error: @list.errors.full_messages.join(', ')}}
			end
		end
	end

	def update
		@list = List.find(params[:id])
		if @list.update(list_params)
			respond_to do |format|
				format.json{ render json: @list}
			end
		end
	end

	def destroy
		@list = List.find(params[:id])
		@list.destroy
	end

	private
	def list_params
		params.require("list").permit(:title, :description, :board_id)
	end

end
