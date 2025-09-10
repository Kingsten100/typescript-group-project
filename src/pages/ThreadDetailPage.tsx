import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForum } from '../context/ForumContext'
import { useUser } from '../context/UserContext'
import CommentForm from '../components/CommentForm'
import type { Comment } from '../types/types'

// Component for rendering individual comments with replies
const CommentItem: React.FC<{ 
  comment: Comment, 
  threadId: string, 
  depth?: number 
}> = ({ comment, threadId, depth = 0 }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const { addReply } = useForum();
  const { currentUser } = useUser();
  const [replyContent, setReplyContent] = useState('');

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    const reply: Comment = {
      id: crypto.randomUUID(),
      threadId: threadId,
      parentCommentId: comment.id,
      author: currentUser.username,
      content: replyContent,
      creationDate: new Date().toISOString().split('T')[0],
      replies: []
    };

    addReply(threadId, comment.id, reply);
    setReplyContent('');
    setShowReplyForm(false);
  };

  const timeAgo = `${Math.floor(Math.random()*60)} min sedan`;

  return (
    <div className={`swedish-comment depth-${depth}`}>
      <div className="comment-main">
        <div className="comment-header">
          <div className='user-icon'>
            <img src='../public/UserIcon.svg' alt="User" />
          </div>
          <span className="comment-author">{comment.author}</span>
          <span className="comment-time">{timeAgo}</span>
        </div>
        
        <div className="comment-content">
          <p>{comment.content}</p>
        </div>

        <div className="comment-actions">
          <button 
            className="reply-btn"
            onClick={() => setShowReplyForm(!showReplyForm)}
          >
            Svara
          </button>
        </div>

        {showReplyForm && (
          <div className="reply-form-swedish">
            <textarea
              placeholder="Delta i samtalet"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="reply-input-swedish"
              required
            />
            <div className="reply-actions">
              <button type="button" onClick={handleReplySubmit} className="reply-submit-swedish">
                Svara
              </button>
              <button 
                type="button" 
                onClick={() => setShowReplyForm(false)}
                className="reply-cancel-swedish"
              >
                Avbryt
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Render nested replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="comment-replies-swedish">
          {comment.replies.map((reply) => (
            <CommentItem 
              key={reply.id} 
              comment={reply} 
              threadId={threadId}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const ThreadDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const { getThreadById } = useForum()
  const navigate = useNavigate()

  const thread = getThreadById(String(id))

  if(!thread){
    return (
      <div className='thread-detail-container'>
        <p>Thread not found</p>
      </div>
    )
  }

  const timeAgo = `${Math.floor(Math.random()*60)} min sedan`;
  
  return (
    <div className='thread-detail-container'>
      {/* Back Navigation */}
      <div className='back-navigation'>
        <button onClick={() => navigate('/')} className='back-btn'>
          ←
        </button>
      </div>

      {/* Thread Header */}
      <div className='thread-detail-header'>
        <div className='thread-author-info'>
          <div className='user-icon'>
            <img src='../public/UserIcon.svg' alt="User" />
          </div>
          <span className='thread-author'>{thread.creator.username}</span>
          <span className='thread-time'>{timeAgo}</span>
        </div>
      </div>

      {/* Thread Content */}
      <div className='thread-detail-content'>
        <h1 className='thread-detail-title'>{thread.title}</h1>
        <p className='thread-detail-text'>{thread.content}</p>
      </div>

      {/* Thread Actions */}
      <div className='thread-detail-actions'>
        <div className='comments-info'>
          <img src='../public/bubble-chat 2.svg' alt="Comments"/>
          <span>{thread.comments.length}</span>
        </div>
        <button className='share-btn'>
          <span>📤</span> Dela
        </button>
      </div>

      {/* Comment Form */}
      <div className='comment-form-section'>
        <CommentForm />
      </div>

      {/* Comments Section */}
      <div className='comments-section'>
        {thread.comments.length > 0 ? (
          <div className='comments-list'>
            {thread.comments.map((comment) => (
              <CommentItem 
                key={comment.id} 
                comment={comment} 
                threadId={thread.id}
                depth={0}
              />
            ))}
          </div>
        ) : (
          <div className='no-comments'>
            <p>Inga kommentarer än</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ThreadDetailPage
