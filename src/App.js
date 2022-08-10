import React from 'react';
import { Button } from 'reactstrap';
import { Router, Link } from '@reach/router';
import Demo from './pages/test1';

class Chooser extends React.Component {

  render() {
    return (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div><h3>Please select the lib</h3></div>
        <Link to='/demo-01'>
          <Button className="btn btn-default">demo 01</Button>
        </Link>
      </div>
    );
  }
}

class App extends React.Component {

  render() {
    return (
      <Router primary={false} style={{display: 'flex', width: '100%', height: '100%'}}>
        <Chooser path='/' />
        <Demo path='/demo-01' />
      </Router>
    );
  }
}

export default App;