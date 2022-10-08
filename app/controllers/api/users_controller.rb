class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + 
  ['password'] +['firstName'] + ['lastName'] + ['jobTitle']
  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      render :show
    else
      render json: {errors: @user.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def show
    @user = current_user
    render :show
  end

  def update
    @user = User.find_by(id: user_params[:id])
    if @user.update(user_params)
        render :show
    else
        render json: {errors: @user.errors.full_messages}, status: :unprocessable_entity   
    end
  end

  def destroy
    @user = User.find_by(id: params[:id])
    @user.destroy!
    render json: {message: 'success'}
  end

  def follows

    @user = current_user
    @follows = @user.follows
    render :follows
  end

  private
  def user_params
    params.require(:user)
      .permit(:id, :email, :password, :phone, :first_name,:last_name,:website, :about_me, :job_title, :skills)
  end

 

end


