import { FETCH_PROTECTED_DATA_REQUEST, RECEIVE_PROTECTED_DATA, FETCH_DATA_REQUEST, RECEIVE_DATA } from '../constants/index';
import { parseJSON } from '../utils/misc';
import { data_about_user, get_all_posts } from '../utils/http_functions';
import { logoutAndRedirect } from './auth';

export function receiveProtectedData(data) {
    return {
        type: RECEIVE_PROTECTED_DATA,
        payload: {
            data,
        },
    };
}

export function fetchProtectedDataRequest() {
    return {
        type: FETCH_PROTECTED_DATA_REQUEST,
    };
}

export function receiveData(data) {
    return {
        type: RECEIVE_DATA,
        payload: {
            data,
        },
    };
}

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST,
    };
}

// TODO: this should be generalized
export function fetchProtectedData(token) {
    return (dispatch) => {
        dispatch(fetchProtectedDataRequest());
        data_about_user(token)
            .then(parseJSON)
            .then(response => {
                dispatch(receiveProtectedData(response.result));
            })
            .catch(error => {
                if (error.status === 401) {
                    dispatch(logoutAndRedirect(error));
                }
            });
    };
}


export function fetchPostData() {
    return (dispatch) => {
        dispatch(fetchDataRequest());
        get_all_posts()
            .then(parseJSON)
            .then(response => {
                dispatch(receiveData(response.result));
            })
            .catch(error => {
                if (error.status === 401) {
                    dispatch(logoutAndRedirect(error));
                }
            });
    };
}

