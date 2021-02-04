class ApiController < ApplicationController
  def require_login
      authenticate_token || render_unauthorized('Accsess Denied')
  end

  def current_author
      @current_author ||= authenticate_token
  end

  protected 

  def render_unauthorized(message)
      errors = { errors: [detail: message]}
      render json: errors, status: :unauthorized
  end

  private

  def authenticate_token
      authenticate_with_http_token do | token, options |
          Author.find_by(token: token)
      end
  end

end
