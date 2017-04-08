import React from 'react'
import { fetchEntries } from '../actions/actions.js';
import { connect } from 'react-redux';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchEntries());
  }

  render() {
    return (
      <div>Hello World</div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(App);