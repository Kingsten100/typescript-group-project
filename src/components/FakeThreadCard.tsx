import React, { useState } from 'react'
import { useForum } from '../context/ForumContext'
import type { Thread } from '../types/types'

interface FakeThreadCardProps {
  thread: Thread;
}

const FakeThreadCard: React.FC<FakeThreadCardProps> = ({ thread: initialThread }) => {
  const [showComments, setShowComments] = useState(false);
  const { getThreadById } = useForum();
  
  // Always get the latest thread data from context (which includes localStorage updates)
  const thread = getThreadById(initialThread.id) || initialThread;
  const timeAgo = `${Math.floor(Math.random()*60)} min`;
  
  return (
    <div className='fake-thread-card'>
      {/* Thread Card */}
      <div className='thread-info'>
        <p>{thread.creator.username}</p> 
        <p>{timeAgo}</p>
        <div className='tag'><span>{thread.category}</span></div>
      </div>
      
      <div className='thread-title'>
        <h2>{thread.title}</h2>
      </div>
      
      <div className='thread-body-text'>
        <p>{thread.content}</p>
        
        <div className='comments-count'>
          <div className='comments-info' onClick={() => setShowComments(!showComments)} style={{ cursor: 'pointer' }}>
            <img src='../public/bubble-chat 2.svg' alt=""/>
            <p>{thread.comments.length} comments</p>
          </div>
        </div>
      </div>
      
      <div className='thread-border' />
      
      {/* Reddit-style Comments Section */}
      {showComments && (
        <div className='comments-section'>
          <div className='comments-header'>
            <h3>Comments ({thread.comments.length})</h3>
          </div>
          
          {thread.comments.length > 0 ? (
            <div className='comments-list'>
              {thread.comments.map((comment) => (
                <div key={comment.id} className='comment-item'>
                  <div className='comment-header'>
                    <span className='comment-author'>{comment.author}</span>
                    <span className='comment-date'>{comment.creationDate}</span>
                  </div>
                  <div className='comment-content'>
                    <p>{comment.content}</p>
                  </div>
                  <div className='comment-actions'>
                    <button className='comment-action-btn'>↑</button>
                    <span className='comment-score'>0</span>
                    <button className='comment-action-btn'>↓</button>
                    <button className='comment-action-btn'>Reply</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='no-comments'>
              <p>No comments yet. Be the first to comment!</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default FakeThreadCard
