import React from 'react';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import { Authentication, Root } from './components';
import { reducers, middleware } from './store';

const AppRouter = createStackNavigator({
  Login: Authentication.Login,
  Registration: Authentication.Registration,
}, {
  initialRouteName: 'Login',
});

const AuthRouter = createStackNavigator({
  Registration: Authentication.Registration,
}, {
  initialRouteName: 'Registration',
});

const InitialRouter = createSwitchNavigator({
  RouterSelection: Authentication.Selection,
  Auth: AuthRouter,
  App: AppRouter,
}, {
  initialRouteName: 'RouterSelection',
});

const store = createStore(reducers, applyMiddleware(thunk, middleware()));

const App = () => (
  <Provider store={store}>
    <Root>
      <InitialRouter />
    </Root>
  </Provider>
);

export default App;
