import React from 'react';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  state = {
    name: '',
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
    const { name } = this.state;
    if (name.length < valueDisable) {
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
    const { name } = this.state;
    this.setState({ loading: true });
    await createUser({ name });
    this.setState({
      name: '',
    });
  };

  render() {
    const { name, isSaveButtonDisabled, loading } = this.state;

    if (loading) return <Loading />;

    return (
      <div data-testid="page-login">
        <label htmlFor="name">
          <input
            type="name"
            name="name"
            id="name"
            value={ name }
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
      </div>
    );
  }
}

export default Login;
