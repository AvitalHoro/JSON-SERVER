import React, { useState } from 'react';
import { IoIosAdd } from 'react-icons/io'; // Import the IoIosAdd icon

const PostForm = ({ onAddPost }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPost({ title, body });
    setTitle('');
    setBody('');
  };

  return (
    <form onSubmit={handleSubmit} className='todo-item' style={{ backgroundColor: '#E48BBF' }}>
      <button className='add-button' type="submit"><IoIosAdd /></button>

      <input
        className='todo-title'
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add title to post"
        required
      />
      <input
        className='todo-title'
        type="text"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Add body to post"
        required
      />
    </form>
  );
};

export default PostForm;
