import React from 'react'

import LogoutButton from 'features/user/LogoutButton'
import UserEditButton from 'features/user/UserEditButton'
import TodoForm from 'features/todos/TodoForm'
import VisibleTodoList from 'features/todos/VisibleTodoList'
import Footer from 'features/filters/Footer'

export default function Home() {
    return (
        <div>
            <LogoutButton />
            <UserEditButton />
            <TodoForm />
            <VisibleTodoList />
            <Footer />
        </div>
    )
}