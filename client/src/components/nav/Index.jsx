import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import { checkCredentials } from '../landing/login.actions.js';
import Dropdown from './Dropdown.jsx';
import CallMeNow from '../entries/calling/CallMeNow.jsx';

const navStyle = {
  marginBottom: '0',
  borderRadius: '0',
  height: '52px'
};

const logoStyle = {
  fontFamily: 'PT Sans Caption',
  fontSize: '20px',
  color: '#89EEB2'
};

const menuStyle = {
  position: 'relative'
};

export class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      menuOpen: false
    };

    this.onClickHome = this.onClickHome.bind(this);
    this.onClickEntries = this.onClickEntries.bind(this);
    this.onClickMenu = this.onClickMenu.bind(this);
    this.onClickLogin = this.onClickLogin.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onClickTrends = this.onClickTrends.bind(this);
  }

  onClickHome() {
    if (this.props.user.id) {
      this.props.dispatch(push('/entries'));
    } else {
      this.props.dispatch(push('/'));
    }
  }

  onClickEntries() {
    this.props.dispatch(push('/entries'));
  }

  onClickMenu() {
    this.setState({
      menuOpen: !this.state.menuOpen
    });
  }

  onClickLogin() {
    const creds = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.dispatch(checkCredentials(creds));
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onClickTrends() {
    this.props.dispatch(push('/trends'));
  }


  render() {
    return (
      <div id="navbar" className="ui inverted fixed menu" style={navStyle}>
        <a
          className="item"
          onClick={this.onClickHome}
        >
          <span style={logoStyle}>Reflective</span>
        </a>
        {this.props.user.id &&
          <a
            className={this.props.router.location.pathname === '/entries' ? 'active item' : 'item'}
            onClick={this.onClickEntries}
          >
            Entries
          </a>
        }
        {this.props.user.id &&
          <a
            className={this.props.router.location.pathname === '/trends' ? 'active item' : 'item'}
            onClick={this.onClickTrends}
          >
            Trends
          </a>
        }
        { !this.props.user.id &&
          <div className="right item">
            <div className={this.props.user.error === 'Invalid User/Password' ? 'ui input error' : 'ui input'}>
              <input
                type="text"
                placeholder="E-mail"
                onChange={this.onChangeEmail}
              />
            </div>
            <div className={this.props.user.error === 'Invalid User/Password' ? 'ui input error' : 'ui input'}>
              <input
                type="password"
                placeholder="Password"
                onChange={this.onChangePassword}
                style={{ marginLeft: '8px' }}
              />
            </div>
            <div
              className={this.props.user.isLoggingIn ? 'ui loading primary button' : 'ui primary button'}
              onClick={this.onClickLogin}
              style={{ marginLeft: '8px', whiteSpace: 'nowrap' }}
            >Log in</div>
          </div>
        }
        { this.props.user.id &&
          <div
            className="right menu"
            style={menuStyle}
          >
            <CallMeNow />
            <a
              className="item"
              onClick={this.onClickMenu}
            >
              {`${this.props.user.firstName} ${this.props.user.lastName}`}
            </a>
            { this.state.menuOpen &&
              <Dropdown onClickMenu={this.onClickMenu} />
            }
          </div>
        }
      </div>
    );
  }

}

const mapStateToProps = state => (
  {
    user: state.user,
    router: state.router
  }
);

Nav.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.oneOfType([PropTypes.any])
};

Nav.defaultProps = {
  user: {}
};

export default connect(mapStateToProps)(Nav);
