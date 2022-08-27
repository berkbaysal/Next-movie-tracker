import React, { useEffect, useRef, useState } from 'react'
import CastDisplay from './CastDisplay'
import { CreditsData } from '../util/interfaces'
import styles from "../styles/CastSlider.module.css"
import { BsChevronCompactRight, BsChevronCompactLeft } from "react-icons/bs"
import { style } from '@mui/system'

const SLIDER_INIT_STATE: SliderState = { slideStep: null, buttonWidth: null, maxSlideSteps: null, sliderWidth: null, correctionFactor: null, imageHeight: null };
interface IProps {
  creditInfo: CreditsData
}
interface SliderState {
  sliderWidth: number | null
  slideStep: number | null
  buttonWidth: number | null
  maxSlideSteps: number | null
  correctionFactor: number | null
  imageHeight: number | null
}

const CastSlider = ({ creditInfo }: IProps) => {

  const [currentSlidePosition, setCurrentSlidePosition] = useState<number>(0);
  const [slideStep, setSlideStep] = useState<SliderState>(SLIDER_INIT_STATE)
  const slideUnit = "px";
  const slidingImages = useRef(null);
  const transformStyle = currentSlidePosition === slideStep.maxSlideSteps ?
    (slideStep.maxSlideSteps === 0 ?
      { transform: `translateX(0)` } :
      { transform: `translateX(${-(currentSlidePosition * slideStep.slideStep - (currentSlidePosition > 0 ? slideStep.buttonWidth : 0) - slideStep.correctionFactor) + slideUnit}` }) :
    { transform: `translateX(${-(currentSlidePosition * slideStep.slideStep - (currentSlidePosition > 0 ? slideStep.buttonWidth : 0)) + slideUnit})` }

  function slide(direction: string) {
    switch (direction) {
      case ("right"):
        setCurrentSlidePosition(oldPosition => oldPosition === slideStep.maxSlideSteps ? oldPosition : oldPosition + 1);
        break;
      case ("left"):
        setCurrentSlidePosition(oldPosition => (oldPosition === 0 ? oldPosition : oldPosition - 1));
        break;
    }
  }
  function computeSliderSettings() {
    const sliderWidth = slidingImages.current?.offsetWidth;
    const castMemberWidth = slidingImages.current?.firstChild.offsetWidth;
    const castMemberMargin = parseInt(window.getComputedStyle(slidingImages.current.firstChild).margin);
    const buttonWidth = sliderWidth * 0.05;
    const fullyVisibleImageCount = Math.floor((sliderWidth - buttonWidth) / (castMemberWidth + (2 * castMemberMargin)));
    const castMemberCount = creditInfo.cast.length;
    const correctionFactor = (fullyVisibleImageCount - castMemberCount % fullyVisibleImageCount) * (castMemberWidth + castMemberMargin * 2);
    const maxSlideSteps = Math.ceil(castMemberCount / fullyVisibleImageCount) - 1;
    const imageHeight = slidingImages.current?.firstChild.firstChild.offsetHeight;
    setSlideStep({ slideStep: fullyVisibleImageCount * (castMemberWidth + (2 * castMemberMargin)), buttonWidth: buttonWidth, maxSlideSteps: maxSlideSteps, sliderWidth: sliderWidth, correctionFactor: correctionFactor, imageHeight: imageHeight });
  }
  const castDisplays = creditInfo.cast.map(castMember => <CastDisplay castMember={castMember} key={`cast-member-${castMember.id}`} />)
  useEffect(() => {
    setCurrentSlidePosition(0);
    computeSliderSettings()
  }, [creditInfo])
  return (
    <div className={styles.castContainer}>
      <div className={styles.mainTitle}>Cast:</div>
      <div className={styles.castSlider}>
        <div className={styles.leftArrow} style={{ opacity: currentSlidePosition === 0 ? "0" : "1" }}>
          <div className={styles.arrowContainer} onClick={() => { slide("left") }} style={{ height: slideStep.imageHeight }}>
            <BsChevronCompactLeft />
          </div>
        </div>
        <div className={styles.viewport}>
          <div className={styles.castMembers}
            style={transformStyle}
            ref={slidingImages}
          >{castDisplays}</div>
        </div>
        <div className={styles.rightArrow} style={{ opacity: currentSlidePosition === slideStep.maxSlideSteps ? "0" : "1" }}>
          <div className={styles.arrowContainer} onClick={() => { slide("right") }} style={{ height: slideStep.imageHeight }}>
            <BsChevronCompactRight />
          </div>
        </div>
      </div>
    </div>)
}

export default CastSlider