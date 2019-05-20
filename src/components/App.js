// external modules
import React, { Component } from 'react';
import axios from 'axios';

// internal modules
import Header from './Header';
import ContestList from './ContestList';

class App extends Component {
  state = {
    pageHeader: 'Naming Contets',
    contests: this.props.initialContests,
  };

  componentDidMount() {
    axios
      .get('/api/contests')
      .then(resp => {
        this.setState({
          contests: resp.data.contests,
        });
      })
      .catch(console.err);
  }

  render() {
    return (
      <div className='App'>
        <Header message={this.state.pageHeader} />
        <ContestList contests={this.state.contests} />
      </div>
    );
  }
}

export default App;
