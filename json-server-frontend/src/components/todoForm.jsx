import React, { useState } from 'react';
import { IoIosAdd } from "react-icons/io";


//----------------Help add new task---------------------
const TodoForm = ({ onAddTodo }) => {
  const [title, setTitle] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTodo({
      title,
      completed: false,
    });
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className='todo-item'>
            <button className='add-button' type="submit"><IoIosAdd/></button>

      <input
      className='todo-title'
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add new todo"
        required
      />
    </form>
  );
};

export default TodoForm;
