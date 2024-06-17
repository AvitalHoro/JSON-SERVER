import React, { useState } from 'react';

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add new todo"
        required
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TodoForm;
