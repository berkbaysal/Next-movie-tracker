import React from 'react';
import { MovieListResult, TVListResult } from '../util/interfaces';
import style from '../styles/TopResult.module.css';
import Image from 'next/image';
import BackgroundPlayer from './BackgroundPlayer';

interface IProps {
  topResult: MovieListResult | TVListResult;
}

const TopTrending = ({ topResult }: IProps) => {
  console.log(topResult.id);
  return (
    <div className={style.backgroundContainer}>
      <div className={style.container}>
        <BackgroundPlayer movieId={topResult.id} />
        <div className={style.content}>
          <div className={style.posterWrapper}>
            <Image
              src={'https://www.themoviedb.org/t/p/w600_and_h900_bestv2' + topResult.poster_path}
              layout="fill"
              alt={'Top trending poster'}
              sizes="50vw"
              objectFit="contain"
            ></Image>
          </div>
          <div className={style.title}>{topResult.media_type === 'movie' ? topResult.title : topResult.name}</div>
        </div>
      </div>
    </div>
  );
};

export default TopTrending;
