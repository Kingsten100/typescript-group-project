import React from 'react'
import ThreadCard from './ThreadCard'
import { useForum } from '../context/ForumContext'

const ThreadList = () => {
  const { threads } = useForum()

  return (
    <div className='thread-list-container'>
      {threads.map((thread) => (
        <ThreadCard key={thread.id} thread={thread}/>
      ))}
    </div>
  )
}

export default ThreadList
