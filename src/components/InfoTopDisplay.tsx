import Image from 'next/image'
import React from 'react'
import { MovieData } from '../util/interfaces'
import styles from "../styles/InfoTopDisplay.module.css"
import {SiImdb} from "react-icons/si"
import {BsCursor} from "react-icons/bs"

interface IProps {
    filmInfo: MovieData
}

const InfoTopDisplay = ({ filmInfo }: IProps) => {
    const releaseDate = new Date(filmInfo.release_date).getFullYear()
    return (
        <div className={styles.topSection}>
            <div className={styles.poster}>
                <Image src={"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/" + filmInfo.poster_path}
                    layout="intrinsic" width={600} height={900} sizes="20vw"
                    alt={"Film poster of " + filmInfo.title} className={styles.poster}
                />
            </div>
            <div className={styles.mainInfo}>
                <div className={styles.title}>
                    {filmInfo.title} {releaseDate && <span className={styles.releaseDate}>({releaseDate})</span>}
                    {(filmInfo.original_title && filmInfo.original_title !== filmInfo.title) &&
                    <div className={styles.originalTitle}>Original Title: {filmInfo.original_title}</div>}
                </div>
                <div className={styles.subTitle}>
                    {filmInfo.tagline && <div className={styles.tagline}>{filmInfo.tagline}</div>}
                    {filmInfo.genres.map(genre=>genre.name).join(", ")} • {filmInfo.runtime?filmInfo.runtime + " min":""}
                </div>
                <div className={styles.links}>
                    {filmInfo.imdb_id && <a href={"https://www.imdb.com/title/"+filmInfo.imdb_id}><SiImdb className={styles.link}/></a>}
                    {filmInfo.homepage && <a href={filmInfo.homepage}><BsCursor className={styles.link}/></a>}
                </div>
                <div className={styles.overview}>
                    <div className={styles.overviewTitle}>Overview:</div>
                    <div>{filmInfo.overview}</div>
                </div>
            </div>

        </div>
    )
}

export default InfoTopDisplay