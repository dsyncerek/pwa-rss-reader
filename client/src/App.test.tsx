import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import App from './App';

describe('App', () => {
  it('should render without crashing', () => {
    const container = document.createElement('div');
    render(<App />, container);
    unmountComponentAtNode(container);
  });
});
