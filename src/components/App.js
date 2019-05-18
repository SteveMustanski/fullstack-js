// external modules
import React, { Component } from 'react';
import axios from 'axios';

// internal modules
import Header from './Header';
import ContestPreview from './ContestPreview';

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
        <div>
          {this.state.contests.map(contest => (
            <ContestPreview {...contest} key={contest.id} />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
