import React from "react";
import Todo from "./Todo";

export default function ListTodo( {todos, checkTodo} ) {
    return (
        todos.map(todo => {
            return <Todo key={todo.id} checkTodo={checkTodo} todo={todo}/>
        })
    )
}