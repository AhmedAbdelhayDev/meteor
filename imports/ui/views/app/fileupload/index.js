import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import CommonPage from "./common";

const FileUploadPage = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Route render={props => <CommonPage {...props} />} />
            {/* <Redirect exact from={`${match.url}/`} to={`${match.url}/northeast`} /> */}
            {/* <Route
        path={`${match.url}/northeast`}
        render={props => <NortheastPage {...props} />}
      />
      <Route
        path={`${match.url}/northwest`}
        render={props => <NorthwestPage {...props} />}
      />
      <Route
        path={`${match.url}/southeast`}
        render={props => <SoutheastPage {...props} />}
      />
      <Route
        path={`${match.url}/southwest`}
        render={props => <SouthwestPage {...props} />}
      />
      <Route
        path={`${match.url}/south`}
        render={props => <SouthPage {...props} />}
      />
      <Route
        path={`${match.url}/north`}
        render={props => <NorthPage {...props} />}
      />
      <Route
        path={`${match.url}/island`}
        render={props => <IslandPage {...props} />}
      /> */}
            <Redirect to="/error" />
        </Switch>
    </Suspense>
);
export default FileUploadPage;
