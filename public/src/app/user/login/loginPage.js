import React, { Component } from 'react';
import HeaderContainer from '../../../common/header/headerContainer';
import LoginContainer from './loginContainer';

class Login extends Component {
    render(){
        return (
            <div>
                <HeaderContainer type="posts_new"/>
                <LoginContainer />
            </div>
        );
    }
}
export default Login;