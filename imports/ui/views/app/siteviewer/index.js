import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import CommonPage from "./common";

// const NortheastPage = React.lazy(() =>
//   import(/* webpackChunkName: "pages-blog" */ './northeast')
// );
// const NorthwestPage = React.lazy(() =>
//   import(/* webpackChunkName: "pages-blog" */ './northwest')
// );
// const SoutheastPage = React.lazy(() =>
//   import(/* webpackChunkName: "pages-blog" */ './southeast')
// );
// const SouthwestPage = React.lazy(() =>
//   import(/* webpackChunkName: "pages-blog" */ './southwest')
// );
// const SouthPage = React.lazy(() =>
//   import(/* webpackChunkName: "pages-blog" */ './south')
// );
// const NorthPage = React.lazy(() =>
//   import(/* webpackChunkName: "pages-blog" */ './north')
// );
// const IslandPage = React.lazy(() =>
//   import(/* webpackChunkName: "pages-blog" */ './island')
// );

const SiteViewerPage = ({ match }) => (
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
export default SiteViewerPage;
