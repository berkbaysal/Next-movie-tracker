import { TextField, ThemeProvider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styles from "../styles/Navbar.module.css"
import { searchBarTheme } from "../static/theme"
import Search from './Search'




const Navbar = () => {

  const [searchTerm, setSearchTerm] = useState<string>("")

  return (
    <nav className={styles.navbarContainer}>
      <div className={styles.searchBarWrapper}>
        <ThemeProvider theme={searchBarTheme}>
          <TextField variant='outlined'
            size='small'
            placeholder='Search...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </ThemeProvider>
          <Search searchTerm={searchTerm}/>
      </div>
    </nav>
  )
}

export default Navbar