import React, { useState } from 'react';

//-------------------PostForm components-----------------------------
const PostForm = ({ onAddPost }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPost({ title, body });
    setTitle('');
    setBody('');
  };
//-------------------Add new post------------------------------------
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Body"
        required
      ></textarea>
      <button type="submit">Add Post</button>
    </form>
  );
};

export default PostForm;
