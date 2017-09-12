import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './app/app';
import LoginPage from './app/user/login/loginPage';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={LoginPage}/>
    </Route>
);