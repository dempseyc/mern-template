import { combineReducers } from 'redux'
import userReducer from 'features/user/userSlice'
import todosReducer from 'features/todos/todosSlice'
import visibilityFilterReducer from 'features/filters/filtersSlice'

export default combineReducers({
    user: userReducer,
    todos: todosReducer,
    visibilityFilter: visibilityFilterReducer
})