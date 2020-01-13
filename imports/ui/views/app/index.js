import React, { Component, Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from '../../layout/AppLayout';

const Dashboards = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './dashboards')
);

const NewSitePage = React.lazy(() =>
  import(/* webpackChunkName: "newsite" */ './newsite')
);

const SiteViewerPage = React.lazy(() =>
  import(/* webpackChunkName: "newsite" */ './siteviewer')
);

const FileManager = React.lazy(() =>
  import(/* webpackChunkName: "newsite" */ './filemanager')
);

const Notifications = React.lazy(() =>
  import(/* webpackChunkName: "newsite" */ './notification')
);

const Reporting = React.lazy(() =>
  import(/* webpackChunkName: "newsite" */ './reporting')
);

class App extends Component {
  render() {
    const { match } = this.props;

    return (
      <AppLayout>
        <div className="dashboard-wrapper">
          <Suspense fallback={<div className="loading" />}>
            <Switch>
              <Redirect
                exact
                from={`${match.url}/`}
                to={`${match.url}/dashboards`}
              />
              <Route
                path={`${match.url}/dashboards`}
                render={props => <Dashboards {...props} />}
              />
              <Route
                path={`${match.url}/newsite`}
                render={props => <NewSitePage {...props} />}
              />
              <Route
                path={`${match.url}/siteviewer`}
                render={props => <SiteViewerPage {...props} />}
              />
              <Route
                path={`${match.url}/filemanager`}
                render={props => <FileManager {...props} />}
              />
              <Route
                path={`${match.url}/notifications`}
                render={props => <Notifications {...props} />}
              />
              <Route
                path={`${match.url}/reporting`}
                render={props => <Reporting {...props} />}
              />
              <Redirect to="/error" />
            </Switch>
          </Suspense>
        </div>
      </AppLayout>
    );
  }
}
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(App)
);
