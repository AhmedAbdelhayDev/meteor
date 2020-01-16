import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import CommonPage from "./common";

const SiteViewerPage = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Route render={props => <CommonPage {...props} />} />
            <Redirect to="/error" />
        </Switch>
    </Suspense>
);
export default SiteViewerPage;
