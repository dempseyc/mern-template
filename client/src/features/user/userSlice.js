import axios from 'axios'

import { createSlice } from '@reduxjs/toolkit'

export function createUser (details) {
    return function (dispatch) {
        const url = process.env.REACT_APP_API_URL_DEV+'/api/user/create'
        return axios.post(url, {
            user: {
                f_name: details.f_name,
                l_name: details.l_name,
                email: details.email,
                password: details.password
            }
        })
        .then(response => {
            dispatch(createUserSuccess(response.data))
            dispatch(loginUser(details))
        })
        .catch(error => dispatch(createUserFailure(error)))
    }
}

export function loginUser (details) {
    return function (dispatch) {
        dispatch(setCredentials(details));
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

export function removeToken (username) {
    return function (dispatch) {
        dispatch(logoutUser())
        localStorage.removeItem('token')
        localStorage.removeItem('id')
    }
}

export function fetchUser (id) {
    return function (dispatch) {
        const token = localStorage.token
        const id = localStorage.id
        const url = `${process.env.REACT_APP_API_URL_DEV}/api/user/${id}`
        if (token) {
            return axios.get(url, {
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': `Bearer ${token}`
                }
            })
            .then(response => dispatch(fetchUserSuccess(response.data)))
            .catch(error => dispatch(fetchUserFailure(error)))
        }
    }
}

// export function getCredentials() {
//     return state.credentials
// }

const userSlice = createSlice({
    name: 'user',
    initialState: {loggedIn: false},
    reducers: {
        createUserSuccess(state, action) {
            const { id } = action.payload
            state.push({ id })
        },
        createUserFailure(state, action) {
            const { error } = action.payload
            state.push({ error })
        },
        fetchUserSuccess(state, action) {
            const { user } = action.payload
            state.push({ user, loggedIn: true })
        },
        fetchUserFailure(state, action) {
            const { error } = action.payload.response.statusText
            state.push({ error })
        },
        loginUserFailure(state, action) {
            const { error } = action.payload.response.data.message
            state.push({ error })
        },
        logoutUser(state, action) {
            state = {loggedIn: false}
        },
        setCredentials(state, action) {
            const { details } = action.payload
            state.push({credentials: details})
        },
        getCredentials(state, action) {
            return state.credentials
        },
        unsetCredentials(state, action) {
            const { credentials } = state
            state.credentials = null
            return credentials
        }
    }
})

export const { 
    createUserSuccess,
    createUserFailure,
    fetchUserSuccess,
    fetchUserFailure,
    loginUserFailure,
    logoutUser,
    setCredentials,
    getCredentials,
    unsetCredentials
} = userSlice.actions

export default userSlice.reducer