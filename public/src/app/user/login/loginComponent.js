import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { reduxForm, Field, SubmissionError } from 'redux-form';

import renderField from '../../../common/renderField/renderField';
import { signInUser, signinError, signinSuccess } from './action/signinAction';

//Client side validation
function validate(values) {
    var errors = {};
    var hasErrors = false;
    if (!values.username || values.username.trim() === '') {
        errors.username = 'Enter username';
        hasErrors = true;
    }
    if (!values.password || values.password.trim() === '') {
        errors.password = 'Enter password';
        hasErrors = true;
    }
    return hasErrors && errors;
}

//For any field errors upon submission (i.e. not instant check)
const validateAndSignInUser = (values, dispatch) => {
    return dispatch(signInUser(values))
        .then((result) => {
            // Note: Error's "data" is in result.payload.response.data (inside "response")
            // success's "data" is in result.payload.data
            if ( (result.payload.response && result.payload.response.status !== 200) || result.payload.data.success === false) {
                dispatch(signinError(result.payload.data));
                throw new SubmissionError(result.payload.data.err);
            }
            // console.log(result);
            //Store JWT Token to browser session storage
            //If you use localStorage instead of sessionStorage, then this w/ persisted across tabs and new windows.
            //sessionStorage = persisted only in current tab
            sessionStorage.setItem('jwtToken', result.payload.data.data.token);
            //let other components know that everything is fine by updating the redux` state
            dispatch(signinSuccess(result.payload.data.data)); //ps: this is same as dispatching RESET_USER_FIELDS
        });
};

class LoginComponent extends Component{
    static contextTypes = {
        router: PropTypes.object
    };
    componentWillMount(){
        this.props.resetMe();
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.user.status === 'authenticated' && nextProps.user.user && !nextProps.user.error) {
            this.context.router.push('/');
        }

        //error
        //Throw error if it was not already thrown (check this.props.user.error to see if alert was already shown)
        //If u dont check this.props.user.error, u may throw error multiple times due to redux-form's validation errors
        if (nextProps.user.status === 'signin' && !nextProps.user.user && nextProps.user.error && !this.props.user.error) {
            alert(nextProps.user.error.message);
        }
    }

    render() {
        const {asyncValidating, handleSubmit, submitting} = this.props;
        return (
            <div className="container">
                <form onSubmit={ handleSubmit(validateAndSignInUser) }>
                    <Field
                        name="userName"
                        type="text"
                        component={ renderField }
                        label="@username*" />
                    <Field
                        name="passWord"
                        type="password"
                        component={ renderField }
                        label="Password*" />
                    <div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={ submitting }>
                            Submit
                        </button>
                        <Link
                            to="/"
                            className="btn btn-error"> Cancel
                        </Link>
                    </div>
                </form>
            </div>
        )
    }

}

export default reduxForm({
    form: 'LoginComponent',
    validate
})(LoginComponent);