// src/pages/PostDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Comments from './comments';

const API_URL = 'http://localhost:3000/posts';
const COMMENTS_URL = 'http://localhost:3000/comments';
const CURRENT_USER_ID = 1; // Simulate the current logged-in user ID

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    async function fetchPostAndComments() {
      try {
        const postResponse = await fetch(`${API_URL}/${id}`);
        const postData = await postResponse.json();
        setPost(postData);

        const commentsResponse = await fetch(`${COMMENTS_URL}?postId=${id}`);
        const commentsData = await commentsResponse.json();
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching post and comments:', error);
      }
    }
    fetchPostAndComments();
  }, [id]);

  const handleAddComment = async () => {
    try {
      const response = await fetch(COMMENTS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId: id, body: newComment, userId: CURRENT_USER_ID }),
      });

      if (!response.ok) {
        throw new Error('Failed to add comment');
      }

      const addedComment = await response.json();
      setComments([...comments, addedComment]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(`${COMMENTS_URL}/${commentId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete comment');
      }

      setComments(comments.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleUpdateComment = async (commentId, updatedBody) => {
    try {
      const response = await fetch(`${COMMENTS_URL}/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ body: updatedBody }),
      });

      if (!response.ok) {
        throw new Error('Failed to update comment');
      }

      const updatedComment = await response.json();
      setComments(comments.map(comment => (comment.id === commentId ? updatedComment : comment)));
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  return (
    <div>
      {post && (
        <>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
          <h2>Comments</h2>
          <Comments
            comments={comments}
            onAddComment={handleAddComment}
            onDeleteComment={handleDeleteComment}
            onUpdateComment={handleUpdateComment}
            newComment={newComment}
            setNewComment={setNewComment}
          />
        </>
      )}
    </div>
  );
};

export default PostDetails;
