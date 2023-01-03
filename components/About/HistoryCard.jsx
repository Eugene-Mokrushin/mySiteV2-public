import classes from './HistoryCard.module.scss'
import isMobile from '../../scripts/isMobile'
import React, { useEffect, useState } from 'react'

const HistoryCard = React.forwardRef(({ title, descr, years, top, wH, isVisible }, ref) => {
    const [mobile, setMobile] = useState(false)
    const height = wH - (wH * 0.2 * top + 75)

    useEffect(() => {
        if (isMobile.any()) {
            setMobile(true)
        }
    }, []);

    return (
        <div ref={ref} className={`${classes.card} ${isVisible === "shown" ? classes.visible : mobile ? classes.mHidden : classes.hidden} ${mobile ? classes.mobileCard : ''}`} style={{ marginTop: `${height}px` }}>
            <div className={classes.textWrapper}>
                <div className={classes.title}>{title}</div>
                <div className={classes.descr}>{descr}</div>
            </div>
            <div className={classes.dates}>
                <span>{years}</span>
            </div>
        </div>
    )
})
HistoryCard.displayName = 'HistoryCard'
export default HistoryCard