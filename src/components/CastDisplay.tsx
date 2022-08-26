import Image from 'next/image'
import React from 'react'
import { CreditsData, PersonImages } from '../util/interfaces'
import defaultPersonImage from "../static/defaults-01.svg"
interface IProps{
    creditInfo: CreditsData
    imageInfo: PersonImages[]
}
const CastDisplay = ({creditInfo,imageInfo}:IProps) => {

  const castDisplay = creditInfo.cast.map((castMember,index)=>{
  const src = imageInfo[index].profiles[0] ? `https://www.themoviedb.org/t/p/w138_and_h175_face/${imageInfo[index].profiles[0].file_path}` : defaultPersonImage
  return (<Image src={src}
  width={138} height={175}
  />)})

  return (
    <div>{castDisplay}</div>
  )
}

export default CastDisplay
