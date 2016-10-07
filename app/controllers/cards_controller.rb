class CardsController < ApplicationController
	def index
		@cards = Card.where(list_id: params[:list_id])
		respond_to do |format|
			format.json{ render json: @cards }
		end
	end

	def create
		@card = Card.new(card_params)
		respond_to do |format|
			if @card.save
				format.json{ render json: @card }
			else
				format.json{ render json: {error: @card.errors.full_messages.join(', ')} }
			end
		end
	end

	def update
		@card = Card.find(params[:id])
		if @card.update(card_params)
			respond_to do |format|
				format.json{ render json: @card }
			end
		end
	end

	def destroy
		@card = Card.find(params[:id])
		@card.destroy
	end

	def members
		@card = Card.find(params[:id])
		@members = @card.members
		respond_to do |format|
			format.json{ render json: @members }
		end
	end

	private
	def card_params
		params.require('card').permit(:title, :description, :completed, :list_id)
	end
end
