import axios from '../axios-db'

export const userService = {
    fetchEmployees,
};

function fetchEmployees() {
    
    return axios.get('/employees.json')
        .then(handleResponse, handleError)
        .then(employees => {
            return employees;
        })
}

function handleResponse(response) { 
    return new Promise((resolve, reject) => {  
        resolve(response.data)
    });
}

function handleError(error) { 
    return Promise.reject(error && error.response.data.error.message);
}