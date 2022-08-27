import Image from 'next/image'
import React from 'react'
import { CreditsData, PersonImages } from '../util/interfaces'
import defaultPersonImage from "../static/defaults-01.svg"
import styles from "../styles/CastDisplay.module.css"
import {BsArrowRightCircle} from "react-icons/bs"
interface IProps {
  creditInfo: CreditsData
  imageInfo: PersonImages[]
}
const CastDisplay = ({ creditInfo, imageInfo }: IProps) => {

  const castDisplay = creditInfo.cast.map((castMember, index) => {
    const src = imageInfo[index].profiles[0] ? `https://image.tmdb.org/t/p/w200${imageInfo[index].profiles[0].file_path}` : defaultPersonImage
    return (
      <div className={styles.castMember}>
        <Image src={src} width={200} height={300} className={styles.castPicture}/>
        <div className={styles.castName}>{castMember.name}</div>
        <div className={styles.characterName}>{castMember.character}</div>
      </div>
    )
  })

  return (
    <div className = {styles.castSlider}>
      
      <div className={styles.castMembers}>{castDisplay}</div>
      <div className={styles.rightArrow}><BsArrowRightCircle/></div>
    </div>
  )
}

export default CastDisplay
