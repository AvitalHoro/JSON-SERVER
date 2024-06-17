import React, { useState, useEffect } from 'react';
import TodoForm from '../components/todoForm';

//-------------------Define API URL-----------------------------------------
const API_URL = 'http://localhost:3000/todos';
const CURRENT_USER = JSON.parse(localStorage.getItem('user'));
const CURRENT_USER_ID = CURRENT_USER.id;

//-------------------Todo Component------------------------------------------

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('serial');
  const [search, setSearch] = useState('');
  const [searchCriteria, setSearchCriteria] = useState('title');
  const [searchExecution, setSearchExecution] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');


//-------------------Fetch todos from the API for the current user-------------
  useEffect(() => {
    async function getTodos() {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const userTodos = data.filter(todo => todo.userId === CURRENT_USER_ID);
        setTodos(userTodos.slice(0, 20));
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    }
    getTodos();
  }, []);


//-------------------Add new todo-----------------------------------------------
  const handleAddTodo = async (newTodo) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...newTodo, userId: CURRENT_USER_ID }),
      });

      if (!response.ok) {
        throw new Error('Failed to add todo');
      }

      const addedTodo = await response.json();
      setTodos([...todos, addedTodo]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };


//-------------------Update todo------------------------------------------------
  const handleUpdateTodo = async (updatedTodo) => {
    try {
      const response = await fetch(`${API_URL}/${updatedTodo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

      const data = await response.json();
      setTodos(todos.map(todo => (todo.id === data.id ? data : todo)));
      setEditingId(null);
      setEditingTitle('');
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };


//-------------------Delete todo---------------------------------------------------
  const handleDeleteTodo = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }

      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  
//-------------------Filter and sort todos------------------------------------------
  const filteredTodos = todos
    .filter(todo => {
      if (searchCriteria === 'serial') {
        return search ? todo.id.toString().includes(search) : true;
      }
      if (searchCriteria === 'title') {
        return search ? todo.title.toLowerCase().includes(search.toLowerCase()) : true;
      }
      if (searchCriteria === 'execution') {
        if (searchExecution === 'all') return true;
        const isCompleted = searchExecution === 'completed';
        return todo.completed === isCompleted;
      }
      return true;
    })
    .sort((a, b) => {
      if (filter === 'serial') return a.id - b.id;
      if (filter === 'alphabetical') return a.title.localeCompare(b.title);
      if (filter === 'performance') return a.completed - b.completed;
      if (filter === 'random') return 0.5 - Math.random();
      return 0;
    });

  return (
    <div>
      <h1>Todos</h1>
      <TodoForm onAddTodo={handleAddTodo} />
      <div>
        <label>
          Filter:
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="serial">Serial</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="performance">Performance</option>
            <option value="random">Random</option>
          </select>
        </label>
        <label>
          Search by:
          <select value={searchCriteria} onChange={(e) => setSearchCriteria(e.target.value)}>
            <option value="serial">Serial Number</option>
            <option value="title">Title</option>
            <option value="execution">Execution Status</option>
          </select>
        </label>
        {searchCriteria !== 'execution' ? (
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        ) : (
          <select
            value={searchExecution}
            onChange={(e) => setSearchExecution(e.target.value)}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="not_completed">Not Completed</option>
          </select>
        )}
      </div>
      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id}>
            {editingId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                />
                <button onClick={() => handleUpdateTodo({ ...todo, title: editingTitle })}>
                  Save
                </button>
                <button onClick={() => { setEditingId(null); setEditingTitle(''); }}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                {todo.id}. {todo.title}
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleUpdateTodo({ ...todo, completed: !todo.completed })}
                />
                <button onClick={() => { setEditingId(todo.id); setEditingTitle(todo.title); }}>
                  Edit
                </button>
                <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};



export default Todos;