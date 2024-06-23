import React, { useState } from 'react';

const Comments = ({ comments, onAddComment, onDeleteComment, onUpdateComment, newComment, setNewComment, currentUser }) => {
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentBody, setEditingCommentBody] = useState('');

  const handleEdit = (comment) => {
    setEditingCommentId(comment.id);
    setEditingCommentBody(comment.body);
  };

  const handleUpdate = () => {
    onUpdateComment(editingCommentId, editingCommentBody);
    setEditingCommentId(null);
    setEditingCommentBody('');
  };

  return (
    <div>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            {editingCommentId === comment.id ? (
              <>
                <input
                  type="text"
                  value={editingCommentBody}
                  onChange={(e) => setEditingCommentBody(e.target.value)}
                />
                <button onClick={handleUpdate}>Save</button>
                <button onClick={() => setEditingCommentId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <p>{comment.body}</p>
                {comment.userId === currentUser.id && (
                  <>
                    <button onClick={() => handleEdit(comment)}>Edit</button>
                    <button onClick={() => onDeleteComment(comment.id)}>Delete</button>
                  </>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment"
      />
      <button onClick={onAddComment}>Add Comment</button>
    </div>
  );
};

export default Comments;
