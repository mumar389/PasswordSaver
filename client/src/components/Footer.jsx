import React from 'react'

const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <footer style={{ position: 'fixed', bottom: 0, width: '100%', textAlign: 'center' }}>
    <p>&copy; {currentYear} Your Website. All rights reserved.</p>
  </footer>
  )
}

export default Footer