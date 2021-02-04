import React from 'react';
import './signin.css';
import { AuthorContext } from '../context/author_context';

export default class LogInPage extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <AuthorContext.Consumer>
        {
          ({ logIn }) =>
            <LogIn
              {...this.props}
              logIn={logIn}
            />}
      </AuthorContext.Consumer >
    )
  }
};

class LogIn extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      isFailed: false
    };

    this.changeState = this.changeState.bind(this);
    this.submit = this.submit.bind(this);
  }

  changeState = e => {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
  }

  submit = async (e) => {
    e.preventDefault();
    
    const result = await this.props.logIn(this.state);

    if (!result) {
      this.setState({ isFailed: true, password: '' });
    }
  }

  render() {
    const { email, password, isFailed } = this.state;

    return (
      <form onSubmit={(e) => this.submit(e)}>
        <div className="log-in">
          <div className="log-in-label">
            <div>
              <label>Email</label><br />
              <input type="text" name="email" value={email} onChange={this.changeState} />
            </div>
            <div>
              <label>Password</label><br />
              <input type="password" name="password" value={password} onChange={this.changeState} />
            </div>
            {isFailed && 'Incorrect username or password'}
          </div>
          <input type="submit" value="Log In" className="subbut" />
        </div>
      </form>
    );
  }
}

