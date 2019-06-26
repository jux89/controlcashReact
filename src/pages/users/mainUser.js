import React, { Component } from 'react';
import api from '../../services/api';
import robot from "./../../assets/robot.png";
import { Link } from "react-router-dom";

export default class User extends Component {
    state = {
        user: [],
    };

    async componentDidMount () {
        const response = await api.get(`/users`);
        const { docs } = response.data;
        this.setState({ user: docs });
    }

    render() {
        const { user } = this.state;
        return user.map((user, index) => (
            <div className="user-info">
                <div key={index} className="card mb-4">
                    <h5 className="card-header">{user.name}</h5>
                    <div className="card-body">
                        <div className="media">
                            <img className="mr-3" src={robot} alt="Usuário" />
                            <div className="media-body">
                                <h5 className="mt-0 mb-1">{user.telephone}</h5>
                                <p>{user.email}</p>
                            </div>
                        </div>
                        <div className="text-right">
                      
                            <Link
                                to={`/deleteUser/${user._id}`}
                                className="btn btn-danger mr-3"
                                role="button"
                            >
                                E X C L U I R
              </Link>
                            <Link
                                to={`/editUser/${user._id}`}
                                className="btn btn-primary"
                                role="button"
                            >
                                E D I T A R
              </Link>
                        </div>
                    </div>
                </div>
            </div>
         ))
        };
    }