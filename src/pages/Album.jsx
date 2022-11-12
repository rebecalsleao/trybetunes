import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends React.Component {
  state = {
    musics: [],
    album: {},
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    const musicAlbum = musics.filter((music) => music.trackName);
    this.setState({ musics: musicAlbum, album: musics[0] });
  }

  render() {
    const { album, musics } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{ album.artistName }</p>
        <p data-testid="album-name">{ album.collectionName }</p>
        { musics.map((music) => <MusicCard key={ music.id } music={ music } />)}
        <p />
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }).isRequired,
  }).isRequired,
};

export default Album;
