import React from 'react';

import './app.css';
import Standalone from './bootstrap-table/standalone';

import { ReactComponent as Logo } from './logo.svg';
import star from './star.svg';

export function App() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./app.css file.
   */
  return (
    <div className="app">
      <header className="flex">
        
        <h1>Wiki-Knowledge Graph</h1>
      </header>
      
         <Standalone/>
    </div>
  );
}

export default App;
