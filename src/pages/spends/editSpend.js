import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import api from '../../services/api';

class EditSpend extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spent: {
        category: "",
        value: "",
        date: "",
        observation: ""
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
  async componentDidMount () {
    const { id } = this.props.match.params;

    const response = await api.get(`/spends/${id}`);

    this.setState({ spend: response.data });
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
            <legend>Editar Despesa</legend>

              <div className="form-group">
              <label htmlFor="name">Categoria</label>
              <input
                type="text"
                className="form-control"
                id="category"
                name="category"
                placeholder="category"
                minLength="2"
                maxLength="20"
                value={this.state.spend.category}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="value">Valor</label>
              <input
                type="text"
                className="form-control"
                id="value"
                name="value"
                placeholder="value"
                value={this.state.spend.value}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Data</label>
              <input
                type="date"
                className="form-control"
                id="date"
                name="date"
                placeholder="date"
                value={this.state.spend.date}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="observation">Observação</label>
              <input
                type="text"
                className="form-control"
                id="observation"
                name="observation"
                placeholder="observation"
                minLength="2"
                maxLength="250"
                value={this.state.spend.observation}
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
        spend: { ...prevState.spend, [name]: value }
    }));
  };

  handleSubmit = event => {
    const { id } = this.props.match.params;

    fetch(`http://localhost:5000/ControlCash/spends/${id}`, {
      method: "put",
      id: id,
      body: JSON.stringify(this.state.spend),
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

export default EditSpend;
