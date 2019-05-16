import React, { Component } from 'react';

import Header from './Header';

class App extends Component {
  state = {
    pageHeader: 'Naming Contets',
  };

  componentWillMount() {
    console.log('will mount');
    debugger;
  }
  componentDidMount() {
    console.log('did mount');
    debugger;
  }

  render() {
    return (
      <div className='App'>
        <Header message={this.state.pageHeader} />
        <div>...</div>
      </div>
    );
  }
}

export default App;
