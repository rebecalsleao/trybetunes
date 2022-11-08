import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default class Links extends Component {
  render() {
    return (
      <div>
        <Link data-testid="link-to-search" to="/search">Search</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
        <Link data-testid="link-to-profile" to="/profile">Profile</Link>
      </div>
    );
  }
}
