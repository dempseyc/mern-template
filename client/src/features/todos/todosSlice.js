import axios from 'axios'

import { createSlice } from '@reduxjs/toolkit'

// need to get todos initial state from fetch users
export function createTodo (details) {
    return function (dispatch) {
        const url = process.env.REACT_APP_API_URL_DEV+'/api/user/'+user_id+'/todos/create'
        return axios.post(url, {
// {
//     created_on: {type: Date, default: Date.now },
//     time_zone: String,
//     created_by: { type: Schema.Types.ObjectId, ref: 'User' },
//     text: String,
//     completed: Boolean,
//     completed_on: {type: Date, default: Date.now}
// }
        })
        .then(response => {
            dispatch(createTodoSuccess(response.data))
            dispatch(addTodo(details))
        })
        .catch(error => dispatch(createUserFailure(error)))
    }
}

const todosSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        myTodos: {
            reducer(state, action) {
                const { todos } = action.payload
                state = todos
            }
        },
        addTodo: {
            reducer : (state, action) => {
                const { text } = action.payload
                // won't work with del todos, need global incrementor
                const id = state.length
                state.push({ id, text, completed: false })
            },
            prepare: (text) => {
                return { payload: { text } }
            }
        },
        toggleTodo:  {
            reducer(state, action) {
                const todo = state.find(todo => todo.id === action.payload)
                if (todo) {
                    todo.completed = !todo.completed
                }
            }
        }
    }
})

export const { 
    myTodos,
    addTodo,
    toggleTodo 
} = todosSlice.actions

export default todosSlice.reducer