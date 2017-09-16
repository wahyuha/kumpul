import axios from 'axios'

export function fetchUsers() {
    return function(dispatch) {
        axios.get(process.env.API_URL+'users')
        .then((response) => {
            dispatch({
                type: 'FETCH_USERS_SUCCESS',
                payload: response.data
            })
        })
        .catch((error) => {
            dispatch({
                type: "FETCH_USERS_FAILED",
                payload: error
            })
        })
    }
}

export function getUser(userId) {
    return {
        type: 'GET_USER', payload: userId
    }
}

export function addOrEditUser(user) {
    return {
        type: 'ADD_OR_EDIT_USER', payload: user
    }
}

export function deleteUser(userId) {
    return {
        type: 'DELETE_USER', payload: userId
    }
}
