import React from 'react'
import Button from './Button'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
      <nav className='navbar container pt-3 pb-3 align-items-start'>
        <Link className='navbar-brand text-light' to="/">Stock Prediction Portal</Link>

        <div>
          <Button class='btn-outline-info' text='Login' url='/login' />          
          &nbsp;
          <Button class='btn-info' text='Register' url='/register' />
        </div>
      </nav>

    
    </>
  )
}

export default Header