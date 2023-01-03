import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

import DATA_firstSection from '../../data/index/firstSection'
import classes from './ImageSection.module.scss'
import isMobile from '../../scripts/isMobile'

import Fader from '../Fader'

export default function ImageSection({ lang }) {

    const [sectionOneVisibility, setSectionOneVisibility] = useState('hidden')
    const [mobile, setMobile] = useState(false);
    const sectionOneRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setSectionOneVisibility('shown')
                } else {
                    setSectionOneVisibility('hidden')
                }
            });
        })
        observer.observe(sectionOneRef.current)
    }, [])

    useEffect(() => {
        if (isMobile.any()) {
            setMobile(true)
        }
    }, [])

    return (
        <div className={`${classes.firstSection} ${mobile ? classes.mobile : ''}`} ref={sectionOneRef}>
            <div className={classes.pseudoHeaderContent}></div>
            <div className={classes.contentWrapper}>
                <div className={`${classes.imageSlide} ${sectionOneVisibility === 'shown' ? classes.shown : classes.hidden}`}>
                    <div className={classes.purpleMainImg}>
                        <Image
                            src={`/images/IMG_8780.svg`}
                            layout='fill'
                            objectFit='contain'
                            quality={1}
                        />
                    </div>
                    <div className={classes.whiteMainImg}>
                        <Image
                            src={`/images/IMG_8780.svg`}
                            layout='fill'
                            objectFit='contain'
                            quality={1}
                        />
                    </div>
                    <div className={classes.mainImg}>
                        <Image
                            src={`/images/IMG_8774.png`}
                            layout='fill'
                            objectFit='contain'
                            quality={100}
                            priority
                        />
                    </div>
                </div>
                <div className={`${classes.greetingText} ${sectionOneVisibility === 'shown' ? classes.shownText : classes.hiddenText}`}>
                    <div className={classes.greeting}>
                        {DATA_firstSection[lang].greeting} <br />
                    </div>
                    <a href='https://vk.com/bipki_knower' target="blank" className={classes.name}>
                        {DATA_firstSection[lang].fName}
                    </a>
                    <div className={classes.phrases}>
                        <Fader text={DATA_firstSection[lang].phrases} lang={lang} />
                    </div>
                </div>
            </div>
        </div>
    )
}

