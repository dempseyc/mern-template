import axios from 'axios'

import { createSlice } from '@reduxjs/toolkit'

import { loadTodos } from '../todos/todosSlice'

const headers = () => { return (
    {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`
        }
    } )
}

export function createUser (details) {
    return function (dispatch) {
        const url = process.env.REACT_APP_API_URL_DEV+'/api/user/create'
        return axios.post(url, {
            // user: {
                f_name: details.f_name,
                l_name: details.l_name,
                email: details.email,
                password: details.password
            // }
        })
        .then(response => {
            dispatch(createUserSuccess(response.data))
            dispatch(loginUser(details))
        })
        .catch(error => dispatch(createUserFailure(error)))
    }
}

export function updateUser (details) {
    return function (dispatch) {
        const url = process.env.REACT_APP_API_URL_DEV+'/api/user/'+localStorage.id+'/update'
        const loginDetails = {email: details.email, password: details.newPassword}
        return axios.put(url, details, headers())
        .then(response => {
            dispatch(updateUserSuccess(response.data))
            dispatch(loginUser(loginDetails))
        })
        .catch(error => dispatch(updateUserFailure(error)))
    }
}

export function deleteUser () {
    return function (dispatch) {
        const url = process.env.REACT_APP_API_URL_DEV+'/api/user/'+localStorage.id+'/delete'
        return axios.post(url,{},headers())
        .then(response => {
            dispatch(deleteUserSuccess(response.data))
            dispatch(removeToken())
        })
    }
}

export function loginUser (details) {
    console.log('login')
    return function (dispatch) {
        var basicAuth = 'Basic ' + btoa(details.email + ':' + details.password)
        let url = process.env.REACT_APP_API_URL_DEV+'/api/auth/login'
        return axios.post(url, {email: details.email}, {
            headers: {
                'auth': basicAuth,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        .then(response => dispatch(receiveToken(response.data)))
        .catch(error => dispatch(loginUserFailure(error)))
    }
}

function receiveToken (data) {
    return function (dispatch) {
        localStorage.setItem('token',data.token)
        localStorage.setItem('id',data.user_id)
        dispatch(fetchUser())
    }
}

export function removeToken () {
    return function (dispatch) {
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        dispatch(logoutUser())
    }
}

export function fetchUser () {
    // console.log('fetchuser')
    return function (dispatch) {
        const token = localStorage.token
        const id = localStorage.id
        const url = `${process.env.REACT_APP_API_URL_DEV}/api/user/${id}`
        if (token) {
            return axios.get(url, headers())
            .then((response) => {
                dispatch(loadTodos(response.data.todos));
                dispatch(fetchUserSuccess(response.data));
            })
            .catch(error => dispatch(fetchUserFailure(error)))
        } else {
            console.log('no token')
        }
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState: { profile: {}, loggedIn: false },
    reducers: {
        createUserSuccess(state, action) {
            const { id } = action.payload
            state.id = id
            return state
        },
        createUserFailure(state, action) {
            const error  = action.payload
            return {...state, error}
        },
        updateUserSuccess(state, action) {
            return action.payload
        },
        updateUserFailure(state, action) {
            const error  = action.payload
            return {...state, error}
        },
        deleteUserSuccess(state, action) {
            return action.payload
        },
        deleteUserFailure(state, action) {
            const error  = action.payload
            return {...state, error}
        },
        fetchUserSuccess(state, action) {
            let profile = action.payload
            // pick with destructuring IIFE
            profile = (({created_on,email,f_name,l_name,recently_active_on}) => ({created_on,email,f_name,l_name,recently_active_on}))(profile)
            return {...state, profile, loggedIn: true }
        },
        fetchUserFailure(state, action) {
            const { error } = action.payload.response.statusText
            return {...state, error}
        },
        loginUserFailure(state, action) {
            const { error } = action.payload.response.data.message
            return {...state, error}
        },
        logoutUser(state, action) {
            return { profile: {}, loggedIn: false }
        },
    }
})

export const { 
    createUserSuccess,
    createUserFailure,
    updateUserSuccess,
    updateUserFailure,
    deleteUserSuccess,
    deleteUserFailure,
    fetchUserSuccess,
    fetchUserFailure,
    loginUserFailure,
    logoutUser,
    // lookupEmail
} = userSlice.actions

export default userSlice.reducer