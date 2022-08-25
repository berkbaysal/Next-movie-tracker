import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { MultiSearchResult, MovieListResult,PersonListResult,TVListResult } from '../util/interfaces'
import styles from "../styles/Search.module.css"
import defaultPersonImage from "../static/defaults-01.svg"
import defaultMovieImage from "../static/defaults-02.svg"
import defaultTvImage from "../static/defaults-03.svg"

const MAX_RESULTS_DISPLAYED = 8;

interface IProps {
    searchTerm: string
}

const Search = ({ searchTerm }: IProps) => {

    const [searchResults, setSearchResults] = useState(null);

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

    function isMovie(obj: any): obj is MovieListResult {
        return obj.media_type === "movie";
      }
    function isPerson(obj: any): obj is PersonListResult {
        return obj.media_type === "person";
      }
    function isTvShow(obj: any): obj is TVListResult {
        return obj.media_type === "tv";
    }

    function updateSearchResults(queryRes: MultiSearchResult) {
        if (!queryRes.results) { return [] };
        const returnArray = queryRes.results.map((result, index) => {
            if (isMovie(result)) {
                if (index >= MAX_RESULTS_DISPLAYED) { return }
                const year = new Date(result.release_date).getFullYear();
                return (
                    <div className={styles.searchResult}>
                        <div className={styles.poster}>
                        <Image src={result.poster_path ?(`https://www.themoviedb.org/t/p/w94_and_h141_bestv2` + result.poster_path):defaultMovieImage}
                            layout="fill" objectFit='cover' quality={80}  placeholder={defaultMovieImage}/>
                            <div className={styles.overlayTag}>Film</div>
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
            }
            else if (isTvShow(result)) {
                if (index >= MAX_RESULTS_DISPLAYED) { return }
                const year = new Date(result.first_air_date).getFullYear();
                return (
                    <div className={styles.searchResult}>
                        <div className={styles.poster}>
                            <Image src={result.poster_path ?(`https://www.themoviedb.org/t/p/w94_and_h141_bestv2` + result.poster_path):defaultTvImage}
                            layout="fill" objectFit='cover' quality={80}  placeholder={defaultTvImage}/>
                            <div className={styles.overlayTag}>TV Series</div>
                        </div>
                        <div className={styles.movieInfo}>
                            <div className={styles.movieTitle}>
                                {result.original_name} {year ? `(${year})` : ""}
                            </div>
                            <div className={styles.movieOverview}>
                                {result.overview}
                            </div>
                        </div>
                    </div>

                )
            }
            else if (isPerson(result)) {
                if (index >= MAX_RESULTS_DISPLAYED) { return }
                return (
                    <div className={styles.searchResult}>
                        <div className={styles.poster}>

                            <Image src={defaultPersonImage} layout="fill" objectFit='cover' quality={80} />
                        </div>
                        <div className={styles.movieInfo}>
                            <div className={styles.movieTitle}>
                                {result.name}
                            </div>
                            <div className={styles.movieOverview}>
                                {result.known_for.map(work=>(
                                    <div className={styles.knownFor}>{work.title}</div>
                                ))}
                            </div>
                        </div>
                    </div>

                )
            }
        })
        return returnArray;
    }

    useEffect(() => { handleSearch() }, [searchTerm])
    return (
        <div className={styles.searchResults}>
            {searchResults && searchResults.length > 0?searchResults:(<div>No results</div>)}
        </div>
    )
}

export default Search