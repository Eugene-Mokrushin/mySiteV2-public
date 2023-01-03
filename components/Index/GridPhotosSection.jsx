import { useRef, useEffect, useState } from 'react'

import classes from './GridPhotosSection.module.scss'
import DATA_lastSection from '../../data/index/lastSection'
import isMobile from '../../scripts/isMobile'

import Footer from '../Footer/Footer'

export default function GridPhotosSection({ lang, photosData }) {
  let imgObject = photosData.map(x => x.link)
  let mainImg = 0;
  let prevImg = imgObject.length - 1;
  let nextImg = 1;

  const galleryViewRef = useRef(0)
  const rightViewRef = useRef(0)
  const leftViewRef = useRef(0)
  const mainViewRef = useRef(0)
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    if (isMobile.any()) {
      setMobile(true)
    }
  }, [])

  useEffect(() => {
    rightViewRef.current.addEventListener("click", scrollRight);
    leftViewRef.current.addEventListener("click", scrollLeft);
    document.addEventListener('keyup', function (e) {
      if (e.keyCode === 37) {
        scrollLeft();
      } else if (e.keyCode === 39) {
        scrollRight();
      }
    });
    loadGallery();
  }, []);

  function scrollRight() {
    prevImg = mainImg;
    mainImg = nextImg;
    if (nextImg >= (imgObject.length -1)) {
      nextImg = 0;
    } else {
      nextImg++;
    }; 
    loadGallery();
  };
  
  function scrollLeft() {
    nextImg = mainImg
    mainImg = prevImg;
    if (prevImg === 0) {
      prevImg = imgObject.length - 1;
    } else {
      prevImg--;
    };
    loadGallery();
  };

  function loadGallery() {
    let mainView = mainViewRef.current;
    mainView.style.background = "url(" + imgObject[mainImg] + ")";
    let leftView = leftViewRef.current;
    leftView.style.background = "url(" + imgObject[prevImg] + ")";
    let rightView = rightViewRef.current;
    rightView.style.background = "url(" + imgObject[nextImg] + ")";
  };

  return (
    <div className={`${classes.lastSectionWrapper} ${mobile ? classes.mobile : ""}`}>
      <div className={`${classes.titleWrapper} titleWrapper`}>
        <h2 className={`${classes.title} title`}>{DATA_lastSection[lang].title}</h2>
      </div>
      <div className={classes.gridWrapepr}>
        <div className={classes.galleryView} ref={galleryViewRef}>
          <div className={classes.galleryContainer}>
            <div className={classes.leftView} ref={leftViewRef}></div>
            <a className={classes.linkTag}>
              <div className={classes.mainView} ref={mainViewRef}></div>
            </a>
            <div className={classes.rightView} ref={rightViewRef}></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

