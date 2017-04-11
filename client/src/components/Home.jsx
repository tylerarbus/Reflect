import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.onSubmitEmail = this.onSubmitEmail.bind(this);
  }

  onSubmitEmail() {
    this.props.dispatch(push('/signup'));
  }

  render() {
    return (
      <div className="ui inverted vertical masthead center aligned segment">
        <div className="ui text container">
          <h1 className="ui inverted header">Reflective</h1>
          <form className="ui form">
            <div className="field">
              <input type="text" placeholder="E-mail address"></input>
            </div>
            <div className="ui fluid large teal submit button"
                 onClick={this.onSubmitEmail}>
              Create an Account
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