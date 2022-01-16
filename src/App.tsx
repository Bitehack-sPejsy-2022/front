import React, { useState } from "react";
import { Route, Switch } from "react-router";

import routes from "./routes";

const App: React.FC = () => (
  <>
    <Switch>
      <Route exact path="/" component={routes.HomePage} />
      <Route exact path="/citychoose" component={routes.CityChoosePoi} />
      <Route exact path="/route" component={routes.RoutePage} />
      {/* <Route component={routes.404} /> */}
    </Switch>
  </>
);

export default App;
