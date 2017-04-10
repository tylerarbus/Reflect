import React, { Component } from 'react'

export default class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    const { months } = this.props;

    return (
      <div className="four wide column">
        <div className="ui left vertical inverted sidebar menu visible">
          <div className="item header">2017</div>
          {Object.keys(months).map(month => 
            <a className="item">
              {month}
              <div className="ui label">{months[month].length}</div>
            </a>
          )}
        </div>
      </div>
    ) 
  }
}
