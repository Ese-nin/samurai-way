// import React from 'react';
// import ReactDOM from 'react-dom'
// import MainApp from './App';
//
// it ('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<MainApp />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });


import React from 'react';
import { render, screen } from '@testing-library/react';
import MainApp from "./App";

test('renders preloader', () => {
  render(<MainApp />);
  const loader = screen.getByAltText(/loading/i);
  expect(loader).toBeDefined();
});