import React, { Component } from 'react';
import SongList from "./SongList";

import './App.css';


class App extends Component {
  render() {
    return (
      <div className='container'>
          <SongList/>
      </div>
    );
  }
}

export default App;
