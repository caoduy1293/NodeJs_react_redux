import {ME_FROM_TOKEN, ME_FROM_TOKEN_FAILURE, ME_FROM_TOKEN_SUCCESS, RESET_TOKEN} from './userActionType';
import {SIGNIN_USER, SIGNIN_USER_FAILURE, SIGNIN_USER_SUCCESS, LOGOUT_USER} from './login/action/signinType';

const INITIAL_STATE = {
    user: null,
    status: null,
    error: null,
    loading: false
};

export default function (state = INITIAL_STATE, action) {
    let error;

    switch (action.type) {
        case ME_FROM_TOKEN: {
            return {...state, user: null, status: 'storage', error: null, loading: true}
        }
        case ME_FROM_TOKEN_SUCCESS: {
            // console.log(action.payload);
            return {...state, user: action.payload.data, status: 'authenticated', error: null, loading: false};
        }
        case ME_FROM_TOKEN_FAILURE: {
            error = action.payload.data || {message: action.payload.message};
            return {...state, user: null, status: 'storage', error: error, loading: false};
        }
        case RESET_TOKEN: {
            return {...state, user: null, status: 'storage', error: null, loading: false};
        }

        //Login
        case SIGNIN_USER:// sign in user,  set loading = true and status = signin
            return {...state, user: null, status: 'signin', error: null, loading: true};
        case SIGNIN_USER_SUCCESS://return authenticated user,  make loading = false and status = authenticated
            return {...state, user: action.payload.user, status: 'authenticated', error: null, loading: false}; //<-- authenticated
        case SIGNIN_USER_FAILURE:// return error and make loading = false
            error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors
            return {...state, user: null, status: 'signin', error: error, loading: false};
        case LOGOUT_USER:
            return {...state, user: null, status: 'logout', error: null, loading: false};

        default:
            return state;
    }
}