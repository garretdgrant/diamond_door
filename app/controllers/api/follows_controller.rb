class Api::FollowsController < ApplicationController
    wrap_parameters include: Interview.attribute_names + ['userId'] + ['companyId'] + ['isFollowing']

    def create
        @follow = Follow.create(follow_params)
        if @follow.save
            render :create
        else
            render json: {errors: @follow.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def show
        @follow = Follow.find_by(id: params[:id])
        if @follow
            render :create
        else
            render json: {errors: 'follow not found'}, status: 404
        end
    end

    def destroy
        @follow = Follow.find_by(id: params[:id])
        @follow.destroy!
        render json: {message: 'Successfully destroyed folow'}
    end

    private

    def follow_params
        params.require(:follow).permit(:id,:user_id,:company_id,:is_following )
    end
end
