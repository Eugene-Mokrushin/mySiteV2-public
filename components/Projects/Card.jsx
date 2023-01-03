import React, { useRef, useState, useEffect, Fragment } from 'react'

import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

import isMobile from '../../scripts/isMobile'
import makeid from '../../scripts/makeId'
import random from '../../scripts/RandomBetween'

import classes from './Card.module.scss'

export default function Card({ title, img, tags, date, id, lang }) {
    const tagsRef = useRef(null)
    const titleRef = useRef(null)
    const imageRef = useRef(null)
    const dateRef = useRef(null)
    const [isHidden, setIsHidden] = useState(true)
    const [mobile, setMobile] = useState(false)

    useEffect(() => {
        if (isMobile.any()) {
            setMobile(true)
        }
    }, [])


    const router = useRouter()

    let formatedDate = date.split('T')[0].split('-')

    function handleHover(e) {
        if (e.target.className.includes('Span')) {
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

    function handleMouse(isOver, flag, e) {
        if (!mobile) {
            if (flag === undefined) {
                if (isOver) {
                    titleRef.current.style.opacity = "0"
                    dateRef.current.style.transform = "translateY(-18px)"
                    dateRef.current.style.opacity = "1"
                    setIsHidden(false)
                } else {
                    titleRef.current.style.opacity = "1"
                    dateRef.current.style.transform = "translateY(40px)"
                    dateRef.current.style.opacity = "0"
                    setIsHidden(true)
                }
            } else if (flag) {
                const targetElem = e.target.className.includes('tag') ? e.target : e.target.parentNode
                targetElem.style.background = 'white'
                titleRef.current.style.opacity = "1"
                targetElem.style.zIndex = 0;
                dateRef.current.style.transform = "translateY(40px)"
                dateRef.current.style.opacity = "0"
                setIsHidden(true)
            }
        }
    }

    const tagI = router.query

    const ajustedTags = tags.map((tag, index) => {
        return (
            <Fragment key={makeid(12)}>
                {tagI.tag === tag.tagName ?
                    <div className={`${classes.tag} ${classes.hidden} tag`}
                        onMouseEnter={() => handleMouse(true)}
                        onMouseLeave={(e) => handleMouse(false, true, e)}
                        onMouseOver={(e) => handleHover(e)}
                        key={makeid(12)}
                    >
                        <div className={classes.textSpan}
                        >
                            {tag.tagName}
                        </div>
                    </div> :
                    <Link
                        href={
                            {
                                pathname: '/projects',
                                query: {
                                    tag: tag.tagName
                                }
                            }
                        }
                        key={makeid(10)}
                    >
                        <div className={`${classes.tag} ${classes.hidden} tag`}
                            onMouseEnter={() => handleMouse(true)}
                            onMouseLeave={(e) => handleMouse(false, true, e)}
                            onMouseOver={(e) => handleHover(e)}
                            key={makeid(11)}
                        >
                            <div className={classes.textSpan}
                            >
                                {tag.tagName}
                            </div>
                        </div>
                    </Link>
                }
            </Fragment>
        )
    })

    return (
        <div className={`${classes.cardWrapper} ${mobile ? classes.mobile : classes.tagTrigger}`} id="card">
            <div className={classes.date}
                ref={dateRef}
            >
                {formatedDate[2] + '.' + formatedDate[1] + '.' + formatedDate[0]}
            </div>
            <Link href={{
                pathname: `/projects/${id}`
            }}>
                <div
                    className={classes.imgTitleWrapper}
                    onMouseEnter={(e) => { handleMouse(true) }}
                    onMouseLeave={(e) => { handleMouse(false) }}
                >
                    <div className={`${isHidden ? classes.hidden : classes.shown} ${classes.imgWrapper}`} ref={imageRef}>
                        <Image
                            src={img}
                            alt="Project Cover"
                            layout='fill'
                            objectFit='cover'
                            quality={15}
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL='https://i.ibb.co/DV5CGv5/white-blurred-background-1034-249.webp'
                        />
                    </div>
                    <div className={classes.title} ref={titleRef}>{title}</div>
                </div>
            </Link >
            <div className={classes.tagsWrapper} ref={tagsRef}>
                {ajustedTags}
            </div>
        </div>
    )
}



