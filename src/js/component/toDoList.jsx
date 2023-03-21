import React, { useEffect, useState } from "react";

function Applist() {
	const [todos, setTodos] = useState([]);
	const [inputValue, setInputValue] = useState("");

	useEffect(() => {
		const storedTodos = localStorage.getItem('todos');
		if (storedTodos) {
			setTodos(JSON.parse(storedTodos));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
	}, [todos]);

    const handleAddTodo = () => {
        if (inputValue.trim() === '' ) {
            return;
        }
        setTodos([...todos, inputValue]);
        setInputValue('');
    };
    const handleDeleteTodo = (index) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };

    return (
        <div className="container-fluid justify-content-center m-5">
            <h1 className="text-bg-info my-3 px-5 text-center" style={{width: "50%"}}>To Do List</h1>
            <div className="" style={{width: "50%"}}>
                <input 
                    className="border border-info border-2 me-1 my-1"
                    style={{width: "90%"}}
                    type="text"
                    placeholder="Tasks to do"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button onClick={handleAddTodo} style={{width: "9%"}}>Add</button>
                <ul className="m-0 p-0">
                {todos.map((todo, index) => (
                    <li 
                    className="border border-info border-1 my-2" 
                    style={{width: "100%", listStyleType: "none"}}
                    key={index}>
                    {todo}
                    <button 
                    className="text-end"
                    onClick={() => handleDeleteTodo(index)}>Delete</button>
                </li>
            ))}
            </ul>
            </div>
            
        </div>
    );
}

export default Applist

