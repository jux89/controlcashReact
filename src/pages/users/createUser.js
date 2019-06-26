import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        name: "",
        email: "",
        passowrd: "",
        telephone: ""
      },
      erro: null,
      redirect: false
    };
  }

  exibeErro() {
    const { erro } = this.state;

    if (erro) {
      return (
        <div className="alert alert-danger" role="alert">
          Erro de conexão com o servidor
        </div>
      );
    }
  }

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to="/" />;
    } else {
      return (
        <form onSubmit={this.handleSubmit}>
          {this.exibeErro()}

          <fieldset>
            <legend>Criar Usuário</legend>
            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                className="form-control"
                id=""
                name="name"
                placeholder="name"
                minLength="2"
                maxLength="40"
                value={this.state.user.name}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                placeholder="email"
                minLength="2"
                maxLength="60"
                value={this.state.user.email}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <input
                type="text"
                className="form-control"
                id="password"
                name="passwordd"
                placeholder="password"
                minLength="2"
                maxLength="30"
                value={this.state.user.password}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="telephone">Telefone</label>
              <input
                type="number"
                className="form-control"
                id="telephone"
                name="telephone"
                placeholder="telephone"
                minLength="2"
                maxLength="9"
                value={this.state.user.telephone}
                onChange={this.handleInputChange}
              />
            </div>
           
            <button type="submit" className="btn btn-primary">
              S A L V A R
            </button>
          </fieldset>
        </form>
      );
    }
  }

  handleInputChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState(prevState => ({
      user: { ...prevState.user, [name]: value }
    }));
  };

  handleSubmit = event => {
    fetch("http://localhost:5000/ControlCash/users", {
      method: "post",
      body: JSON.stringify(this.state.user),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(data => {
        if (data.ok) {
          this.setState({ redirect: true });
        } else {
          data.json().then(data => {
            if (data.error) {
              this.setState({ erro: data.error });
            }
          });
        }
      })
      .catch(erro => this.setState({ erro: erro }));

    event.preventDefault();
  };
}

export default CreateUser;
