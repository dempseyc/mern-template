import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createTodo } from 'features/todos/todosSlice'

const mapDispatch = { createTodo }
const mapStateToProps = state => ({
  ...state
})

const TodoForm = ({ createTodo, ...props }) => {
  console.log(props);
  const [todoText, setTodoText] = useState('')

  const onChange = e => setTodoText(e.target.value)

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (!todoText.trim()) {
            return
          }
          createTodo({text:todoText})
          setTodoText('')
        }}
      >
        <input value={todoText} onChange={onChange} />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatch
)(TodoForm)