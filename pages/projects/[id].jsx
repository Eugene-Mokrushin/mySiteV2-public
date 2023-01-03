import React, { useEffect, useRef, Fragment, useCallback, useState } from 'react';
import Footer from '../../components/Footer/Footer'

import Link from 'next/link'
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Head from 'next/head';

import random from '../../scripts/RandomBetween';
import makeid from '../../scripts/makeId';
import isMobile from '../../scripts/isMobile'

import classes from '../../sass/SelectedProject.module.scss'

import DATA_specific from '../../data/projects/specific'

const ProjectId = ({ lang, projectData }) => {
    const CustomEditor = dynamic(import('../../components/Projects/CustomEditor'), { ssr: false });

    const titleRef = useRef(null)
    const imgRef = useRef(null)
    const tagsRef = useRef(null)
    const mainContentRef = useRef(null)
    const buttonUpRef = useRef(null)
    const articleRef = useRef(null)
    const mainRef = useRef(null)
    const linksRef = useRef(null)
    const [mobile, setMobile] = useState(false);

    const text = DATA_specific[lang].text.split('<br>').map(t => {
        return (
            <span key={makeid(12)} className={classes.textPart}>{t}</span>
        )
    })
    const date = projectData.date.split('-')[2].split('T')[0] + "." + projectData.date.split('-')[1] + "." + projectData.date.split('-')[0]
    const allTags = projectData.tags.map(tag => {
        return (
            <Link
                href={
                    {
                        pathname: '/projects',
                        query: {
                            tag: tag.tagName
                        }
                    }
                }
                key={makeid(15)}
            >
                <div className={classes.tag}
                    onMouseOver={e => handleHoverTag(e)}
                    onMouseLeave={e => handleLeaveTag(e)}
                >
                    <div className={classes.textSpan}>{tag.tagName}</div>
                </div>
            </Link>
        )
    })

    const isScrolledIntoView = useCallback(() => {
        const position = tagsRef.current.getBoundingClientRect();
        if ((position.top < window.innerHeight && position.bottom >= 0) || (position.top >= 0 && position.bottom <= window.innerHeight)) {
            linksRef.current.style.position = "absolute"
            linksRef.current.style.top = 50 + 'px';
        } else {
            linksRef.current.style.position = "fixed"
            if (document.querySelector('#trueHeader').getClientRects()[0].y > -100) {
                linksRef.current.style.top = document.querySelector('#trueHeader').getClientRects()[0].height + 50 + 'px';
            } else {
                linksRef.current.style.top = 50 + 'px';
            }
        }
    })

    useEffect(() => {
        if (isMobile.any()) {
            setMobile(true)
        }
    }, [])

    useEffect(() => {
        getBrightness(projectData.coverImg, (b) => { b > 150 ? titleRef.current.style.color = "black" : null });
        setTimeout(() => {
            const elements = document.querySelectorAll('.ce-block')
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('shownP')
                    } else {
                        entry.target.classList.remove('shownP')
                    }
                })
            })
            elements.forEach((el) => observer.observe(el))
        }, 1000)
    }, [lang])

    useEffect(() => {
        if (!mobile) {
            window.addEventListener('scroll', isScrolledIntoView)
            return () => window.removeEventListener('scroll', isScrolledIntoView)
        }
    }, [[isScrolledIntoView, mobile]])

    return (
        <Fragment>
            <Head>
                <title>{projectData.title}</title>
            </Head>
            <main className={`${classes.main} ${mobile ? classes.mobile : ''}`} id={mobile ? "mArticle" : ""} ref={mainRef}>
                <section className={classes.mainContent}>
                    <div className={classes.imgTitle} >
                        <div
                            ref={imgRef}
                            className={classes.imgWrapper}
                            style={{ backgroundImage: `url(${projectData.coverImg})` }}
                            id='imgWrapper'
                        >
                        </div>
                        <span className={classes.title} ref={titleRef}>{projectData.title}</span>
                    </div>
                    <div className={classes.tagsNDate}>
                        <div className={classes.tagsWrapper} ref={tagsRef}>
                            {allTags}
                        </div>
                        <div className={classes.date}>
                            <div className={classes.date}>{date}</div>
                        </div>
                    </div>
                    <div className={classes.articleNDate} ref={mainContentRef}>
                        <div className={classes.article} ref={articleRef}>
                            <CustomEditor data={projectData.data} />
                        </div>
                        <div className={classes.links} ref={linksRef}>
                            <div className={classes.text}>
                                {text}
                            </div>
                            <div className={classes.linkImgWrapper}>
                                {projectData.gitLink.length > 4
                                    ?
                                    <Link href={projectData.gitLink}>
                                        <div className={classes.imgWrapper}>
                                            <Image
                                                src={'/images/git.png'}
                                                alt='socialMedias'
                                                width={40}
                                                height={40}
                                                className={classes.image}
                                            />
                                        </div>
                                    </Link>
                                    :
                                    null
                                }
                                {projectData.codePenLink.length > 4
                                    ?
                                    <Link href={projectData.codePenLink}>
                                        <div className={classes.imgWrapper}>
                                            <Image
                                                src={'/images/codepen.png'}
                                                alt='socialMedias'
                                                width={40}
                                                height={40}
                                                className={classes.image}
                                            />
                                        </div>
                                    </Link>
                                    :
                                    null
                                }
                                {projectData.siteLink.length > 4
                                    ?
                                    <Link href={projectData.siteLink}>
                                        <div className={classes.imgWrapper}>
                                            <Image
                                                src={'/images/web.png'}
                                                alt='socialMedias'
                                                width={40}
                                                height={40}
                                                className={classes.image}
                                            />
                                        </div>
                                    </Link>
                                    :
                                    null
                                }
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </main>
        </Fragment>
    );
}

export default ProjectId;

export const getServerSideProps = async (context) => {
    const id = context.params.id
    const res = await fetch('http://api/' + id)
    const data = await res.json()
    return {
        props: { projectData: data }
    }
}

function getBrightness(imageSrc, callback) {
    const img = document.createElement("img");
    img.src = imageSrc;
    img.crossOrigin = 'anonymous';
    img.style.display = "none";
    document.body.appendChild(img);
    let colorSum = 0;

    img.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        let r, g, b, avg;

        for (let x = 0, len = data.length; x < len; x += 4) {
            r = data[x];
            g = data[x + 1];
            b = data[x + 2];
            avg = Math.floor((r + g + b) / 3);
            colorSum += avg;
        }

        const brightness = Math.floor(colorSum / (this.width * this.height));
        callback(brightness);
        canvas.remove()
    }
};

function handleHoverTag(e) {
    if (e.target.className.includes('Span')) {
        const targetElem = e.target.className.includes('tag') ? e.target : e.target.parentNode
        // const targetElem = e.target
        targetElem.style.background = "url(https://link.webp) 1000%"
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
