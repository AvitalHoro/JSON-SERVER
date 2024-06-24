import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PostForm from './PostForm';
import { Button, Menu, MenuButton, MenuList, MenuItem, Flex } from '@chakra-ui/react';
import { ChevronDownIcon, Search2Icon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import SearchInput from './SearchInputTodos';

const API_URL = 'http://localhost:3000/posts';

const Posts = ({ user }) => {
  const CURRENT_USER_ID = user.id;
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchCriteria, setSearchCriteria] = useState('title');
  const [editingPost, setEditingPost] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedBody, setUpdatedBody] = useState('');

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
  }, [CURRENT_USER_ID]);

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

  const filteredPosts = posts.filter(post => 
    post[searchCriteria].toLowerCase().includes(search.toLowerCase())
  );

  const SearchMenu = () => {
    const handleMenuItemClick = (value) => {
      setSearchCriteria(value);
    };

    return (
      <div style={{ zIndex: '100' }}>
        <Menu>
          <MenuButton px={12} py={8} as={Button} rightIcon={<ChevronDownIcon />}>
            <Flex align="center">
              <Search2Icon mr={5} />
              Search by
            </Flex>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => handleMenuItemClick('serial')}>
              Serial Number
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('title')}>
              Title
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    );
  };

  return (
    <div>
    
      <h1>Posts</h1>
      <div style={{ zIndex: '100' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
          <SearchMenu />
          <SearchInput search={search} setSearch={setSearch} />
        </div>
      </div>
      <PostForm onAddPost={handleAddPost} />
       <ul className='todo-list'>
        {filteredPosts.map(post => (
          <li key={post.id} className='post-item'>
            <Link to={`/posts/${post.id}`}>
              {post.id}. {post.title}
            </Link>
            <button className='delete-button' onClick={() => handleDeletePost(post.id)}>
              <DeleteIcon style={{ color: '#E48BBF' }} />
            </button>
            <button className='delete-button' onClick={() => {
              setEditingPost(post);
              setUpdatedTitle(post.title);
              setUpdatedBody(post.body);
            }}>
              <EditIcon style={{ color: '#E48BBF' }} />
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
