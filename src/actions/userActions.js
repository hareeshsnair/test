import { authConstants, userConstants } from '../constants';
import { authService, userService } from '../services';

export const userActions = {
    login,
    fetchEmployees
};

function login(username, password) {
    
    return dispatch => {
        dispatch(request({username}));

        authService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request(user) { return { type: authConstants.LOGIN_REQUEST, user } };
    function success(user) { return { type: authConstants.LOGIN_SUCCESS, user } };
    function failure(error) { return { type: authConstants.LOGIN_FAILURE, error } };
}

function fetchEmployees() {
    return dispatch => {
        dispatch(request());

        userService.fetchEmployees()
            .then(
                employees => {
                    dispatch(success(employees));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request() { return { type: userConstants.GET_EMPLOYEES_REQUEST, employees:{} } };
    function success(employees) { return { type: userConstants.GET_EMPLOYEES_SUCCESS, employees } };
    function failure(error) { return { type: userConstants.GET_EMPLOYEES_FAILURE, error } };
}

function logout() {
    authService.logout();
    return { type: authConstants.LOGOUT };
}