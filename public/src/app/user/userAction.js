import axios from 'axios';

import {ME_FROM_TOKEN, ME_FROM_TOKEN_SUCCESS, ME_FROM_TOKEN_FAILURE, RESET_TOKEN} from './userActionType';

import {ROOT_URL} from '../../ultility';

export function meFromToken(tokenFromStorage) {
    //check if the token is still valid, if so, get me from the server

    const request = axios({
        method: 'get',
        url: `${ROOT_URL}/users/me/myInfo`,
        headers: {
            // 'Authorization': `Bearer ${tokenFromStorage}`,
            'x-access-token': tokenFromStorage
        }
    });

    return {
        type: ME_FROM_TOKEN,
        payload: request
    };
}

export function meFromTokenSuccess(currentUser) {
    return {
        type: ME_FROM_TOKEN_SUCCESS,
        payload: currentUser
    };
}

export function meFromTokenFailure(error) {
    return {
        type: ME_FROM_TOKEN_FAILURE,
        payload: error
    };
}


export function resetToken() {//used for logout
    return {
        type: RESET_TOKEN
    };
}