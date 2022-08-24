import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { MovieSearchResults } from '../util/interfaces'
import styles from "../styles/Search.module.css"
import { Button, ButtonGroup } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { searchCategoryButtons } from '../static/theme';

const MAX_RESULTS_DISPLAYED = 5;

interface IProps {
    searchTerm: string
}

const Search = ({ searchTerm }: IProps) => {

    const [searchResults, setSearchResults] = useState(null);
    const [category, setCategory] = useState("movie");

    async function handleSearch() {
        const res = await fetch("api/movieSearch", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ query: searchTerm })
        });
        const searchResults = await res.json();
        setSearchResults(updateSearchResults(searchResults));
    }
    function updateSearchResults(queryRes: MovieSearchResults) {
        if (!queryRes.results) { return [] };
        const returnArray = queryRes.results.map((result, index) => {
            if (index >= MAX_RESULTS_DISPLAYED) { return }
            const year = new Date(result.release_date).getFullYear();
            return (
                <div className={styles.searchResult}>
                    <div className={styles.poster}>

                        <Image src={`https://www.themoviedb.org/t/p/w94_and_h141_bestv2` + result.poster_path} layout="fill" objectFit='cover' quality={80} />
                    </div>
                    <div className={styles.movieInfo}>
                        <div className={styles.movieTitle}>
                            {result.original_title} {year ? `(${year})` : ""}
                        </div>
                        <div className={styles.movieOverview}>
                            {result.overview}
                        </div>
                    </div>
                </div>

            )
        })
        return returnArray;
    }



    useEffect(() => { handleSearch() }, [searchTerm])
    return (
        <div className={styles.searchResults}>
            <div className={styles.buttonGroup}>
                <ThemeProvider theme={searchCategoryButtons}>
                    <Button variant='contained'>Movies</Button>
                    <Button variant='contained'>TV Shows</Button>
                    <Button variant='contained'>People</Button>
                </ThemeProvider>
            </div>
            {searchResults}
        </div>
    )
}

export default Search