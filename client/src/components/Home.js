import React from 'react'

import LogoutButton from 'features/user/LogoutButton'
import TodoForm from 'features/todos/TodoForm'
import VisibleTodoList from 'features/todos/VisibleTodoList'
import Footer from 'features/filters/Footer'

export default function Home() {
    return (
        <div>
            <LogoutButton />
            <TodoForm />
            <VisibleTodoList />
            <Footer />
        </div>
    )
}