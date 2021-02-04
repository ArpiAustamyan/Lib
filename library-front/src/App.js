import React from 'react';
import { BrowserRouter, Redirect, Route, Link } from 'react-router-dom';
import './App.css';

import BookList from './components/book/book_list';
import AuthorList from './components/author/author_list'
import Book from './components/book/book';
import SignInForm from './components/sign_in';
import LogInForm from './components/log_in';

class App extends React.Component {

  render() {
    const { authenticated, logOut } = this.props;
    const isAuth = authenticated();

    return (
      <BrowserRouter>
        <div className="App">
          <div className='header'>
            <Link to='/books' className="link">Books</Link>
            <Link to='/authors' className="link">Authors</Link>
            <div className="nav">
              {!isAuth && <Link to='/signin'>Sign In</Link>}
              {!isAuth && <Link to='/login'>Log In</Link>}
              {isAuth && <Link to='/book'>Create Book</Link>}
              {isAuth && <button onClick={logOut}>Log Out</button>}
            </div>
          </div>

          <Route exact path='/books' render={() => <BookList />} />
          <Route exact path='/authors' render={() => <AuthorList />} />
          <Route exact path='/signin' render={() => isAuth ? <Redirect to='/books' /> : <SignInForm />} />
          <Route exact path='/login' render={() => isAuth ? <Redirect to='/books' /> : <LogInForm />} />
          <Route exact path='/book/:bookId' component={Book} />
          <Route exact path='/book' component={Book} />
          <Route exact path='/' render={() => <Redirect to='/books' />} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
