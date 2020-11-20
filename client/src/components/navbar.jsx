import React from 'react'
import styles from '../styles/navbar.css'

const Navbar = () => (
  <div>
    <nav className={styles['nav-bar']}>
      <div className={styles['trulia-logo-box']}>
      <img className={styles['trulia-logo']} src="./icons/trulia_logo.png"/>
      </div>
    </nav>
  </div>
)


export default Navbar;