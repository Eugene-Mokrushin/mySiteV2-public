import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import isUrlValid from '../../scripts/ValidUrl'
import makeid from '../../scripts/makeId'
import random from '../../scripts/RandomBetween'
import classes from './ProjectCard.module.scss'
import isMobile from '../../scripts/isMobile'

export default function ProjectCards({ id, img, title, date, tags, flip }) {
    const day = date.split('T')[0].split('-')[2]
    const month = date.split('T')[0].split('-')[1]
    const year = date.split('T')[0].split('-')[0]
    const dateFormated = day + '/' + month + '/' + year

    const cardRef = useRef(null)
    const [isActive, setIsActive] = useState(false)
    const [mobile, setMobile] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsActive(true)
                } else {
                    setIsActive(false)
                }
            });
        })
        observer.observe(cardRef.current)
    }, [])

    useEffect(() => {
        if (isMobile.any()) {
            setMobile(true)
        }
    }, [])

    const tagsDisplay = Array.isArray(tags) ? tags.map((tag) => (
        <Link
            href={`/projects?tag=${tag.tagName}`}
            key={makeid(15)}
        >
            <div className={classes.tag}
                onMouseOver={e => handleHoverTag(e)}
                onMouseLeave={e => handleLeaveTag(e)}
            >
                <div className={classes.textSpan}>{tag.tagName}</div>
            </div>
        </Link>
    )) : 'noData'

    return (
        <Link
            href={`/projects/${id}`}
        >
            <article className={
                `${classes.card}
                ${isActive ? classes.visible : ''}
                ${classes[flip]}
                ${mobile ? classes.mobile : ''}
                `
            } id="cardProject" ref={cardRef}>
                <div className={classes.projectWrapper}>
                    <div className={classes.imgWrapper}>
                        {
                            isUrlValid(img) ?
                                <Image
                                    src={img}
                                    alt="Project Cover"
                                    layout='fill'
                                    objectFit='cover'
                                /> :
                                <Image
                                    src='https://i.ibb.co/yY9mmwQ/unavailable-image.jpg'
                                    alt="Image Unavailable"
                                    layout='fill'
                                    objectFit='cover'
                                />
                        }
                    </div>
                    <div className={classes.titleTagsWrapper}>
                        <div className={classes.date}>{dateFormated}</div>
                        <div className={classes.title}>
                            <h3>{title}</h3>
                        </div>
                        <div className={classes.tags}>
                            {tagsDisplay}
                        </div>
                        <svg viewBox="0 0 500 98" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0,80 C150,100 350,0 500,30 L500,00 L0,0 Z" ></path>
                        </svg>
                    </div>
                </div>
            </article>
        </Link>
    )
}

function handleHoverTag(e) {
    if (e.target.className.includes('Span') || e.target.className.includes('tag')) {
        const targetElem = e.target.className.includes('tag') ? e.target : e.target.parentNode
        targetElem.style.background = "url(https://i.ibb.co/vJ8xdhX/color-gradient-background-design-abstract-260nw-1176137125.webp) 1000%"
        targetElem.animate([
            {
                backgroundPosition: `${random(55, 100)}% 50%`
            },
            {
                backgroundPosition: `${random(0, 25)}% 50%`
            }
        ], {
            duration: 10000,
            iterations: Infinity,
            directon: "alternate-reverse"
        })
        targetElem.style.zIndex = 2000;
    }
}

function handleLeaveTag(e) {
    if (e.target.className.includes('tag')) {
        e.target.style.background = 'none'
    } else {
        e.target.parentNode.style.background = 'none'
    }
}
