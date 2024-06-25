import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PostForm from './PostForm';
import { Button, Menu, MenuButton, MenuList, MenuItem, Flex } from '@chakra-ui/react';
import { ChevronDownIcon, Search2Icon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import SearchInput from './SearchInputTodos';

const API_URL = 'http://localhost:3000/posts';

const Posts = ({ user }) => {

  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchCriteria, setSearchCriteria] = useState('title');
  const [editingPost, setEditingPost] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedBody, setUpdatedBody] = useState('');

  useEffect(() => {
    async function fetchPosts() {
      const postsFromStorage = localStorage.getItem('posts');
      if (postsFromStorage && postsFromStorage.length > 0) {
        setPosts(JSON.parse(postsFromStorage));
        console.log('I takes posts from storage:\n', postsFromStorage);
        return;
      }
      try {
        const response = await fetch(`${API_URL}?userId=${user.id}`);
        const data = await response.json();
        const tmpPosts = data.map((post, index) => ({ ...post, serialNum: index + 1 }));
        // const userPosts = data.filter(post => post.userId === CURRENT_USER_ID);
        setPosts(tmpPosts);
        localStorage.setItem('posts', JSON.stringify(tmpPosts));

      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }
    fetchPosts();
  }, [user]);

  const handleAddPost = async (newPost) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...newPost, userId: user.id }),
      });

      if (!response.ok) {
        throw new Error('Failed to add post');
      }

      const addedPost = await response.json();
      const tmpPosts = [...posts, {...addedPost, serialNum: posts.length + 1}];
      setPosts(tmpPosts);
      localStorage.setItem('posts', JSON.stringify(tmpPosts));
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

      const tmpPosts = posts.filter(post => post.id !== id);
      setPosts(tmpPosts);
      localStorage.setItem('posts', JSON.stringify(tmpPosts));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleUpdatePost = async () => {
    try {

      const { serialNum, ...postWithoutSerialNum } = editingPost;

      const response = await fetch(`${API_URL}/${editingPost.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...postWithoutSerialNum, title: updatedTitle, body: updatedBody }),
      });

      if (!response.ok) {
        throw new Error('Failed to update post');
      }

      const updatedPost = await response.json();
      const tmpPosts = posts.map(p => (p.id === updatedPost.id ? {...updatedPost, serialNum: serialNum} : p))

      setPosts(tmpPosts);
      localStorage.setItem('posts', JSON.stringify(tmpPosts));
      setEditingPost(null);
      setUpdatedTitle('');
      setUpdatedBody('');
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const filteredPosts = searchCriteria==='title'? (posts.filter(post => 
    post[searchCriteria].toLowerCase().includes(search.toLowerCase())
  )): (posts.filter(post => post.serialNum.toString().includes(search)));

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
              {post.serialNum}. {post.title}
            </Link>
            <button className='delete-button-p' onClick={() => handleDeletePost(post.id)}>
              <DeleteIcon style={{ color: '#E48BBF' }} />
            </button>
            <button className='delete-button-p' onClick={() => {
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
