// external modules
import React, { Component } from 'react';
import axios from 'axios';

// internal modules
import Header from './Header';
import ContestList from './ContestList';
import Contest from './Contest';
import * as api from '../api';

const pushState = (obj, url) => {
  window.history.pushState(obj, '', url);
};

class App extends Component {
  state = {
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

  currentContest() {
    return this.state.contests[this.state.currentContestId];
  }

  pageHeader() {
    if (this.state.currentContestId) {
      return this.currentContest().contestName;
    }
    return 'Naming Contests';
  }

  fetchContest = contestId => {
    pushState({ currentContestId: contestId }, `/contests/${contestId}`);
    api.fetchContest(contestId).then(contest => {
      this.setState({
        currentContestId: contest.id,
        contests: {
          ...this.state.contests,
          [contest.id]: contest,
        },
      });
      debugger;
    });
  };

  currentContent() {
    if (this.state.currentContestId) {
      return <Contest {...this.currentContest()} />;
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
        <Header message={this.pageHeader()} />
        {this.currentContent()}
      </div>
    );
  }
}

export default App;
