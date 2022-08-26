import Image from 'next/image';
import React from 'react'
import { TVListResult } from '../util/interfaces';
import styles from "../styles/Search.module.css"
import defaultTvImage from "../static/defaults-03.svg"

interface IProps {
    result: TVListResult
}

const SearchResultTvSeries = ({ result }: IProps) => {
    const year = new Date(result.first_air_date).getFullYear();
    return (
        <div className={styles.searchResult}>
            <div className={styles.poster}>
                <Image src={result.poster_path ? (`https://www.themoviedb.org/t/p/w94_and_h141_bestv2` + result.poster_path) : defaultTvImage}
                    layout="responsive" objectFit='cover' width={94} height={141} sizes="5vw" placeholder={defaultTvImage} />
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

export default SearchResultTvSeries