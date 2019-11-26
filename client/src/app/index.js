import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {NavBar} from '../components';
import { ActorsList, ActorsInsert, ActorsUpdate } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
              <Route path="/actors/list" exact component={ActorsList} />
              <Route path="/actors/create" exact component={ActorsInsert} />
              <Route
                  path="/actors/update/:id"
                  exact
                  component={ActorsUpdate}
              />
            </Switch>
        </Router>
    );
};

export default App;