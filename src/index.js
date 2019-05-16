import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const Header = ({ message }) => {
  return <h2 className='Header text-center'>{message}</h2>;
};

Header.propTypes = {
  message: PropTypes.string,
};

const App = () => {
  return (
    <div className='App'>
      <Header message='Naming contest' />
      <div>...</div>
    </div>
  );
};

ReactDOM.render(
  <App headerMessage='Hello from props' />,
  document.getElementById('root'),
);
