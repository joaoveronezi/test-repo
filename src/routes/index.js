import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nodes from "../pages/Nodes/Nodes";
import NotFoundPage from "../pages/NotFoundPage";


const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Nodes} />
        <Route exact path="/error" component={NotFoundPage} />
      </Switch>
    </Router>
  )
}

export default Routes;