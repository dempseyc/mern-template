import { createSlice } from '@reduxjs/toolkit'

// need to get todos initial state from fetch users

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