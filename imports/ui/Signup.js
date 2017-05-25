import React from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base'

export default class Signup extends React.Component{
  constructor(props) {
    super (props);

    this.state = {
      error: ""
    };
  }

  createAccount (e) {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();
    // this.setState({
    //   error: "Something went wrong"
    // })

    if (password.length < 9) {
      return this.setState({
        error: 'Password must be more than 9 characters long'
      })
    }

    Accounts.createUser({ email, password }, (err) => {
      console.log('Signup Callback', err);
      if (err) {
        this.setState({
          error: err.reason
        });
      } else {
        this.setState({error: ""});
      }
    });
  }


  render(){
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Signup for Short Link</h1>

          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form onSubmit={this.createAccount.bind(this)} noValidate className="boxed-view__form">
            <input ref="email" type="email" name="email" placeholder="Email"/>
            <input ref="password" type="password" name="password" placeholder="Password"/>
            <button type="submit" className="button">Create Account</button>
          </form>
          <Link to="/">Have an Account?</Link>
        </div>
      </div>
    )
  }

  /*// Sample state code
  constructor(props) {
    super (props);

    this.state = {
      count: this.props.count || 0
    };
  }

  increment () {
    this.setState({
      count: this.state.count + 1
    })
  }

  decrement () {
    this.setState({
      count: this.state.count - 1
    })
  }

  render(){
    return (
      <div>
        <h1>Signup for Short Link</h1>
        <p>{this.state.count}</p>
        <p>
          <button onClick={this.increment.bind(this)}>+1</button>
          <button onClick={this.decrement.bind(this)}>-1</button>
        </p>
        <Link to="/">Have an Account?</Link>
      </div>
    )
  }*/
}