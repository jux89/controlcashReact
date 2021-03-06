import React, { Component } from 'react';
import api from '../../services/api';
import robot from "./../../assets/robot.png";
import { Link } from "react-router-dom";

export default class Spend extends Component {
    state = {
        spend: [],
    };

    async componentDidMount () {
        //const { id } = this.props.match.params;

        const response = await api.get(`/spends`);
        const { docs } = response.data;
        this.setState({ spend: docs });
    }

    render() {
        const { spend } = this.state;
        return spend.map((spend, index) => (
            <div className="user-info">
                <div key={spend._id} className="card mb-4">
                    <h5 className="card-header">{spend.category}</h5>
                    <div className="card-body">
                        <div className="media">
                            <img className="mr-3" src={robot} alt="Usuário" />
                            <div className="media-body">
                                <h5 className="mt-0 mb-1">{spend.value}</h5>
                                <p>{spend.date}</p>
                                <p>{spend.observation}</p>
                            </div>
                        </div>
                        <div className="text-right">
                        
                            <Link
                                to={`/deleteSpend/${spend._id}`}
                                className="btn btn-danger mr-3"
                                role="button"
                            >
                                E X C L U I R
              </Link>
                            <Link
                                to={`/editSpend/${spend._id}`}
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