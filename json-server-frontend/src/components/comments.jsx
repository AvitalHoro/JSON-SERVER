import React, { useState } from 'react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

//-------------------Comments Component------------------------------------------
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

  //-------------------Update comment------------------------------------------------

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
    <div className="comments-container">
      <ul className="comment-list">
        {comments.map((comment) => (
          <li key={comment.id} className="comment-item">
            {editingCommentId === comment.id ? (
              <>
                <input
                  type="text"
                  value={editingCommentBody}
                  onChange={(e) => setEditingCommentBody(e.target.value)}
                  className="edit-comment-input"
                />
                <button onClick={handleUpdate} className="comment-button">Save</button>
                <button onClick={() => setEditingCommentId(null)} className="comment-button">Cancel</button>
              </>
            ) : (
              <>
                <p className="comment-text">{comment.body}</p>
                {userId === postUserId && (
                  <div>
                    <button onClick={() => onDeleteComment(comment.id)} className="delete-button">
                      <DeleteIcon className="icon" />
                    </button>
                    <button onClick={() => handleEdit(comment)} className="delete-button">
                      <EditIcon className="icon" />
                    </button>
                  </div>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
          className="comment-input"
        />
        <button onClick={() => onAddComment(userId)} className="comment-button">Add Comment</button>
      </div>
    </div>
  );
};

export default Comments;
