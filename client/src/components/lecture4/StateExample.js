import React, { Component } from 'react'
import ChildrenProp from '../lecture4/ChildrenProp'

class StateExample extends Component {
  
  state = {
    items: [
      {description: 'first', type: 'liquid'},
      {description: 'second', type: 'solid'}
    ]
  }

  render() {
    return (
      <div>
        <ChildrenProp 
                  description={this.state.items[0].description} 
                  type={this.state.items[0].description}>
        </ChildrenProp>
        <ChildrenProp 
                  description={this.state.items[1].description} 
                  type={this.state.items[1].description}
        >
        </ChildrenProp>
      </div>
    );
  }
}

export default StateExample;