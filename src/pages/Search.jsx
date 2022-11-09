import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    name: '',
    isSaveButtonDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, () => {
      this.saveButtonDisabled();
    });
  };

  saveButtonDisabled = () => {
    const valueDisable = 2;
    const { name } = this.state;
    if (name.length < valueDisable) {
      this.setState({
        isSaveButtonDisabled: true,
      });
    } else {
      this.setState({
        isSaveButtonDisabled: false,
      });
    }
  };

  render() {
    const { name, isSaveButtonDisabled } = this.state;
    return (
      <section>
        <div data-testid="page-search">
          <Header />
        </div>
        <input
          data-testid="search-artist-input"
          name="name"
          value={ name }
          type="text"
          placeholder="Nome dos Artista"
          onChange={ this.handleChange }
        />
        <button
          data-testid="search-artist-button"
          type="button"
          name="button"
          onClick={ this.onSaveButtonClick }
          disabled={ isSaveButtonDisabled }
        >
          Pesquisar

        </button>
      </section>
    );
  }
}

export default Search;
