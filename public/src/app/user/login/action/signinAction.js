import axios from 'axios';
import {SIGNIN_USER, SIGNIN_USER_SUCCESS, SIGNIN_USER_FAILURE, LOGOUT_USER } from './signinType';
import { ROOT_URL } from '../../../../ultility';

export function signInUser(dataUser){
    const request = axios.post(`${ROOT_URL}/users/authenticate`, dataUser);
    return {
        type: SIGNIN_USER,
        payload: request
     };
}

export function signinSuccess(user){
    return {
        type: SIGNIN_USER_SUCCESS,
        payload: user
    };
}

export function signinError(error){
    return {
        type: SIGNIN_USER_FAILURE,
        payload: error
    };
}

export function logoutUser() {
    return {
        type: LOGOUT_USER
    };
}