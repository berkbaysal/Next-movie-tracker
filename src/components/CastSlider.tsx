import React, { useEffect, useRef, useState } from 'react';
import CastDisplay from './CastDisplay';
import { CreditsData } from '../util/interfaces';
import styles from '../styles/CastSlider.module.css';
import sharedStyles from '../styles/SharedStyles.module.css';
import { BsChevronCompactRight, BsChevronCompactLeft } from 'react-icons/bs';

const SLIDER_INIT_STATE: SliderState = { slideStep: null, buttonWidth: null, maxSlideSteps: null, sliderWidth: null, correctionFactor: null, imageHeight: null };
interface IProps {
  creditInfo: CreditsData;
}
interface SliderState {
  sliderWidth: number | null;
  slideStep: number | null;
  buttonWidth: number | null;
  maxSlideSteps: number | null;
  correctionFactor: number | null;
  imageHeight: number | null;
}

const CastSlider = ({ creditInfo }: IProps) => {
  const [currentSlidePosition, setCurrentSlidePosition] = useState<number>(0);
  const [firstCastMemberHasLoaded, setFirstCastMemberHasLoaded] = useState<boolean>(false); //used to recalculate layout variables after initial API response, first load calculations may be incorrect without this due to async nature of API

  const [slideStep, setSlideStep] = useState<SliderState>(SLIDER_INIT_STATE);
  const slideUnit = 'px';
  const slidingImages = useRef(null);
  const transformStyle =
    currentSlidePosition === slideStep.maxSlideSteps //check if currently displaying the last cards of slider
      ? slideStep.maxSlideSteps === 0 //check if cast is short enough to be fully displayed without any sliding
        ? { transform: `translateX(0)` } //if all cast fits without sliding, disable sliding
        : { transform: `translateX(${-(currentSlidePosition * slideStep.slideStep - (currentSlidePosition > 0 ? slideStep.buttonWidth : 0) - slideStep.correctionFactor) + slideUnit}` } //if last slide, apply correction to remove gaps at the end
      : { transform: `translateX(${-(currentSlidePosition * slideStep.slideStep - (currentSlidePosition > 0 ? slideStep.buttonWidth : 0)) + slideUnit})` }; // if not last slide, slide out the fully visible cast members for new ones

  function slide(direction: string) {
    //handle sliding, refuse out of bound slides.
    switch (direction) {
      case 'right':
        setCurrentSlidePosition((oldPosition) => (oldPosition === slideStep.maxSlideSteps ? oldPosition : oldPosition + 1));
        break;
      case 'left':
        setCurrentSlidePosition((oldPosition) => (oldPosition === 0 ? oldPosition : oldPosition - 1));
        break;
    }
  }

  const castDisplays = creditInfo.cast.map((castMember, index) => (
    <CastDisplay castMember={castMember} key={`cast-member-${castMember.id}`} setFirstCastMemberHasLoaded={index === 1 ? setFirstCastMemberHasLoaded : null} />
  ));
  useEffect(() => {
    function computeSliderSettings() {
      const sliderWidth = slidingImages.current?.offsetWidth; //width of entire section including buttons
      const castMemberWidth = slidingImages.current?.firstChild.offsetWidth; //width of each member card
      const castMemberMargin = parseInt(window.getComputedStyle(slidingImages.current.firstChild).margin); //margin on each side of each card
      const buttonWidth = sliderWidth * 0.05; //width of each button to slide
      const fullyVisibleImageCount = Math.floor((sliderWidth - buttonWidth) / (castMemberWidth + 2 * castMemberMargin)); //number of images in viewport including margins
      const castMemberCount = creditInfo.cast.length; //total number of cards
      const correctionFactor = castMemberCount % fullyVisibleImageCount === 0 ? 0 : (fullyVisibleImageCount - (castMemberCount % fullyVisibleImageCount)) * (castMemberWidth + castMemberMargin * 2); //correction for last slide position to not have gaps, if member count perfectly fits, no correction is needed.
      const maxSlideSteps = Math.ceil(castMemberCount / fullyVisibleImageCount) - 1; //total number of possible slides counting initial state as step 0
      const imageHeight = slidingImages.current?.firstChild.firstChild.offsetHeight; // height of image in each card, used to position arrows
      setSlideStep({
        slideStep: fullyVisibleImageCount * (castMemberWidth + 2 * castMemberMargin),
        buttonWidth: buttonWidth,
        maxSlideSteps: maxSlideSteps,
        sliderWidth: sliderWidth,
        correctionFactor: correctionFactor,
        imageHeight: imageHeight,
      });
    }

    setCurrentSlidePosition(0);
    computeSliderSettings();
  }, [creditInfo, firstCastMemberHasLoaded]);
  console.log(slideStep);
  return (
    <div className={styles.castContainer}>
      <div className={sharedStyles.sectionTitle}>Cast:</div>
      <div className={styles.castSlider}>
        <div className={styles.leftArrow} style={{ opacity: currentSlidePosition === 0 ? '0' : '1' }}>
          <div className={styles.arrowContainer} onClick={() => slide('left')} style={{ height: slideStep.imageHeight }}>
            <BsChevronCompactLeft />
          </div>
        </div>
        <div className={styles.viewport}>
          <div className={styles.castMembers} style={transformStyle} ref={slidingImages}>
            {castDisplays}
          </div>
        </div>
        <div className={styles.rightArrow} style={{ opacity: currentSlidePosition === slideStep.maxSlideSteps ? '0' : '1' }}>
          <div className={styles.arrowContainer} onClick={() => slide('right')} style={{ height: slideStep.imageHeight }}>
            <BsChevronCompactRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CastSlider;
