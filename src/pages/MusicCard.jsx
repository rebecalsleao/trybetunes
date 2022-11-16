import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    checkbox: false,
    loading: false,
  };

  async componentDidMount() {
    const saveMusics = await getFavoriteSongs();
    const { music } = this.props;
    this.setState(
      { checkbox: saveMusics.some((saveMusic) => (
        saveMusic.trackId === music.trackId)) },
    );
  }

  handleChange = async ({ target }) => {
    const { checked } = target;
    const { music } = this.props;
    this.setState({ loading: true });
    if (checked) {
      await addSong(music);
      this.setState({ checkbox: true, loading: false });
    } else {
      await removeSong(music);
      this.setState({ checkbox: false, loading: false });
    }
  };

  render() {
    const { music } = this.props;
    const { checkbox, loading } = this.state;
    return (
      <section>
        <div>{ music.trackName }</div>
        <audio data-testid="audio-component" src={ music.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
        </audio>
        <label
          htmlFor="checkbox"
          data-testid={ `checkbox-music-${music.trackId}` }
        >
          {' '}
          Favorita
          <input
            type="checkbox"
            id="checkbox"
            name={ music.trackId }
            onChange={ (event) => this.handleChange(event) }
            checked={ checkbox }
          />
        </label>
        { loading && <Loading /> }
      </section>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({ trackId: PropTypes.number,
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
  }).isRequired,
};

export default MusicCard;
