import React from 'react'
import PropTypes from 'prop-types'


const Todo = ({ onClick, deleteMe, completed, text }) => {

    const delButton = (
        <button 
          onClick={deleteMe}
          style={{ height: "1.5rem",width: "1.5rem" }}
        >X</button>
    )

    return (
        <li>{delButton}
        <span onClick={onClick}
        style={{
            textDecoration: completed ? 'line-through' : 'none'
        }}>{text}</span>
        </li>
    )

}

Todo.propTypes = {
onClick: PropTypes.func.isRequired,
completed: PropTypes.bool.isRequired,
text: PropTypes.string.isRequired
}

export default Todo