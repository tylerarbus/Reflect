import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { userSubmitEmail } from '../actions/actions.js';

const bgStyle = {
  backgroundImage: 'url(./assets/reflective_wallpaper.jpg)',
  height: '100%',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
}

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.onSubmitEmail = this.onSubmitEmail.bind(this);
    this.onEmailFieldChange = this.onEmailFieldChange.bind(this);
  }

  onSubmitEmail() {
    this.props.dispatch(push('/signup'));
  }

  onEmailFieldChange(email) {
    this.props.dispatch(userSubmitEmail(email));
  }

  render() {
    return (
      <div className="ui vertical masthead center aligned segment"
        style={bgStyle}>
        <div className="ui text container">
          <h1 className="ui inverted header">Reflective</h1>
          <h3>Get a 60 second phone call every day to record your how your day went.</h3>
          <form className="ui form">
            <div className="field">
              <input type="text" placeholder="E-mail address"
                     onChange={(e) => {this.onEmailFieldChange(e.target.value)}}></input>
            </div>
            <div className="ui fluid large teal submit button"
                 onClick={this.onSubmitEmail}>
              Get Started
            </div>
          </form>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(Home);

