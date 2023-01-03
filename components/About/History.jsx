import React, { useEffect, useRef, useState } from 'react'

import classes from './History.module.scss'
import DATA_History from '../../data/about/history'
import isMobile from '../../scripts/isMobile' 

import HistoryCard from './HistoryCard'

export default function History({ lang }) {
    const [mobile, setMobile] = useState(false)
    const [cardsVisible, setCardsVisible] = useState('hidden')
    const [wrapperHeight, setWrappereight] = useState(0)
    const [cvDimensions, setCVDimensions] = useState([0, 0])
    const references = Array(4).fill(0).map(() => React.createRef(null));
    const wrapper = useRef(null)


    useEffect(() => {
        const wrapperHeight = wrapper.current.clientHeight
        setWrappereight(wrapperHeight)
        if (cvDimensions[0] === 0) {
            setCVDimensions([window.innerHeight, window.innerWidth])
        }
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setCardsVisible('shown')
                } else {
                    setCardsVisible('hidden')
                }

            });
        })
        observer.observe(wrapper.current)
    }, [])

    useEffect(() => {
        if (isMobile.any()) {
            setMobile(true)
        }
    }, [])

    const allHistoryCards = DATA_History[lang].paths.map((path, index) => {
        return (
            <HistoryCard
                ref={references[index]}
                key={index}
                title={path.title}
                descr={path.descr}
                years={path.years}
                top={index + 1}
                wH={wrapperHeight}
                isVisible={cardsVisible}
            />
        )
    })

    return (
        <div className={`${classes.history} ${mobile ? classes.mobile : ''}`}>
            <div className={classes.titleWrapper}>
                <span className={classes.title}>
                    {DATA_History[lang].title}
                </span>
            </div>
            <div className={classes.cardsWrapper} ref={wrapper}>
                {allHistoryCards}
            </div>

        </div>
    )
}
