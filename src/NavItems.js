import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

export class Bricks extends Component {
    // componentDidMount() {
    // }
  
    // componentWillUnmount() {
    // }
    createGroup = () => {
      let group = []
      for (let i = 0; i < this.props.props.length; i++) {
        group.push(<Link to={this.props.props[i].name.toLowerCase()}><Card><Card.Body><Card.Title>{this.props.props[i].name}</Card.Title><Card.Text>Edit {this.props.props[i].name} properties. {this.props.props[i].sudo ? "Requires superuser access." : ""} </Card.Text></Card.Body></Card></Link>)
      }
      return group
    }
    render() {
      return (
        <div aria-label="Property chooser">
          {this.createGroup()}
        </div>
      );
    }
}

export class ScreenHeader extends Component {
  render() {
    return (
      <div aria-label="Screen Header">
        <h5 className="text-center">{this.props.name} Settings</h5>
        <Link to = "/"><h6 className="text-center">Go Home</h6></Link>
      </div>
    );
  }
}