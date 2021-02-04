import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { BookProvider } from './context/book_context';
import { AuthorProvider, AuthorContext } from './context/author_context';
ReactDOM.render(
  <BookProvider>
    <AuthorProvider>
      <AuthorContext.Consumer>
        {({ authenticated, logOut }) =>
          <App {... { authenticated, logOut }} />
        }
      </AuthorContext.Consumer>
    </AuthorProvider>
  </BookProvider>
  ,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

