class Api::SessionsController < ApplicationController
  before_action :require_logged_in, only: [:destroy]
  def show
    if current_user
      @user = current_user
      render json: {user: @user}
    else
      render json: {user: nil}
    end
  end

  def create
    email = params[:email]
    password = params[:password]
    @user = User.find_by_credentials(email, password)
    if @user
      login!(@user)
      render json: {user: @user}
    else
      render json: { errors: ['Invalid credentials'] }, status: :unauthorized

    end
  end

  def destroy
    logout!
    render json: {message: 'success'}
  end
end


# loginRequestOptions = {
#   method: 'POST',
#   headers: { 'Content-Type': 'application/json' },
#   body: JSON.stringify({ email: 'demo@user.io', password: 'password' })
# }