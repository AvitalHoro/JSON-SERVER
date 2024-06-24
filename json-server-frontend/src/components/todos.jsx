import React, { useState, useEffect, useRef } from 'react';
import TodoForm from '../components/todoForm';
// import { Button, Menu, MenuItem } from '@mui/material';
// import FilterAltIcon from '@mui/icons-material/FilterList';
import { Button, Menu, MenuButton, MenuList, MenuItem, Input, Select, Flex } from '@chakra-ui/react';
import { ChevronDownIcon, Search2Icon, DeleteIcon } from '@chakra-ui/icons';
import { FiFilter } from 'react-icons/fi';
import CheckBox from './CheckBox';
import SearchInput from './SearchInputTodos';
import { color } from 'framer-motion';



//-------------------Todo Component------------------------------------------

const Todos = ({ user }) => {


  const API_URL = `http://localhost:3000/todos`;
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('serial');
  const [search, setSearch] = useState('');
  const [searchCriteria, setSearchCriteria] = useState('title');
  const [searchExecution, setSearchExecution] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');
  
  console.log('re-render', search);



//-------------------Fetch todos from the API for the current user-------------
  useEffect(() => {
    async function getTodos() {
      try {
        const response = await fetch(`${API_URL}?userId=${user.id}`);
        const data = await response.json();
        // const userTodos = data.filter(todo => todo.userId === user.id);
        setTodos(data.map((todo, index)=> ({...todo, serialNum: index+1})));
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    }
    getTodos();
  }, [user]);


//-------------------Add new todo-----------------------------------------------
  const handleAddTodo = async (newTodo) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...newTodo, userId: user.id }),
      });

      if (!response.ok) {
        throw new Error('Failed to add todo');
      }

      const addedTodo = await response.json();
      setTodos([...todos, {...addedTodo, serialNum: todos.length + 1}]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };


//-------------------Update todo------------------------------------------------
  const handleUpdateTodo = async (updatedTodo) => {
    try {
      const { serialNum, ...todoWithoutSerialNum } = updatedTodo;

      const response = await fetch(`${API_URL}/${updatedTodo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoWithoutSerialNum),
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

      const data = await response.json();
      setTodos(todos.map(todo => (todo.id === data.id ? {...data, serialNum: serialNum} : todo)));
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


//-------------------Filter Menu---------------------------------------------------

const FilterMenu = () => {
  
  const handleMenuItemClick = (value) => {
    setFilter(value);
  };

  return (
    <div style={{zIndex: "100"}}>
      <Menu>
        <MenuButton px={12} py={8} as={Button} rightIcon={<ChevronDownIcon />}>
        <Flex align="center">

          <FiFilter mr={5} />
          Filter
        </Flex>
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => handleMenuItemClick('serial')} border={filter === 'serial' ? '2px solid black' : 'none'}>
            Serial
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('alphabetical')} border={filter === 'alphabetical' ? '2px solid black' : 'none'} >
            Alphabetical
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('performance')} border={filter === 'performance' ? '2px solid black' : 'none'}>
            Performance
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('random')} border={filter === 'random' ? '2px solid black' : 'none'}>
            Random
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};

const SearchMenu = ({}) => {
  
  const handleMenuItemClick = (value) => {
    setSearchCriteria(value);
  };

  return (
    <div style={{zIndex: "100"}}>
      <Menu>
        <MenuButton px={12} py={8} as={Button} rightIcon={<ChevronDownIcon />}>
        <Flex align="center">

          <Search2Icon mr={5} />
          Search by
        </Flex>
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => handleMenuItemClick('serial')} border={filter === 'serial' ? '2px solid black' : 'none'}>
            Serial Number
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('title')} border={filter === 'title' ? '2px solid black' : 'none'}>
          Title
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('execution')} border={filter === 'execution' ? '2px solid black' : 'none'}>
          Execution Status
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};


  
//-------------------Filter and sort todos------------------------------------------
  const filteredTodos = todos
  .filter((todo, index) => {
    if (searchCriteria === 'serial') {
        return search? todo.serialNum.toString().includes(search) : true;
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


    //-------------------todos Filters------------------------------------------

    const TodoFilters = () => (      
    
    <div  style={{zIndex: "100"}}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '10px',
        
        }}>
        <FilterMenu/>
        <SearchMenu search={search} setSearch={setSearch}/>
        {searchCriteria !== 'execution' ? (
                <SearchInput search={search} setSearch={setSearch} /> 

      ) : (
        <Menu>
        <MenuButton px={12} py={8} as={Button} rightIcon={<ChevronDownIcon />}>
        <Flex align="center">
          {searchExecution==='all' ? 'All' : searchExecution==='completed' ? 'Completed' : 'Not Completed'}
        </Flex>
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => setSearchExecution('all')} border={filter === 'all' ? '2px solid black' : 'none'}>
            All
          </MenuItem>
          <MenuItem onClick={() => setSearchExecution('completed')} border={filter === 'completed' ? '2px solid black' : 'none'}>
          Completed
          </MenuItem>
          <MenuItem onClick={() => setSearchExecution('not_completed')} border={filter === 'not_completed' ? '2px solid black' : 'none'}>
          Not Completed
          </MenuItem>
        </MenuList>
      </Menu>
      )}
        </div>
    </div>);

  return (
    <div style={
      {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }
    }>
      <h1>Todos</h1>
      <TodoFilters></TodoFilters>
      <ul className='todo-list'>
        {filteredTodos.map((todo, index) => (
          <li key={todo.id} className='todo-item'>
                                  <span>{todo.serialNum}</span>
            <CheckBox isCompleted={todo.completed} handleChange={() => handleUpdateTodo({ ...todo, completed: !todo.completed })}/>
            <input
            className='todo-title'
                  type="text"
                  value={todo.title}
                  onChange={(e) => handleUpdateTodo({ ...todo, title: e.target.value })}
                />
                <button className='delete-button' onClick={() => handleDeleteTodo(todo.id)}><DeleteIcon style={{color: 'white'}}/></button>
          </li>
        ))}
      </ul>
      <TodoForm onAddTodo={handleAddTodo} />

    </div>
  );
};



export default Todos;