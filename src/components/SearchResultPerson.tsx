import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import styles from "../styles/Search.module.css"
import defaultPersonImage from "../static/defaults-01.svg"
import { PersonImages, PersonListResult } from '../util/interfaces';

interface IProps{
    result: PersonListResult
}

const SearchResultPerson = ({result}:IProps) => {

    const [imgSrc, setImgSrc] = useState(defaultPersonImage)

    async function getPersonImagePath(id:number){
        const res = await fetch("/api/personImage?id="+id);
        const json: PersonImages = await res.json()
        if(json.profiles[0]){setImgSrc("https://image.tmdb.org/t/p/w92"+json.profiles[0].file_path)}
    }

    useEffect(()=>{getPersonImagePath(result.id)},[])
    return (
        <div className={styles.searchResult}>
            <div className={styles.poster}>
                <Image src={imgSrc?imgSrc:defaultPersonImage}
                layout="responsive" objectFit='cover' width={94} height={141} sizes="5vw" placeholder={defaultPersonImage}/>
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

export default SearchResultPerson