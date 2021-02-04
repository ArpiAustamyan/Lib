class SessionsController < ApiController
  skip_before_action :require_login, only: [:create], raise: false

  def create
      if author = Author.validate_login(params[:email], params[:password])
          allow_token_to_be_used_only_once_for(author)
          send_token_for_valid_login_of(author)
      else
          render_unauthorized("Error with your login or password")
      end
  end

  def destroy
      logout
      head :ok
  end

  private

  def send_token_for_valid_login_of(author)
      render json: {token: author.token}
  end

  def allow_token_to_be_used_only_once_for(author)
      author.regenerate_token
  end

  def logout
      current_author.invalidate_token
  end

end
