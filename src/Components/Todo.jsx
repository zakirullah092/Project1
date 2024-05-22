import React, { useState } from 'react';
import './Todo.css';

function Todo() {
    const [task, setTask] = useState('');
    const [taskList, setTaskList] = useState([]);
    const [taskCounter, setTaskCounter] = useState(1);
    const [filter, setFilter] = useState('All');
    const [inputVisible, setInputVisible] = useState(true);

    function handleClick() {
        if (task !== '') {
            const newTask = { id: taskCounter, text: task, completed: false };
            setTaskCounter(taskCounter + 1);
            setTaskList([...taskList, newTask]);
            setTask('');
        }
    }

    function handleDelete(id) {
        const newTaskList = taskList.filter(task => task.id !== id);
        setTaskList(newTaskList);
    }

    function toggleComplete(id) {
        const newTaskList = taskList.map(task => {
            if (task.id === id) {
                if (!task.completed) {
                    setInputVisible(false);
                } else if (taskList.every(task => !task.completed || task.id === id)) {
                    setInputVisible(true);
                }
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTaskList(newTaskList);
    }

    function filterTasks() {
        switch (filter) {
            case 'Active':
                return taskList.filter(task => !task.completed);
            case 'Completed':
                return taskList.filter(task => task.completed);
            default:
                return taskList;
        }
    }

    function clearCompleted() {
        const newTaskList = taskList.filter(task => !task.completed);
        setTaskList(newTaskList);
    }

    return (
        <div 
            className='main' 
            style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/bg.jpg'})` }}
        >
            <div className='container'>
                <h1 className='mainH1'>TODO</h1>
                {inputVisible && (
                    <form className='containerAddTask' onSubmit={e => e.preventDefault()}>
                        <input
                            type="text"
                            placeholder="Create a new to do"
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleClick();
                                }
                            }}
                        />
                        <button type="button" onClick={handleClick}>
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="form__send-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <title>Form send icon</title>
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
                            </svg>
                        </button>
                    </form>
                )}
                {taskList.length === 0 ? (
                    <h3 className='emptyH3'>List is empty</h3>
                ) : (
                    <>
                        <ul className='itemsUl'>
                            {filterTasks().map(todo => (
                                <li className='listItem' key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                                    <div className="taskContent">
                                        <div className="taskText">
                                            <input
                                                type="checkbox"
                                                checked={todo.completed}
                                                onChange={() => toggleComplete(todo.id)}
                                            />
                                            {todo.text}
                                        </div>
                                        <img
                                            src={`${process.env.PUBLIC_URL}/close.png`}
                                            alt="Delete"
                                            onClick={() => handleDelete(todo.id)}
                                            style={{ cursor: 'pointer', width: '20px', height: '20px' }}
                                        />
                                    </div>
                                </li>
                            ))}
                        </ul>
                       
                    </>
                )}
                <div className='footer'>
                    <p>{taskList.filter(task => !task.completed).length} items left</p>
                    {taskList.some(task => task.completed) && (
                            <p className='complete' onClick={clearCompleted} style={{ cursor: 'pointer' }}>
                                Clear Completed
                            </p>
                        )}
                </div>
                <div className='bottomBtns'>
                    <button style={{ color: filter === 'All' ? 'blue' : '' }} onClick={() => {
                        setFilter('All');
                        setInputVisible(true); // Show input when All is clicked
                    }}>All</button>
                    <button style={{ color: filter === 'Active' ? 'blue' : '' }} onClick={() => {
                        setFilter('Active');
                        setInputVisible(false); // Hide input when Active is clicked
                    }}>Active</button>
                    <button style={{ color: filter === 'Completed' ? 'blue' : '' }} onClick={() => {
                        setFilter('Completed');
                        setInputVisible(false); // Hide input when Completed is clicked
                    }}>Completed</button>
                </div>
            </div>
        </div>
    );
}

export default Todo;
