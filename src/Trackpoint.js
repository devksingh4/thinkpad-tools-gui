import React, { Component } from 'react';
import { ScreenHeader } from './ScreenHeader'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;



export default class Trackpoint extends Component {
  constructor(props) {
    super(props)
    this.state = {speed: 0, sensitivity: 0}
    this.handleSensitivityChange = this.handleSensitivityChange.bind(this);
    this.handleSpeedChange = this.handleSpeedChange.bind(this);
  }
  componentDidMount = () => {
    let tp_values = ipcRenderer.sendSync('get-tp-trackpoint-status', 'hiplzgiveinfo')
    this.setState({speed: tp_values.speed, sensitivity: tp_values.sensitivity})
  }
  handleSpeedChange = (val) => {
    this.setState({speed: val.target.value})
  }
  handleSensitivityChange = (val) => {
    this.setState({sensitivity: val.target.value})
  }
  applyChanges = () => {
    if (this.state.sensitivity > 255 || this.state.speed > 255 || this.state.sensitivity < 0 || this.state.speed < 0) {
      alert("Speed and Sensitivity must be greater than 0 or less than 255")
    } else {
      ipcRenderer.sendSync("set-tp-settings", {sensitivity: this.state.sensitivity, speed: this.state.speed})
    }
    
  }
  render() {
    return (
      <div className="Trackpoint">
      <ScreenHeader name="Trackpoint" description="Set Trackpoint speed and sensitivity"/>
      <Container>
        <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Trackpoint Speed</Form.Label>
          <Form.Control type="number" min="0" max="255" value={this.state.speed} onChange={this.handleSpeedChange} placeholder={this.state.orig_speed} />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Trackpoint Sensitivity</Form.Label>
          <Form.Control type="number" min="0" max="255" value={this.state.sensitivity} onChange={this.handleSensitivityChange} placeholder={this.state.orig_sensitivity} />
        </Form.Group>
        <Button variant="primary" onClick={this.applyChanges}>
          Submit
        </Button>
      </Form>
    </Container>
    </div>
  );
  }
}