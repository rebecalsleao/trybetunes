import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';
import Links from './Link';

class Header extends React.Component {
  state = {
    name: {},
    loading: true,
  };

  async componentDidMount() {
    const objectUser = await getUser();
    this.setState({ name: objectUser.name, loading: false });
  }

  render() {
    const { name, loading } = this.state;

    if (loading) return (<Loading />);

    return (

      <header data-testid="header-component">
        <p data-testid="header-user-name">{ name }</p>
        <Links />
      </header>

    );
  }
}

export default Header;
