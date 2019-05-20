// external modules
import React, { Component } from 'react';
import axios from 'axios';

// internal modules
import Header from './Header';
import ContestList from './ContestList';
import Contest from './Contest';

const pushState = (obj, url) => {
  window.history.pushState(obj, '', url);
};

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

  fetchContest = contestId => {
    pushState({ currentContestId: contestId }, `/contest/${contestId}`);
    this.setState({
      pageHeader: this.state.contests[contestId].contestName,
      currentContestId: contestId,
    });
  };

  currentContent() {
    if (this.state.currentContestId) {
      return <Contest {...this.state.contests[this.state.currentContestId]} />;
    }
    return (
      <ContestList
        contests={this.state.contests}
        onContestClick={this.fetchContest}
      />
    );
  }

  render() {
    return (
      <div className='App'>
        <Header message={this.state.pageHeader} />
        {this.currentContent()}
      </div>
    );
  }
}

export default App;
