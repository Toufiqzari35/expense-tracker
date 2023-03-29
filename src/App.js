import React from 'react';
import {Route, Switch } from "react-router";
import Home from './Home';
import Navbar from './Navbar';
import Records from './Records';
import YearMonthPcker from './YearMonthPicker';

function App() {

  return (
    <>
      <Navbar />
      <div className="container" style={{marginTop : '60px'}}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/yearly" component={YearMonthPcker}/>
        <Route exact path="/records" render={ () => <Records />}/>
        <Route>
          404 Error
        </Route>
      </Switch>
      </div>
    </>
  );
}

export default App;
