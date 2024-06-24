import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PostForm from './PostForm';

//-------------------Define API URL------------------------------------------------
const API_URL = 'http://localhost:3000/posts';

//-------------------PostDetails Component------------------------------------------
const Posts = ({ user }) => {
  const CURRENT_USER_ID = user.id;
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchCriteria, setSearchCriteria] = useState('title');
  const [editingPost, setEditingPost] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedBody, setUpdatedBody] = useState('');

  //-------------------Fetch posts from the API for the current user----------
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const userPosts = data.filter(post => post.userId === CURRENT_USER_ID);
        setPosts(userPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }
    fetchPosts();
  }, []);

  //-------------------Add new post---------------------------------------------------

  const handleAddPost = async (newPost) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...newPost, userId: CURRENT_USER_ID }),
      });

      if (!response.ok) {
        throw new Error('Failed to add post');
      }

      const addedPost = await response.json();
      setPosts([...posts, addedPost]);
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };
//-------------------Delete post----------------------------------------------------
  const handleDeletePost = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  //-------------------Update post-----------------------------------------------------

  const handleUpdatePost = async () => {
    try {
      const response = await fetch(`${API_URL}/${editingPost.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...editingPost, title: updatedTitle, body: updatedBody }),
      });

      if (!response.ok) {
        throw new Error('Failed to update post');
      }

      const updatedPost = await response.json();
      setPosts(posts.map(p => (p.id === updatedPost.id ? updatedPost : p)));
      setEditingPost(null);
      setUpdatedTitle('');
      setUpdatedBody('');
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };
//-------------------Search post-----------------------------------------------------

  const filteredPosts = posts.filter(post => {
    if (searchCriteria === 'serial') {
      return post.id.toString().includes(search);
    } else if (searchCriteria === 'title') {
      return post.title.toLowerCase().includes(search.toLowerCase());
    }
    return true;
  });

  return (
    <div>
      <h1>Posts</h1>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select value={searchCriteria} onChange={(e) => setSearchCriteria(e.target.value)}>
        <option value="serial">Serial Number</option>
        <option value="title">Title</option>
      </select>
      <PostForm onAddPost={handleAddPost} />
      <ul>
        {filteredPosts.map(post => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>
              {post.id}. {post.title}
            </Link>
            <button onClick={() => handleDeletePost(post.id)}>Delete</button>
            <button onClick={() => { setEditingPost(post); setUpdatedTitle(post.title); setUpdatedBody(post.body); }}>
              Update
            </button>
          </li>
        ))}
      </ul>
      {editingPost && (
        <div>
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <textarea
            value={updatedBody}
            onChange={(e) => setUpdatedBody(e.target.value)}
          ></textarea>
          <button onClick={handleUpdatePost}>Save Update</button>
        </div>
      )}
    </div>
  );
};

export default Posts;
