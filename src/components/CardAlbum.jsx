import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CardAlbum extends Component {
  render() {
    const { album } = this.props;
    const { artistName, collectionName, artworkUrl100, collectionId } = album;

    return (
      <div>
        <Link
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/${collectionId}` }
        >
          <img src={ artworkUrl100 } alt={ collectionName } />
          <h4>{ collectionName }</h4>
          <p>{ artistName }</p>
        </Link>
      </div>
    );
  }
}

CardAlbum.propTypes = {
  album: PropTypes.shape({
    artistName: PropTypes.string,
    collectionId: PropTypes.number,
    collectionName: PropTypes.string,
    artworkUrl100: PropTypes.string,
  }).isRequired,
};

export default CardAlbum;
