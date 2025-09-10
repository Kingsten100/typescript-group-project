import React from 'react'
import type { Thread } from '../types/types'
import { Link } from 'react-router-dom'


type ThreadCardProps = {
  thread: Thread
}

const ThreadCard = ({ thread }: ThreadCardProps) => {
  // Calculate time difference (mock for now)
  const timeAgo = `${Math.floor(Math.random()*60)} min sedan`;
  
  return (
    <div className='thread-card'>
      <div className='thread-info'>
        <div className='user-icon'>
          <img src='../public/UserIcon.svg' alt="User" />
        </div>
        <p className='username'>{thread.creator.username}</p> 
        <p className='time-ago'>{timeAgo}</p>
        <div className='tag'><span>{thread.category}</span></div>
      </div>
      <div className='thread-title'>
        <Link to={`/threads/${thread.id}`} className='thread-link'>
          <h2>{thread.title}</h2>
        </Link>
      </div>
      <div className='thread-body-text'>
        <p>{thread.content}</p>
        <div className='comments-count'>
          <Link to={`/threads/${thread.id}`} className='comments-info-link'>
            <div className='comments-info'>
              <img src='../public/bubble-chat 2.svg' alt="Comments"/>
              <p>{thread.comments.length}</p>
            </div>
          </Link>
        </div>
      </div>
      <div className='thread-border' />
    </div>
  )
}

export default ThreadCard
