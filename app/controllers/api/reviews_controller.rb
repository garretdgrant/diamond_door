class Api::ReviewsController < ApplicationController
  

    def company_index

    end

    def user_index
        render json: 'User_index'
    end

    def create

    end

    def update

    end

    def destroy
        @review = Review.find_by(id: params[:id])
        @review.destroy!
        render json: {message: 'success'}
    end
end
