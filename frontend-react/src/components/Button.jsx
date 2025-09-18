import React from 'react'

const Button = (props) => {
  return (
    <>
       <button type='button' className={`btn ${props.class}`} href="">{props.text}</button>
    </>
  )
}

export default Button