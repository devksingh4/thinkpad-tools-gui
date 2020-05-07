import React from 'react';
import { Bricks } from './Brick'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
function Home() {
  return (
    <div className="Home">
      <Jumbotron fluid>
        <Container>
          <h1>Thinkpad Tools (GUI)</h1>
          <p>A GUI wrapper for the thinkpad-tools CLI tool</p>
          <p>Created by <a href="https://github.com/devksingh4/" target="_blank" rel="noopener noreferrer">Dev Singh</a> (who happens to be looking for internships)</p>
        </Container>
      </Jumbotron>
      <Bricks props={[{name: "Trackpoint", sudo: true}, {name: "Battery", sudo: true}]}/>
    </div>
  );
}

export default Home;
