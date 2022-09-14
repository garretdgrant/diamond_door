class Api::ReviewsController < ApplicationController
  
    wrap_parameters include: Review.attribute_names + ['jobTitle'] + ['userId'] + ['companyId'] + ['currentEmployee'] + ['formerEmployee'] + ['employmentStatus']
  
    def create
        @review = Review.new(review_params)
        if @review.save
            render :create
        else
            render json: {errors: @review.errors.full_messages}, status: :unprocessable_entity   
        end
    end

    def update
        @review = Review.find_by(id: review_params[:id])
        if @review.update(review_params)
            render :create
        else
            render json: {errors: @review.errors.full_messages}, status: :unprocessable_entity   
        end
    end

    def destroy
        @review = Review.find_by(id: params[:id])
        @review.destroy!
        render json: {message: 'success'}
    end

    def show
        @review = Review.find_by(id: params[:id])
        if @review
            render :create
        else
            render json: {errors: 'Review not found'}, status: 404
        end
    end

    private
    def review_params
        # debugger
        params.require(:review)
        .permit(:id, :company_id, :user_id, :rating, :current_employee, :former_employee, :employment_status,
                    :job_title, :headline, :pros, :cons, :advice)
    end
end
