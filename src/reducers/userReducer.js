import { userConstants } from '../constants';

let user = localStorage.getItem('idToken');

const initialState = user ? { loggedIn: true, user } : {};

export function employees(state = initialState, action) {
    switch( action.type ) {
        case userConstants.GET_EMPLOYEES_REQUEST: 
        return {
            request: true,
            data: action.employees,
        };
        case userConstants.GET_EMPLOYEES_SUCCESS:
        return {
            response: true,
            data: action.employees,
        };
        case userConstants.GET_EMPLOYEES_FAILURE:
        return {
            response: false,
            error: action.error,
        };
        default: return state;
    
    }
}