import React from 'react';
import ReactDOM from 'react-dom';

const App = props => {
  return <h2 className='text-center'>{props.headerMessage}</h2>;
};

ReactDOM.render(
  <App headerMessage='Hello from props' />,
  document.getElementById('root'),
);
