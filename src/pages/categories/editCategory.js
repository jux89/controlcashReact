import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import api from '../../services/api';

class EditCategory extends Component {
  constructor(props) {
    super(props);

     this.state = {
        category: {
        name: "",
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

    const response = await api.get(`/categories/${id}`);

    this.setState({ category: response.data });
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
            <legend>Editar Categoria</legend>

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id=""
                name="name"
                placeholder="name"
                minLength="2"
                maxLength="40"
                value={this.state.category.name}
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
        category: { ...prevState.category, [name]: value }
    }));
  };

  handleSubmit = event => {
    const { id } = this.props.match.params;

    fetch(`http://localhost:5000/ControlCash/categories/${id}`, {
      method: "put",
      id: id,
      body: JSON.stringify(this.state.category),
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

export default EditCategory;
