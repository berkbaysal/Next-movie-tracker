import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Cast, PersonImages } from '../util/interfaces';
import defaultPersonImage from '../static/defaults-01.svg';
import styles from '../styles/CastDisplay.module.css';
interface IProps {
  castMember: Cast;
  setFirstCastMemberHasLoaded?: React.Dispatch<React.SetStateAction<boolean>>;
}
const CastDisplay = ({ castMember, setFirstCastMemberHasLoaded }: IProps) => {
  const [imgSrc, setImgSrc] = useState<string>(null);

  useEffect(() => {
    async function fetchImage(castId: number) {
      const res = await fetch('/api/personImage?id=' + castId);
      const json: PersonImages = await res.json();
      json.profiles[0] ? setImgSrc(`https://image.tmdb.org/t/p/w200${json.profiles[0].file_path}`) : null;
      setFirstCastMemberHasLoaded ? setFirstCastMemberHasLoaded(true) : null;
    }
    setImgSrc(null);
    fetchImage(castMember.id);
  }, [castMember, setFirstCastMemberHasLoaded]);

  return (
    <div className={styles.castMember}>
      <Image src={imgSrc ? imgSrc : defaultPersonImage} width={200} height={300} className={styles.castPicture} />
      <div className={styles.castName}>{castMember.name}</div>
      <div className={styles.characterName}>{castMember.character}</div>
    </div>
  );
};

export default CastDisplay;
