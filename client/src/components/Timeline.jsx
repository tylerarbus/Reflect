import React, { Component } from 'react'

export default (props) => (
  <div className="four wide column">
    <div className="ui left vertical inverted sidebar menu visible">
      <div className="item header">2017</div>
      {Object.keys(props.months).map(month => 
        <a className="item month">
          {month}
          <div className="ui label">{props.months[month].length}</div>
        </a>
      )}
    </div>
  </div>
)