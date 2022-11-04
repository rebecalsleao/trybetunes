import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import Loguin from './pages/Loguin';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';

class App extends Component.React {
  render() {
    return (
      <BrowserRouter>
        <switch>
          <Route>
            <Route path="/" component={ Loguin } />
            <Route path="/search" component={ Search } />
            <Route path="/album/:id" component={ Album } />
            <Route path="/favorites" component={ Favorites } />
            <Route path="/profile" component={ Profile } />
            <Route path="/profile/edit" component={ ProfileEdit } />
            <Route path="/" component={ NotFound } />
          </Route>
        </switch>
      </BrowserRouter>
    );
  }
}

export default App;
