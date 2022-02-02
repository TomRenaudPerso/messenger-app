import React from 'react';
import ConfigProvider from "antd/lib/config-provider";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

/** HEADER **/
import { Header } from "./components/Header";

/** PAGES **/
import Conversations from './pages/Conversations';
import Messages from "./pages/Messages";
import NotFound from './pages/NotFound';

/** FR LOCALE **/
import locale from "antd/es/locale/fr_FR";

export const App = () => {
  return (
      <ConfigProvider locale={locale}>
        <div>
          <Header />
          <Router>
            <div>
              <Switch>
                <Route path="/conversations" exact={true}>
                  <Conversations />
                </Route>
                <Route
                  path="/conversations/:conversationId/messages"
                  exact={true}
                  render={({ match }) => (
                    <Messages conversationId={match.params.conversationId} />
                  )}
                />
                <Route path="*" exact={true}>
                  <NotFound />
                </Route>
              </Switch>
            </div>
          </Router>
        </div>
      </ConfigProvider>
  );
};
