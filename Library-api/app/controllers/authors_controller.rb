class AuthorsController < ApiController
  before_action :require_login, except: [:create, :index, :show]

  def index
      authors = Author.all

      render json: authors
  end

  def show
      author = Author.find(params[:id])

      render json: author
  end

  def create
      author = Author.create!(author_params)

      render json: {token: author.token}
  end

  def profile
      author = current_author #Author.find_by_auth_token!(request.headers[:token])

      render json: author #{author:{username: author.username, email:author.email, name:author.name, id: author.id}, books:author_books}
  end

  def update
      author = current_author

      if author.update(author_params)
          render json: author
      else
          render json: author.errors, status: :unprocessable_entity
      end
  end

  def destroy
      author = current_author

      if author.destroy
          head(:ok)
      else
          head(:unprocessable_entity)
      end
  end

  private

  def author_params
      params.require(:author).permit(:username, :password, :password_confirmation, :name, :email)
  end
end
