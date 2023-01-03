import { useEffect, useState } from 'react'

import classes from './RecentProjectsSection.module.scss'
import DATA_secondSection from '../../data/index/secondSection'
import makeId from '../../scripts/makeId'

import ProjectCard from './ProjectCard'
import isMobile from '../../scripts/isMobile'

const RecentProjectsSection = ({ lang, projectCardsData }) => {
    const [mobile, setMobile] = useState(false)

    useEffect(() => {
        if (isMobile.any()) {
            setMobile(true)
        }
    }, [])

    const cardsArr = projectCardsData.map((card, index) => {
        return (
            <ProjectCard
                key={makeId(10)}
                id={card._id}
                img={card.coverImg}
                title={card.title}
                date={card.date}
                tags={card.tags}
                flip={index % 2 === 0 ? 'cardUp' : 'cardDown'}
            />
        )
    })
    return (
        <div className={`${classes.secondSection} ${mobile ? classes.mobile : ''}`}>
            <hgroup className={`${classes.titleWrapper} titleWrapper`} >
                <h2 className={`${classes.title} title`}>{DATA_secondSection[lang].title}</h2>
            </hgroup>
            <div className={classes.articlesWrapper}>
                {cardsArr}
            </div>
            <div className={classes.pointOBS}></div>
        </div>
    )
}

export default RecentProjectsSection
