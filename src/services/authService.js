import axios from 'axios'

export const authService = {
    login,
    logout,
};

function login(username, password) {
    
    const requestOptions = {
        headers: { 'Content-Type' : 'application/json' },
    };
    const params = {
        email: username, 
        password: password,
        returnSecureToken: true,
    }
    return axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyACo-mIvw3QEWL3mx9v4jx1gsl8dHKJH6g', params, requestOptions)
        .then(handleResponse, handleError)
        .then(user => {
            if(user && user.idToken) {
                localStorage.setItem('idToken', user.idToken);
            }
            return user;
        })
}

function logout() {
    const requestOptions = {
        /** This appends the authorization header with other headers in the request. */
        headers: { 'Content-Type' : 'application/json' }
    };
    return axios.get(`v1/logout`, requestOptions)
                .then(handleResponse, handleError)
                .then(user => {
                    // remove user from local storage to log user out
                    localStorage.removeItem('user');
                    return user;
                })
                .catch(function (response) {
                    return Promise.reject(response);
                });
}

function handleResponse(response) { 
    return new Promise((resolve, reject) => {  
        resolve(response.data)
    });
}

function handleError(error) { 
    return Promise.reject(error && error.response.data.error.message);
}