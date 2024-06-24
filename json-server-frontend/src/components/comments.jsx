import React, { useState } from 'react';

//----------------Comments Component------------------------------------------
const Comments = ({
  comments,
  onAddComment,
  onDeleteComment,
  onUpdateComment,
  newComment,
  setNewComment,
  userId,
  postUserId, 
}) => {
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentBody, setEditingCommentBody] = useState('');
//-------------------Update Comments------------------------------------------------
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
        {comments.map((comment) => (
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
//------------------- Only allow editing/deleting if active user wrote the post-------          
              <>
                <p>{comment.body}</p>
                {userId === postUserId && ( 
                  <>
                    <button onClick={() => onDeleteComment(comment.id)}>Delete</button>
                    <button onClick={() => handleEdit(comment)}>Edit</button>
                  </>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
      {}
      <input 
//-------------------Add Comments------------------------------------------------------
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment"
      />
      <button onClick={() => onAddComment(userId)}>Add Comment</button>
    </div>
  );
};

export default Comments;
