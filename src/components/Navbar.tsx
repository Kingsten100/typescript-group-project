import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../context/UserContext'

const Navbar = () => {
  const { currentUser, switchUser, availableUsers } = useUser();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <nav className='navbar'>
      <div className='navbar-brand'>
        <Link to='/' className='brand-link'>
          <h1>LOGGA</h1>
        </Link>
      </div>
      
      <div className='navbar-center'>
        <button className='navbar-btn'>Sök</button>
        <Link to='/create' className='navbar-btn create-btn'>Skapa ny tråd</Link>
      </div>
      
      <div className='navbar-user'>
        <div className='user-menu'>
          <button 
            className='navbar-user-icon'
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <img src='../public/UserIcon.svg' alt="User" />
          </button>
          
          {showUserMenu && (
            <div className='user-dropdown'>
              <div className='dropdown-header'>Switch User (Demo)</div>
              {availableUsers.map(user => (
                <button
                  key={user.id}
                  className={`user-option ${user.id === currentUser.id ? 'active' : ''}`}
                  onClick={() => {
                    switchUser(user.id);
                    setShowUserMenu(false);
                  }}
                >
                  {user.username}
                </button>
              ))}
            </div>
          )}
        </div>
        <button className='navbar-btn logout-btn'>Logga ut</button>
      </div>
    </nav>
  )
}

export default Navbar
