import React from 'react';
import Search from './Components/Search';
import Header from './Components/Header'

export default () => {
    return (
      <div className="container">
        <Header />
        <Search name="bloating" />
      </div>
    );
  };
  