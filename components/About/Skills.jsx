import React, { useEffect, useState } from 'react'
import TagCloud from 'TagCloud'

import classes from './Skills.module.scss'
import DATA_Skills from '../../data/about/skills'
import isMobile from '../../scripts/isMobile'

export default function Skills({ lang }) {

    const [mobile, setMobile] = useState(false)

    useEffect(() => {
        const viewport_width = window.innerWidth;
        const container = '.bubble-skills';
        const myTags = DATA_Skills.tags
        let options
        if (viewport_width >= 200 && viewport_width < 630) {
            options = {
                radius: 200,
                maxSpeed: 'fast',
                initSpeed: 'fast',
                direction: 135,
                keep: true
            }
        } else if (viewport_width >= 630 && viewport_width < 1024) {
            options = {
                radius: 300,
                maxSpeed: 'fast',
                initSpeed: 'fast',
                direction: 135,
                keep: true
            }
        } else if (viewport_width >= 1024) {
            options = {
                radius: 400,
                maxSpeed: 'fast',
                initSpeed: 'fast',
                direction: 135,
                keep: true
            }
        }
        TagCloud(container, myTags, options);
        const colors = ['#39279a'];
        const random_color = colors[Math.floor(Math.random() * colors.length)];
        document.querySelector('.bubble-skills').style.color = random_color;
    }, []);

    useEffect(() => {
        if (isMobile.any()) {
            setMobile(true)
        }
    }, [])

    return (
        <div className={`${classes.skillsWrapper} ${mobile ? classes.mobile : ''}`}>
            <div className={classes.titleWrapper}>
                <div className={classes.title}><span>{DATA_Skills[lang].title}</span></div>
            </div>
            <div className={classes.allSkills}>
                <div className="globe-skills-wrapper" id='bubble'><span className="bubble-skills"></span></div>
            </div>
        </div>
    )
}
