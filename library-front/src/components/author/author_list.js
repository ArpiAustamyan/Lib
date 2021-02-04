import React from 'react';
import { AuthorContext } from '../../context/author_context';
import './author_list.css';

export default class AuthorListPage extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <AuthorContext.Consumer>
        {
          ({ getAllAuthors, allAuthors }) =>
            <AuthorList
              {...this.props}
              getAllAuthors={getAllAuthors}
              allAuthors={allAuthors}
            />}
      </AuthorContext.Consumer >
    )
  }
};

class AuthorItem extends React.Component {

  render() {
    const { author: { id, name, surename, email, birthyear, books } } = this.props;
    const count = books ? books.length : 0;

    return (
      <div>
        {
          id &&
          <div className="author">
            <h2>Author: {name} {surename}</h2>
            <div>
              <label>Email: {email}</label>
              <label>Born: {birthyear} </label>
              <label>Books Count: {count}</label>
            </div>
          </div>
        }
      </div>
    );
  }
}


class AuthorList extends React.Component {
  constructor() {
    super();
    this.state = {
      authors: null,
      search: ''
    }
    this.getList = this.getList.bind(this);
    this.changeState = this.changeState.bind(this);
  }

  componentDidMount() {
    this.getList();
  }

  async getList() {
    const { getAllAuthors, allAuthors } = this.props;
    await getAllAuthors();
    this.setState({ authors: allAuthors });
  }

  changeState = e => {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    const { authors } = this.state;
    let { search } = this.state;
    search = search.toLocaleLowerCase();

    const searchResult = search.length === 0 ?
      authors
      :
      authors.filter(
        (author) => {
          let isName = author.name ? author.name.toLowerCase().indexOf(search) !== -1 : false;
          let isSurename = author.surename ? author.surename.toLowerCase().indexOf(search) !== -1 : false;

          return isName || isSurename;
        }
      );

    return (
      <div className="author-list">
        {
          authors &&
          <div>
            <div>
              <span>Search Books</span>
              <input type="text" maxLength='10' name='search' onChange={this.changeState} value={search} />
            </div>
            {
              searchResult.map(author => <AuthorItem {...{ author }} key={author.id} />)
            }
          </div>
        }
      </div>
    );
  }
}
