import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  state = {
    nameUser: '',
    isSaveButtonDisabled: true,
    loading: false,
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
    const valueDisable = 3;
    const { nameUser } = this.state;
    if (nameUser.length < valueDisable) {
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
    const { nameUser } = this.state;
    const { history } = this.props;
    // this.setState({ loading: true });
    this.setState({
      // name: '',
      loading: true,
    });
    await createUser({ name: nameUser });
    history.push('/search');
  };

  render() {
    const { nameUser, isSaveButtonDisabled, loading } = this.state;

    return (
      <div data-testid="page-login">
        {
          loading
            ? <Loading />
            : (
              <section>
                <label htmlFor="name">
                  <input
                    type="text"
                    name="nameUser"
                    id="name"
                    value={ nameUser }
                    data-testid="login-name-input"
                    onChange={ this.handleChange }
                  />
                </label>
                <button
                  type="button"
                  name="button"
                  data-testid="login-submit-button"
                  onClick={ this.onSaveButtonClick }
                  disabled={ isSaveButtonDisabled }
                >
                  Entrar
                </button>
              </section>
            )
        }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
