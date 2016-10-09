class ActivitiesController < ApplicationController
	
	def index
		@activities = Activity.where(card_id: params[:card_id])
		respond_to do |format|
			format.json{ render json: @activities}
		end
	end

	def create
		@activity = Activity.new(activity_params)
		respond_to do |format|
			if @activity.save
				format.json{ render json: @activity}
			else
				format.json{ render json: @activity.errors}
			end
		end
	end

	private
	def activity_params
		params.require("activity").permit(:text, :card_id)
	end

end
