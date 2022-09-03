import { TextField, ThemeProvider } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/Navbar.module.css';
import { searchBarTheme } from '../static/theme';
import Search from './Search';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResultsVisible, setSearchResultsVisible] = useState<boolean>(false);
  const searchBar = useRef(null);

  return (
    <nav className={styles.navbarContainer}>
      <div className={styles.searchBarWrapper} onFocus={() => setSearchResultsVisible(true)} onBlur={() => setTimeout(() => setSearchResultsVisible(false), 500)}>
        <ThemeProvider theme={searchBarTheme}>
          <TextField variant="outlined" size="small" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} inputRef={searchBar} autoComplete="off" />
        </ThemeProvider>
        {searchTerm.length > 0 && searchResultsVisible && <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}
      </div>
    </nav>
  );
};

export default Navbar;
