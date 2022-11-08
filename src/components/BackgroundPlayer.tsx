import { useState, useEffect } from 'react';
import style from '../styles/BackgroundPlayer.module.css';
import { MovieVideos } from '../util/interfaces';

interface IProps {
  movieId: number;
}

const BackgroundPlayer = ({ movieId }: IProps) => {
  const [key, setKey] = useState('');

  async function fetchVideos(movieId) {
    const res = await fetch('/api/video?id=' + movieId);
    const json: MovieVideos = await res.json();

    if (json.results) {
      for (let i = 0; i < json.results.length; i++) {
        if (json.results[i].type === 'Trailer') {
          setKey(json.results[i].key);
          break;
        }
      }
    }
  }

  useEffect(() => {
    setKey('');
    fetchVideos(movieId);
  }, [movieId]);
  console.log(key);
  return (
    <>
      {key !== '' && (
        <>
          <iframe
            className={style.videoPlayer}
            src={`https://www.youtube.com/embed/${key}?&playlist=${key}&loop=1&autoplay=1&rel=0&mute=1&controls=0&color=white`}
          />
          <div className={style.videoPlayerOverlay}></div>
        </>
      )}
    </>
  );
};

export default BackgroundPlayer;