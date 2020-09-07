import React from 'react'
import PropTypes from 'prop-types'
import Todo from 'features/todos/Todo'


function TodoList ({ todos, updateTodo, deleteTodo }) {

    const toggleTodo = (todo) => {
        updateTodo(todo,{completed:!todo.completed})
    }

    return (
    <ul>
        {todos.map(todo => (
            <Todo key={todo._id} 
            {...todo} 
            deleteMe={() => deleteTodo(todo)}
            onClick={() => toggleTodo(todo)} 
            />
        ))}
    </ul>
    )
}

TodoList.propTypes = {
    todos: PropTypes.arrayOf(
        PropTypes.shape({
        _id: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
        text: PropTypes.string.isRequired
        }).isRequired
    ).isRequired,
    // toggleTodo: PropTypes.func.isRequired
}

export default TodoList