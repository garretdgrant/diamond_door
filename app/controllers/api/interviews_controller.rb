class Api::InterviewsController < ApplicationController
    wrap_parameters include: Interview.attribute_names + ['userId'] + ['companyId']
  
    def create
      
        @interview = Interview.new(interview_params)
        if @interview.save
            render :create
        else
            render json: {errors: @interview.errors.full_messages}, status: :unprocessable_entity   
        end
    end

    def show
        @interview = Interview.find_by(id: params[:id])
        if @interview
            render :create
        else
            render json: {errors: 'Company not found'}, status: 404
        end
    end

    def update
        debugger
        @interview = Interview.find_by(id: interview_params[:id])
        if @interview.update(interview_params)
            render :create
        else
            render json: {errors: @interview.errors.full_messages}, status: :unprocessable_entity   
        end
    end

    def destroy
        @interview = Interview.find_by(id: params[:id])
        @interview.destroy!
        render json: {message: 'success'}
    end

    private
    def interview_params
        # debugger
        params.require(:interview)
        .permit(:id, :title, :company_id, :user_id, :experience, :process, :difficulty, :offer, 
            :questions, :answer, :created_at)
    end
end

# 
