import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className='flex px-5 bg-gray-900 text-white items-center h-14 justify-center md:text-base text-xs'>
        <p>Copyright &copy; {currentYear} Get me A Chai - All rights reserved</p>
    </footer>
  )
}

export default Footer
