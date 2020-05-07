import React, { Component } from 'react';
import { ScreenHeader } from './ScreenHeader'
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Battery extends Component {
  render() {
    return (
      <div className="Battery">
        <ScreenHeader name="Battery" description="View battery statistics and set thresholds"/>
      </div>
  );
  }
}
