import axios from 'axios'

import { createSlice } from '@reduxjs/toolkit'

const headers = ()=> { return (
    {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`
        }
    } )
}

export function createTodo (details) {

    return function (dispatch) {
        const url = process.env.REACT_APP_API_URL_DEV+'/api/user/'+localStorage.id+'/todos/create'
        return axios.post(url, {
            created_by: localStorage.id,
            text: details.text,
            completed: false,
        }, headers() )
        .then(response => {
            dispatch(createTodoSuccess(response.data))
        })
        .catch(error => dispatch(createTodoFailure(error)))
    }
}

export function updateTodo (todo, override) {
    console.log('update todo', todo)
    return function (dispatch) {
        const updatedTodo = { ...todo, ...override }
        const url = process.env.REACT_APP_API_URL_DEV+'/api/user/'+todo.created_by+'/todos/'+todo._id+'/update'
        return axios.put(url, updatedTodo, headers() )
        .then(response => {
            dispatch(updateTodoSuccess(response.data))
        })
        .catch(error => dispatch(updateTodoFailure(error)))
    }
}

export function deleteTodo (todo) {
    // console.log('delete todo', todo)
    return function (dispatch) {
        const url = process.env.REACT_APP_API_URL_DEV+'/api/user/'+todo.created_by+'/todos/'+todo._id+'/delete'
        return axios.post(url, todo, headers() )
        .then(response => {
            dispatch(deleteTodoSuccess(response.data))
        })
        .catch(error => dispatch(deleteTodoFailure(error)))
    }
}

const todosSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        loadTodos(state,action) {
            state = action.payload
            return state
        },
        createTodoSuccess(state,action) {
            const todos = action.payload
            console.log('todos', todos)
            state = todos
            return state
        },
        createTodoFailure(state,action) {
            const error  = action.payload
            state.push(error)
            return state
        },
        updateTodoSuccess(state,action) {
            console.log('ud success',action.payload)
            state = action.payload
            return state
        },
        updateTodoFailure(state,action) {
            const { error } = action.payload.response.statusText
            state.push(error)
            return state
        },
        deleteTodoSuccess(state,action) {
            console.log('del success',action.payload)
            state = action.payload
            return state
        },
        deleteTodoFailure(state,action) {
            const { error } = action.payload.response.statusText
            state.push(error)
            return state
        },
        
    }
})

export const {
    loadTodos,
    createTodoSuccess,
    createTodoFailure,
    updateTodoSuccess,
    updateTodoFailure,
    deleteTodoSuccess,
    deleteTodoFailure,
    // toggleTodo,
} = todosSlice.actions

export default todosSlice.reducer