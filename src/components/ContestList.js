import React from 'react';
import PropTypes from 'prop-types';

import ContestPreview from './ContestPreview';

const ContestList = ({ contests, onContestClick }) => {
  return (
    <div>
      {Object.keys(contests).map(contestId => (
        <ContestPreview
          {...contests[contestId]}
          key={contestId}
          onClick={onContestClick}
        />
      ))}
    </div>
  );
};

ContestList.propTypes = {
  contests: PropTypes.object,
  onContestClick: PropTypes.func.isRequired,
};

export default ContestList;
