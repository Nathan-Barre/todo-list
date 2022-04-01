import React, {useState, useRef, useEffect} from 'react';
import ListTodo from './components/ListTodo';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
    const [todos, setTodos] = useState([])
    const todoNameRef = useRef()

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        if (storedTodos) setTodos(storedTodos)
    }, [])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    }, [todos])

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            addTodo()
        }
    }

    function checkTodo(id) {
        const newTodos = [...todos]
        const todo = newTodos.find( todo => todo.id === id)
        todo.completed = !todo.completed
        setTodos(newTodos)
    }

    function addTodo(event) {
        const todoName = todoNameRef.current.value
        if (todoName === '') return
        setTodos(prevTodos => {
            return [...prevTodos, { id: uuidv4(), name: todoName, completed: false}]
        })
        todoNameRef.current.value = null

    }
    function clearCompletedTodos(event) {
        const newTodos = todos.filter(todo => !todo.completed)
        setTodos(newTodos)
    }

    function clearAllTodos(event) {
        const newTodos = []
        setTodos(newTodos)
    }

    return (
        <div>
            <ListTodo todos={todos} checkTodo={checkTodo}/>
            <input ref={todoNameRef} type="text" onKeyPress={handleKeyPress}/>
            <button onClick={addTodo}>Add Todo</button>
            <div>
                {todos.filter(todo => !todo.completed).length} left to do! <span></span>
                <button onClick={clearCompletedTodos}>Clear Completed Todos</button>
            </div>
            <button onClick={clearAllTodos}>Clear all Todos</button>
        </div>
    )
}

export default App;
