import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    checkbox: false,
    loading: false,
  };

  handleChange = async ({ target }) => {
    this.setState({ checkbox: true, loading: true });
    const { checked } = target;
    const { music } = this.props;
    if (checked) {
      await addSong(music);
    }
    this.setState({
      loading: false,
    });
  };

  render() {
    const { music, favorite } = this.props;
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
          .
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
            onChange={ this.handleChange }
            checked={ checkbox || favorite }
          />
        </label>
        { loading && <Loading /> }
      </section>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.string.isRequired,
  favorite: PropTypes.bool.isRequired,
};

export default MusicCard;
