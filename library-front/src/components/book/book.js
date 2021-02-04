import React from 'react';
import './book.css';
import { BookContext } from '../../context/book_context';

export default class BookPage extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <BookContext.Consumer>
        {
          ({ book, addBook }) =>
            <Book
              {...this.props}
              book={book}
              addBook={addBook}
            />}
      </BookContext.Consumer >
    )
  }
};

class Book extends React.Component {
  constructor() {
    super();

    this.state = {
      title: '',
      year: '',
      genre: '',
      description: '',
      rating: '',
      isFailed: false
    };
  }

  componentWillMount() {
    const { book } = this.props;

    if (book) {
      const { id, title, year, description, genre, rating } = book;

      this.setState({
        id: id,
        title: title,
        year: year,
        genre: genre,
        description: description,
        rating: rating
      });
    }
  }

  changeState = e => {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
  }

  submit = async (e) => {
    e.preventDefault();
    const { addBook } = this.props;
    const result = await addBook(this.state);

    if (!result) {
      this.setState({ isFailed: true });
    }
  }

  render() {
    const { book } = this.props;
    const { title, year, description, genre } = this.state;
    const rating = book ? book.rating : '';
    const isEditMode = book ? true : false;

    return (
      <form onSubmit={(e) => this.submit(e)}>
        <div className="book">
          <div className="book-label">
            <div>
              <label>Title</label><br />
              <input type="text" name="title" value={title} onChange={this.changeState} disabled={isEditMode} />
            </div>
            <div>
              <label>Year</label><br />
              <input type="text" name="year" value={year} onChange={this.changeState} disabled={isEditMode} />
            </div>
            <div>
              <label>Genre</label><br />
              <input type="text" name="genre" value={genre} onChange={this.changeState} disabled={isEditMode} /><br />
            </div>
            <div>
              <label>Rating {rating}</label><br />
              <input type="text" name="rating" onChange={this.changeState} /><br />
            </div>
          </div>
          <div className="desc">
            <label>Description</label><br />
            <textarea className="desc" type="text" name="description" value={description} onChange={this.changeState} disabled={isEditMode} /><br />
          </div>
          {}
          <input type="submit" value="Create" />
        </div>
      </form>
    );
  }
};
