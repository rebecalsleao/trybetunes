import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Album extends React.Component {
  state = {
    musics: [],
    album: {},
    loading: false,
    favoriteSongs: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState({ loading: true });
    const musics = await getMusics(id);
    const musicAlbum = musics.filter((music) => music.trackName);
    this.setState({ musics: musicAlbum, album: musics[0] });
    const favorite = await getFavoriteSongs();
    this.setState({ loading: false, favoriteSongs: favorite });
  }

  render() {
    const { album, musics, loading, favoriteSongs } = this.state;
    console.log(musics);

    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{ album.artistName }</p>
        <p data-testid="album-name">{ album.collectionName }</p>
        { musics.map((music) => (<MusicCard
          key={ music.id }
          music={ music }
          favorite={ favoriteSongs.find((favoriteSong) => (
            favoriteSong.trackId === music.trackId)) }
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
      id: PropTypes.number,
    }).isRequired,
  }).isRequired,
};

export default Album;
