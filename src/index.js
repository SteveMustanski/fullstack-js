import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const App = props => {
  return <h2 className='text-center'>{props.headerMessage}</h2>;
};

App.propTypes = {
  headerMessage: PropTypes.string,
};

ReactDOM.render(
  <App headerMessage='Hello from props' />,
  document.getElementById('root'),
);
