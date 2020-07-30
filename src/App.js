import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';


import { NavigationBar } from './components/Navbar'
import ReverseGeo from './pages/ReverseGeo'

const GridWrapper = styled.div`
  display: grid;
  position: absolute;
  margin-top: 6em;
  width: 99%
`;

const App = () => {
  return (
    <Router>
      <NavigationBar />
      {/* <Sidebar/> */}
      <GridWrapper>
        <div className="row">
          <div className="col-md-12">
          <Switch>
            <Route exact path="/" component={ReverseGeo} />
            <Redirect to="/" />
          </Switch>
          </div>

        </div>
      </GridWrapper>
      
    </Router>
  )
}

export default App
