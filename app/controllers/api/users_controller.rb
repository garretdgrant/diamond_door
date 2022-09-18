class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password']
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

  def follows
    @user = current_user
    @follows = @user.follows
    render :follows
  end

  private
  def user_params
    params.require(:user)
      .permit(:email, :password, :phone, :f_name,:l_name,:website, :about_me, :job_title, :skills)
  end

 

end


# signupRequestOptions = {
#   method: 'POST',
#   headers: { 'Content-Type': 'application/json' },
#   body: JSON.stringify({ 
#     email: 'coolemail@hotmail.net', 
#     password: 'starwars',
#     f_name: 'Garret',
#     l_name: 'Grant',
#     phone: '5303917473',
#     website: 'google.com',
#     about_me: 'Im a software engineer',
#     job_title: 'software engineer',
#     skills: 'all the web dev you want '
#   })
# }