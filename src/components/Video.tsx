import Image from 'next/image';
import React from 'react';
import { MovieVideoResult } from '../util/interfaces';
import { AiFillPlayCircle } from 'react-icons/ai';
import styles from '../styles/VideoStyles.module.css';

interface IProps {
  result: MovieVideoResult;
  videoRow: number;
  setActivePlayerRow: React.Dispatch<React.SetStateAction<number>>;
  setActiveVideoSrc: React.Dispatch<React.SetStateAction<string>>;
}

const Video = ({ result, videoRow, setActivePlayerRow, setActiveVideoSrc }: IProps) => {
  const thumbnail = `https://img.youtube.com/vi/${result.key}/maxresdefault.jpg`;
  const src = `https://www.youtube.com/embed/${result.key}?color=white`;

  return (
    <div className={styles.video}>
      <Image src={thumbnail} layout="responsive" width={1280} height={720} className={styles.videoThumbnail} />
      <AiFillPlayCircle
        className={styles.playButton}
        onClick={() => {
          setActivePlayerRow(videoRow !== 0 ? videoRow : 1);
          setActiveVideoSrc(src);
        }}
      />
    </div>
  );
};

export default Video;
