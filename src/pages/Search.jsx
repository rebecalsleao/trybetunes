import React from 'react';
import Loading from '../index.css';

class Search extends React.Component {
  render() {
    return (
      <div data-testid="page-search">
        <Loading className="loading">Carregando...</Loading>
      </div>

    );
  }
}

export default Search;
