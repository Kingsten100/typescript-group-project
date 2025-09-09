import { useState, type FormEvent } from 'react'
import { useForum } from '../context/ForumContext'
import { useUser } from '../context/UserContext'
import type { Comment } from '../types/types'
import { useParams } from 'react-router-dom'

const CommentForm = () => {
  const { addComment } = useForum()
  const { currentUser } = useUser()
  const { id } = useParams<{ id: string }>();

  const [content, setContent] = useState('')
  
  if(!id) {
    return <p>No thread ID found</p>
  }
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const comment: Comment = {
      id: crypto.randomUUID(),
      threadId: id,
      author: currentUser.username,
      content: content,
      creationDate: new Date().toISOString().split('T')[0],
      replies: []
    }
    addComment(id, comment)

    setContent('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className='comment-form-container'>
        <div className='comment-form-header'>
          <span className='commenting-as'>Comment as {currentUser.username}</span>
        </div>
        <div className='comment-form-input'>
          <textarea 
            placeholder='Delta i samtalet' 
            className='input comment-textbox' 
            id='comment' 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            required
          />
        </div>
        <button className='comment-submit-btn' type='submit'>Comment</button>
      </form>
    </div>
  )
}

export default CommentForm
