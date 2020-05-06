import React from 'react';
import { Bricks } from './NavItems'
function Home() {
  return (

    <div className="Home">
      <h5 className="text-center">Welcome to the Thinkpad Tools GUI</h5>
      <h6 className="text-center">Created by Dev Singh, @devksingh4</h6>
      <Bricks props={[{name: "Trackpoint", sudo: true}, {name: "Battery", sudo: false}]}/>
    </div>
  );
}

export default Home;
