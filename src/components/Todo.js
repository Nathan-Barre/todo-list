import React from "react";

export default function Todo({ todo, checkTodo }) {
    function manageClick() {
        checkTodo(todo.id)
    }

    return (
        <div>
            <label>
                <input type="checkbox" checked={todo.completed} onChange={manageClick}/>
                {todo.name}
            </label>
        </div>
    )
}