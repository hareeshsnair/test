import { combineReducers } from 'redux';
import { authentication, logout } from './authReducer';
import { employees } from './userReducer';

const rootReducer = combineReducers({
    authentication,
    logout,
    employees
});

export default rootReducer;