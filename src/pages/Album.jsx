import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import Loading from './Loading';

class Album extends React.Component {
  state = {
    musics: [],
    album: {},
    loading: false,
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState({ loading: true });
    const musics = await getMusics(id);
    const musicAlbum = musics.filter((music) => music.trackName);
    this.setState({ musics: musicAlbum, album: musics[0] });
    this.setState({ loading: false });
  }

  render() {
    const { album, musics, loading } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{ album.artistName }</p>
        <p data-testid="album-name">{ album.collectionName }</p>
        { musics.map((music) => (<MusicCard
          key={ music.trackId }
          music={ music }
        />))}
        <p />
        { loading && <Loading /> }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default Album;
