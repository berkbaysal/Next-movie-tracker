import React, { useEffect } from 'react';
import styles from '../styles/VideoStyles.module.css';

interface IProps {
  activePlayerRow: number;
  playerRow: number;
  activeVideoSrc: string;
  videoGrid: React.MutableRefObject<any>;
}

const VideoPlayer = ({ activePlayerRow, playerRow, activeVideoSrc, videoGrid }: IProps) => {
  let frame = null;

  function calculatePlayerSize() {
    const thumbnailHeight = parseInt(window.getComputedStyle(videoGrid.current?.firstChild).height);
    const gridGap = parseInt(window.getComputedStyle(videoGrid.current).gap);
    const playerHeight = thumbnailHeight * 2 + gridGap;
    const playerWidth = (playerHeight / 9) * 16;
    return { height: playerHeight, width: playerWidth };
  }

  useEffect(() => {
    function updateFrame() {
      frame = <iframe src={activeVideoSrc} />;
    }
    updateFrame();
  }, [activeVideoSrc]);

  return (
    <>
      <div className={styles.activePlayerContainer} style={{ height: activePlayerRow === playerRow ? calculatePlayerSize().height + 'px' : '0' }}>
        {activePlayerRow === playerRow && <iframe src={activeVideoSrc} className={styles.activePlayer} style={calculatePlayerSize()} />}
      </div>
    </>
  );
};

export default VideoPlayer;
