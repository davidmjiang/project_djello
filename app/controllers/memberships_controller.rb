class MembershipsController < ApplicationController
	def index
		@memberships = Membership.all
		@memberships = @memberships.where(card_id: params[:card_id]) if params[:card_id]
		@memberships = @memberships.where(user_id: params[:user_id]) if params[:user_id]
		respond_to do |format|
			format.json {render json: @memberships}
		end
	end

	def create
		@membership = Membership.new(membership_params)
		respond_to do |format|
			if @membership.save
				format.json{ render json: @membership.user}
			else
				format.json{render json: @membership.errors}
			end
		end
	end

	def destroy
		@membership = Membership.where(card_id: params[:card_id], user_id: params[:user_id]).first
		@membership.destroy
	end

	private
	def membership_params
		params.require('membership').permit(:user_id, :card_id)
	end

end
