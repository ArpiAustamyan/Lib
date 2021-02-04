import React from 'react';
import { AuthorContext } from '../context/author_context';
import './signin.css';

export default class SingInPage extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <AuthorContext.Consumer>
        {
          ({ signIn, checkPassword }) =>
            <SingIn
              {...this.props}
              signIn={signIn}
              checkPassword={checkPassword}
            />}
      </AuthorContext.Consumer >
    )
  }
};

class SingIn extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      surname: '',
      birthyear: '',
      email: '',
      password: '',
      checkResult: null
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
    const { checkPassword, signIn } = this.props;
    const { password, password_confirmation } = this.state;
    const checkResult = checkPassword(password, password_confirmation);

    if (checkResult !== null) {
      this.setState({ password: '', password_confirmation: '', checkResult });
      return;
    }
    const result = await signIn(this.state);

    if (!result) {
      this.setState({ password: '', password_confirmation: '', checkResult: 'Invalid credentials' });
    }
  }

  render() {
    const { name, surname, birthyear, email, password, password_confirmation, checkResult } = this.state;

    return (
      <form onSubmit={(e) => this.submit(e)} className="signform">
        <div className="sing-in">
          <div className="sing-in-label">
            <div>
              <label>Name</label><br />
              <input type="text" name="name" value={name} onChange={this.changeState} />
            </div>
            <div>
              <label>Surname</label><br />
              <input type="text" name="surname" value={surname} onChange={this.changeState} />
            </div>
            <div>
              <label>Born</label><br />
              <input type="text" name="birthyear" value={birthyear} onChange={this.changeState} /><br />
            </div>
            <div>
              <label>Email</label><br />
              <input type="text" name="email" value={email} onChange={this.changeState} />
            </div>
            <div>
              <label>Password</label><br />
              <input type="password" name="password" value={password} onChange={this.changeState} />
            </div>
            <div>
              <label>Password Confirmation</label><br />
              <input type="password" name="password_confirmation" value={password_confirmation} onChange={this.changeState} />
            </div>
            {checkResult && <label>{checkResult}</label>}
          </div>
          <input type="submit" value="Sign In" className="subbut" />
        </div>
      </form>
    );
  }
}

