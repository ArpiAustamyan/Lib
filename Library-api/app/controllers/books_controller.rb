class BooksController < ApiController
  before_action :require_login, except: [:index, :show]

  def index
      books = Book.all

      render json: books #{books: books, authors:Author.all}
  end

  def show
      book = Book.find(params[:id])

      render json: book #{book:book, author:book.author}
  end

  def create
      book = Book.new(book_params)
      book.author = current_author

      if book.save
          render json: {
              message: 'ok',
              book: book
          }
      else
          render json: {message: 'Could not create book'}
      end
  end

  def update 
      book = current_author.books.find(params[:id])

      if book.update(book_params)
          render json: book
      else
          render json: book.errors, status: :unprocessable_entity
      end
  end

  def destroy
      book = current_author.books.find(params[:id])

      if book.destroy
           head(:ok)
      else
          head(:unprocessable_entity)
      end
  end

  private

  def book_params
    params.require(:book).permit(:title, :year, :genre, :description, :rating)
  end

end
