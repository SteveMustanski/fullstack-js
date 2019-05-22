// external modules
import React, { Component } from 'react';
import axios from 'axios';
import Proptypes from 'prop-types';

// internal modules
import Header from './Header';
import ContestList from './ContestList';
import Contest from './Contest';
import * as api from '../api';

const pushState = (obj, url) => {
  window.history.pushState(obj, '', url);
};

const onPopState = handler => {
  window.onpopstate = handler;
};

class App extends Component {
  static propTypes = {
    initialData: Proptypes.object.isRequired,
  };
  state = this.props.initialData;

  componentDidMount() {
    onPopState(event => {
      this.setState({
        currentContestId: (event.state || {}).currentContestId,
      });
    });
  }

  componentWillUnmount() {
    onPopState(null);
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
    });
  };
  fetchContestList = () => {
    pushState({ currentContestId: null }, `/`);
    api.fetchContestList().then(contests => {
      this.setState({
        currentContestId: null,
        contests,
      });
    });
  };

  currentContent() {
    if (this.state.currentContestId) {
      return (
        <Contest
          {...this.currentContest()}
          contestListClick={this.fetchContestList}
        />
      );
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
