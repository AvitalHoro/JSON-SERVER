import React, { useState } from 'react';
import { IoIosAdd } from "react-icons/io";


//----------------Help add new task---------------------
const AddAlbum = ({ onAddAlbum }) => {
  const [title, setTitle] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddAlbum({
      title,
    });
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className='todo-item'  style={{backgroundColor: '#FFC0CB'}}>
            <button className='add-button' type="submit"><IoIosAdd/></button>

      <input
      className='todo-title'
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add new album"
        required
      />
    </form>
  );
};

export default AddAlbum;
