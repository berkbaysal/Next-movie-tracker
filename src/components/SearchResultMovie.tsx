import Image from 'next/image';
import React from 'react'
import { MovieListResult, TVListResult } from '../util/interfaces';
import styles from "../styles/Search.module.css"
import defaultMovieImage from "../static/defaults-02.svg"

interface IProps {
    result: MovieListResult
    handleRedirect: (assetType:string,assetId:number)=>void
}

const SearchResultMovie = ({result, handleRedirect}:IProps) => {
    const year = new Date(result.release_date).getFullYear();
    return (
        <div className={styles.searchResult} onClick={()=>handleRedirect(result.media_type,result.id)}>
            <div className={styles.poster}>
            <Image src={result.poster_path ?(`https://www.themoviedb.org/t/p/w94_and_h141_bestv2` + result.poster_path):defaultMovieImage}
                layout="responsive" objectFit='cover' width={94} height={141} sizes="5vw" placeholder={defaultMovieImage}/>
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

export default SearchResultMovie