import React from 'react'
import ThreadList from '../components/ThreadList'

const ThreadListPage = () => {
  return (
    <div className='thread-list-page'>
      <div className='page-header'>
        <h2>Senaste</h2>
      </div>
      <ThreadList />
    </div>
  )
}

export default ThreadListPage
