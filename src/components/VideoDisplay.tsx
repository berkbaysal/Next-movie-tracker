import React, { useEffect, useRef, useState } from 'react';
import { MovieVideos } from '../util/interfaces';
import Video from './Video';
import styles from '../styles/VideoStyles.module.css';
import sharedStyles from '../styles/SharedStyles.module.css';
import VideoPlayer from './VideoPlayer';

interface IProps {
  movieId: number;
}

const VideoDisplay = ({ movieId }: IProps) => {
  const [videos, setVideos] = useState<MovieVideos>(null);
  const [videosDisplay, setVideosDisplay] = useState([]);
  const [activePlayerRow, setActivePlayerRow] = useState<number>(null);
  const [activeVideoSrc, setActiveVideoSrc] = useState<string>(null);
  const videoGrid = useRef(null);

  async function fetchVideos(movieId) {
    const res = await fetch('/api/video?id=' + movieId);
    const json: MovieVideos = await res.json();
    setVideos(json);
  }

  function getVideosPerRow() {
    return window.getComputedStyle(videoGrid.current).gridTemplateColumns.split(' ').length;
  }

  useEffect(() => {
    fetchVideos(movieId);
  }, [movieId]);

  useEffect(() => {
    function updateDisplayVideos() {
      if (videos && videos.results?.length > 0) {
        let displayVideos = [];
        const videosPerRow = getVideosPerRow();
        videos.results.forEach((result, index) => {
          if (index % videosPerRow === 0 && index !== 0) {
            displayVideos.push(<VideoPlayer activePlayerRow={activePlayerRow} activeVideoSrc={activeVideoSrc} playerRow={index / videosPerRow} videoGrid={videoGrid} />);
          }
          displayVideos.push(
            <Video result={result} key={'video-result-' + index} videoRow={Math.floor(index / videosPerRow)} setActivePlayerRow={setActivePlayerRow} setActiveVideoSrc={setActiveVideoSrc} />
          );
        });
        setVideosDisplay(displayVideos);
      }
    }
    if (videos) updateDisplayVideos();
  }, [videos, activeVideoSrc, activePlayerRow]);

  return (
    <>
      <div className={sharedStyles.sectionTitle}>Videos:</div>
      <div className={styles.gridContainer} ref={videoGrid}>
        {videosDisplay}
      </div>
    </>
  );
};

export default VideoDisplay;
