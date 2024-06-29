import React from 'react'
import "./footer.css"

const Footer = () => {
  return (
    <div className='footer'>
      <p><span className='nowrap'>Copyright &copy; {new Date().getFullYear()}</span> 
      <span> Rentify</span>
      </p>
    </div>
  )
}

export default Footer
