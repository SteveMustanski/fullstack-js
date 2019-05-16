import React, { Component } from 'react';

import Header from './Header';
import ContestPreview from './ContestPreview';

class App extends Component {
  state = {
    pageHeader: 'Naming Contets',
  };

  render() {
    return (
      <div className='App'>
        <Header message={this.state.pageHeader} />
        <div>
          {this.props.contests.map(contest => (
            <ContestPreview {...contest} key={contest.key} />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
