import React from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import CardAlbum from '../components/CardAlbum';

class Search extends React.Component {
  state = {
    name: '',
    nameArtist: '',
    isSaveButtonDisabled: true,
    album: [],
    loading: false,
    request: false,
    vazio: false,
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

  onSaveButtonClick = async () => {
    this.setState({ loading: true });
    const { name } = this.state;
    const response = await searchAlbumsAPI(name);
    if (response.length > 0) {
      this.setState({ album: response });
      this.setState({ loading: false });
      this.setState({ request: true });
      this.setState({
        nameArtist: name,
        name: '',
      });
    } else {
      this.setState({ vazio: true });
      this.setState({ album: response });
      this.setState({ loading: false });
      this.setState({ request: true });
    }
  };

  render() {
    const { name,
      isSaveButtonDisabled, album, loading, request, vazio, nameArtist } = this.state;
    return (
      <section>
        <div data-testid="page-search">
          <Header />
          { loading ? <Loading /> : (
            <div>
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
              <div>
                { request && (
                  <div>
                    {
                      vazio ? <p>Nenhum álbum foi encontrado</p>
                        : (
                          <p>
                            Resultado de álbuns de:
                            {' '}
                            { nameArtist }
                          </p>
                        )
                    }
                    { album.map((e) => (<CardAlbum
                      key={ e.collectionId }
                      album={ e }
                    />))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

      </section>
    );
  }
}

export default Search;
