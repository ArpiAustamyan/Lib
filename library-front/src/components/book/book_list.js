import React from 'react';
import { BookContext } from '../../context/book_context';
import './book_list.css';

export default class BookListPage extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <BookContext.Consumer>
        {
          ({ getAllBooks, allBooks }) =>
            <BookList
              {...this.props}
              getAllBooks={getAllBooks}
              allBooks={allBooks}
            />}
      </BookContext.Consumer >
    )
  }
};

class BookItem extends React.Component {

  render() {
    const { book: { id, title, year, genre, rating, description, author } } = this.props;
    const { name, surname } = author;

    return (
      <div>
        {
          id &&
          <div className="book-item">
            <h2>Book: {title} </h2>
            <div>
              <label>Author: {name} {surname}</label>
              <label>Year: {year}</label>
              <label>Genre: {genre} </label>
              <label>Rating: {rating}</label>
              <label>Description: {description}</label>
            </div>
          </div>
        }
      </div>
    );
  }
}


class BookList extends React.Component {
  constructor() {
    super();
    this.state = {
      books: null,
      search: ''
    }

    this.getList = this.getList.bind(this);
    this.changeState = this.changeState.bind(this);
  }

  componentDidMount() {
    this.getList();
  }

  async getList() {
    const { getAllBooks, allBooks } = this.props;
    await getAllBooks();
    this.setState({ books: allBooks });
  }

  changeState = e => {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    const { books, search } = this.state;

    const searchResult = search.length == 0 ?
      books
      :
      books.filter(
        (book) => {
          return book.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        }
      );

    return (
      <div className="book-list">
        {
          books &&
          <div>
            <div>
              <span>Search Books</span>
              <input type="text" maxLength='10' name='search' onChange={this.changeState} value={search} />
            </div>
            {
              searchResult.map(book => <BookItem {...{ book }} key={book.id} />)
            }
          </div>
        }
      </div>
    );
  }
}
