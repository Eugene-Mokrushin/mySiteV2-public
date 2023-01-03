import React, { Fragment, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import DATA_Diplomas from '../../data/about/diplomas'
import classes from './Diplomas.module.scss'
import makeid from '../../scripts/makeId'
import isMobile from '../../scripts/isMobile';

import Footer from '../Footer/Footer'

const Diplomas = ({ lang }) => {
    const fullRef = useRef(null)
    const [mobile, setMobile] = useState(false)

    function handleClick(e) {
        const targetElem = e.target.alt ? e.target.closest('.flag') : e.target
        if (targetElem.id !== 'card--current') {
            const allCards = [...document.querySelector("#holder").children]
            allCards.forEach(card => {
                card.id = ""
            });
            for (let index = 0; index < allCards.length; index++) {
                if (allCards[index] == targetElem) {
                    const previous = allCards[0] === targetElem ? allCards[allCards.length - 1] : allCards[index - 1];
                    const next = (index + 1 >= allCards.length ? allCards[0] : allCards[index + 1]);
                    const next_next = (index + 2 >= allCards.length ? allCards[1] : allCards[index + 2]);
                    previous.id = "card--out"
                    next.id = "card--next"
                    next_next.id = "card--next--next"
                    targetElem.id = 'card--current'
                }
            }
        } else {
            fullRef.current.children[0].src = `/Diplomas/${targetElem.dataset.img}`
            fullRef.current.style.display = "block"
        }
    }

    function handlePrev() {
        const targetElem = document.querySelector('#card--out')
        const allCards = [...document.querySelector("#holder").children]
        document.querySelector("#holder").classList.add('reverse')
        allCards.forEach(card => {
            card.id = ""
        });
        for (let index = 0; index < allCards.length; index++) {
            if (allCards[index] == targetElem) {
                const previous = allCards[0] === targetElem ? allCards[allCards.length - 1] : allCards[index - 1];
                const next = (index + 1 >= allCards.length ? allCards[0] : allCards[index + 1]);
                const next_next = (index + 2 >= allCards.length ? allCards[1] : allCards[index + 2]);
                previous.id = "card--out"
                next.id = "card--next"
                next_next.id = "card--next--next"
                targetElem.id = 'card--current'
            }
        }
    }

    function handleNext() {
        const targetElem = document.querySelector('#card--next')
        const allCards = [...document.querySelector("#holder").children]
        document.querySelector("#holder").classList.remove('reverse')
        allCards.forEach(card => {
            card.id = ""
        });
        for (let index = 0; index < allCards.length; index++) {
            if (allCards[index] == targetElem) {
                const previous = allCards[0] === targetElem ? allCards[allCards.length - 1] : allCards[index - 1];
                const next = (index + 1 >= allCards.length ? allCards[0] : allCards[index + 1]);
                const next_next = (index + 2 >= allCards.length ? allCards[1] : allCards[index + 2]);
                previous.id = "card--out"
                next.id = "card--next"
                next_next.id = "card--next--next"
                targetElem.id = 'card--current'
            }
        }
    }

    function handleCloseFull() {
        fullRef.current.style.display = "none"
    }

    useEffect(() => {
        if (isMobile.any()) {
            setMobile(true)
        }
    }, [])

    useEffect(() => {
        setTimeout(() => {
            const allCards = [...document.querySelector("#holder").children]
            allCards[0].id = 'card--current'
            allCards[1].id = 'card--next'
            allCards[2].id = 'card--next--next'
            allCards[allCards.length - 1].id = 'card--out'
        }, 200)
    }, [])

    const allDiplomas = DATA_Diplomas.allSmallDiplomas.map(card => {
        return (
            <li
                className={`${classes.card} flag`}
                key={makeid(13)}
                onClick={e => handleClick(e)}
                data-img={card}
            >
                <Image
                    src={`/Diplomas/${card}`}
                    alt="Diploma"
                    layout='fill'
                    objectFit='cover'
                    quality={10}
                />
            </li>
        )
    })

    return (
        <Fragment>
            <svg className={classes.SVG}>
                <defs>
                    <filter id="paper" x="0%" y="0%" width="100%" height="100%">
                        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="8" result="noise" />
                        <feDiffuseLighting in="noise" lightingColor="white" surfaceScale="1" result="diffLight">
                            <feDistantLight azimuth="45" elevation="35" />
                        </feDiffuseLighting>
                    </filter>
                </defs>
            </svg>
            <div className={`${classes.diplomasWrapper} ${mobile ? classes.mobile : ''}`}>
                <div className={classes.fullDiploma} id="diploma" ref={fullRef} onClick={handleCloseFull}>
                    <img src="https://link" alt="diploma" className={classes.diploma} id="fullDiplomaPicture" />
                </div>
                <div className={classes.titleWrapper}>
                    <span className={classes.title}>
                        {DATA_Diplomas[lang].title}
                    </span>
                </div>
                <div className={classes.allDiplomas}>
                    <ul className={classes.cardHolder} id="holder">
                        {allDiplomas}
                    </ul>
                    {mobile ?
                        <div className={classes.swiper}>
                            <div className={classes.left} onClick={handlePrev}><img src="./images/ar.svg" alt="Left" /></div>
                            <div className={classes.right} onClick={handleNext}><img src="./images/ar.svg" alt="Right" /></div>
                        </div>
                        : null}
                </div>
            </div>
            <Footer />
        </Fragment>
    );
}

export default Diplomas;


