import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Comments from './comments';

// Define API URLs
const API_URL = 'http://localhost:3000/posts';
const COMMENTS_URL = 'http://localhost:3000/comments';

const PostDetails = (user) => {
  const CURRENT_USER_ID = user.id;
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

      //-------------------Fetch PostDetails from the API for the current user-------------

  useEffect(() => {
    async function fetchPostAndComments() {
      try {
        const postResponse = await fetch(`${API_URL}/${id}`);
        if (!postResponse.ok) {
          throw new Error('Post not found');
        }
        const postData = await postResponse.json();
        setPost(postData);

        const commentsResponse = await fetch(`${COMMENTS_URL}?postId=${id}`);
        const commentsData = await commentsResponse.json();
        setComments(commentsData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
    fetchPostAndComments();
  }, [id]);

  //-------------------Add new comment-----------------------------------------------

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

  //-------------------Delete comment------------------------------------------------

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

  //-------------------Update comment------------------------------------------------
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {post && (
        <div className="post-details-container">
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      )}
      <h2>Comments</h2>
      <Comments
        comments={comments}
        onAddComment={handleAddComment}
        onDeleteComment={handleDeleteComment}
        onUpdateComment={handleUpdateComment}
        newComment={newComment}
        setNewComment={setNewComment}
        postUserId={CURRENT_USER_ID}
      />
    </div>
  );
};

export default PostDetails;
