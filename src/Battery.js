import React, { Component } from 'react';
import { ScreenHeader } from './ScreenHeader'
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

// value={} onChange={this.handle} 
export default class Battery extends Component {
  constructor(props) {
    super(props)
    const list_tags = ipcRenderer.sendSync('get-battery-tags', 'hiplzgiveinfo')
    const list_items = ipcRenderer.sendSync('get-battery-status', 'hiplzgiveinfo')
    this.state = {chargeStop: list_items[4].substring(0, list_items[4].length - 1), chargeStart: list_items[3].substring(0, list_items[3].length - 1), list_tags: list_tags, list_items: list_items}
  }
  handleChargeStop = (val) => {
    this.setState({chargeStop: val.target.value})
  }
  handleChargeStart = (val) => {
    this.setState({chargeStart: val.target.value})
  }
  applySettings = () => {
    if (this.state.chargeStart > 100 || this.state.chargeStop > 100 || this.state.chargeStart < 0 || this.state.chargeStop < 0) {
      alert("Charge start and stop limits must be greater than 0 or less than 100")
    } else {
      ipcRenderer.sendSync('set-battery-props', {chargeStop: this.state.chargeStop, chargeStart: this.state.chargeStart})
    }
  }
  createTable = () => {
    const list_tags = this.state.list_tags
    const list_items = this.state.list_items
    let table = []
      for (let i = 0; i < list_tags.length; i++) {
        let row; 
        if (i === 0) {
          row = <tr><th colSpan="2" className="text-center">{list_tags[i]}</th></tr>
        } else if (i === 18 || i === 19) {
          row = <tr><td>{list_tags[i]}</td><td>{list_items[i] / 1000000}</td></tr>
        } else if (i === 3) {
          row = <tr><td>{list_tags[i]} (%)</td><td><Form.Control type="number" min="0" max="100" onChange={this.handleChargeStart} value={this.state.chargeStart} placeholder={list_items[i]}/></td></tr>
        } else if (i === 4) {
          row = <tr><td>{list_tags[i]} (%)</td><td><Form.Control type="number" min="0" max="100" onChange={this.handleChargeStop} value={this.state.chargeStop} placeholder={list_items[i]}/></td></tr>
        } else {
          row = <tr><td>{list_tags[i]}</td><td>{list_items[i]}</td></tr>
        }
        table.push(row)
      }
    return table
  }
  render() {
    return (
      <div className="Battery">
        <ScreenHeader name="Battery" description="View battery statistics and set thresholds"/>
        <Container>
          <Table striped bordered hover responsive>
              {this.createTable()}
          </Table>
          <Button onClick={this.applySettings}>Apply Settings</Button>
          <br/>
          <br/>
        </Container>

      </div>
  );
  }
}
