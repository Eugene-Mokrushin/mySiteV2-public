import React, { useEffect, useState, Fragment, useRef } from 'react'

import { useRouter } from 'next/router'
import Head from 'next/head';

import makeId from '../../scripts/makeId'
import isMobile from '../../scripts/isMobile'

import DATA_Projects from '../../data/projects/projects'
import classes from '../../sass/AllProjects.module.scss'

import Card from '../../components/Projects/Card'
import Footer from '../../components/Footer/Footer'


export default function AllProjects({ allProjects, lang }) {
    const _fullOpen = 90
    const _splitted = 33.33
    const _closed = 5
    const lgSection = useRef(null)
    const mdSection = useRef(null)
    const slSection = useRef(null)
    const [wrappedList, setWrappedList] = useState([_splitted, _splitted, _splitted])
    const [selectedTag, setSelectedTag] = useState(undefined)
    const [mobile, setMobile] = useState(false)
    const router = useRouter()

    let largePj = allProjects.filter(project => project.size === "large").map((project, index) => {
        return (
            <Card
                key={makeId(11)}
                id={project._id}
                img={project.coverImg}
                title={project.title}
                date={project.date}
                tags={project.tags}
                lang={lang}
            />
        )
    }).reverse()
    let mediumPj = allProjects.filter(project => project.size === "medium").map((project, index) => {
        return (
            <Card
                key={makeId(12)}
                id={project._id}
                img={project.coverImg}
                title={project.title}
                date={project.date}
                tags={project.tags}
                lang={lang}
            />
        )
    }).reverse()
    let smallPj = allProjects.filter(project => project.size === "small").map((project, index) => {
        return (
            <Card
                key={makeId(13)}
                id={project._id}
                img={project.coverImg}
                title={project.title}
                date={project.date}
                tags={project.tags}
                lang={lang}
            />
        )
    }).reverse()


    const { tag } = router.query
    if (tag !== selectedTag) setSelectedTag(tag)
    if (tag !== undefined) {
        largePj = largePj.map(project => {
            let isValid = project.props.tags.map(tagI => tagI.tagName === tag)
            return isValid.includes(true) ? project : null
        })
        mediumPj = mediumPj.map(project => {
            let isValid = project.props.tags.map(tagI => tagI.tagName === tag)
            return isValid.includes(true) ? project : null
        })
        smallPj = smallPj.map(project => {
            let isValid = project.props.tags.map(tagI => tagI.tagName === tag)
            return isValid.includes(true) ? project : null
        })

    }

    useEffect(() => {
        if (wrappedList.indexOf(_fullOpen) !== -1) {
            const selectedToVis = document.querySelectorAll('.section')[wrappedList.indexOf(_fullOpen)].children[1].children
            for (let index = 0; index < selectedToVis.length; index++) {
                selectedToVis[index].style.opacity = 1
            }
        }
    }, [selectedTag])



    useEffect(() => {
        if (isMobile.any()) {
            setMobile(true)
        }
        setWrappedList([_splitted, _splitted, _splitted])
    }, [lang])

    function handleRemoveTag() {
        router.push({ pathname: '/projects' })
    }

    function animate(element) {
        return new Promise(resolve => {
            let animation = element.animate([
                {
                    opacity: 0,
                    transform: "scale(1.2)"
                },
                {
                    opacity: 1,
                    transform: "scale(1.0)"
                }
            ], {
                duration: 200,
                directon: "forwards"
            })
            animation.onfinish = () => {
                resolve()
            }
        });
    }

    function selectSection(section, e) {
        slSection.current.scrollIntoView();
        mdSection.current.scrollIntoView();
        lgSection.current.scrollIntoView();
        let arr = [_closed, _closed, _closed]
        arr[section] = _fullOpen
        wrappedList[section] === _fullOpen ? null : setWrappedList(arr)
        if (wrappedList[section] !== _fullOpen) {
            const sectionSelected = e.target.className.includes("title") ? e.target.parentNode : e.target
            const cardsOpened = sectionSelected.lastElementChild.children

            setTimeout(async () => {
                for (let index = 0; index < cardsOpened.length; index++) {
                    await animate(cardsOpened[index]);
                    cardsOpened[index].style.opacity = 1
                }
            }, 200)
        }
    }

    return (
        <Fragment>
            <Head>
                <title>{lang === "EN" ? 'Projects' : lang === "DE" ? "Projekte" : "Проекты" }</title>
            </Head>
            {mobile ? <div className={classes.mainTitle}>{DATA_Projects[lang].mainTitle}</div> : null}
            <div className={`${classes.allProjectsWrapper}  ${mobile ? classes.mobile : ''}`} style={{ maxHeight: "100vh" }}>
                <main className={classes.mainWrapper}>
                    {tag !== undefined ? <div className={classes.tagSelected}>
                        <span>{tag}</span>
                        <picture>
                            <img src="/images/cross.svg" alt="close" onClick={handleRemoveTag} />
                            <img src="/images/cross.svg" alt="close" onClick={handleRemoveTag} />
                            <img src="/images/cross.svg" alt="close" onClick={handleRemoveTag} />
                        </picture>
                    </div> : null}
                    <div className={
                        `${wrappedList[0] === _fullOpen ? classes.shownFull : ""} 
                    ${wrappedList[0] === _splitted ? classes.splitted : ""} 
                    ${wrappedList[0] === _closed ? classes.hidden : ""} 
                    ${classes.common} section`
                    }
                        style={{
                            backgroundColor: "#3d2497",
                            width: `${wrappedList[0]}vw`
                        }}
                        onClick={(e) => selectSection(0, e)}
                    >
                        <div className={classes.title}>
                            {DATA_Projects[lang].titleLarge}
                        </div>
                        <div className={classes.content} ref={lgSection}>
                            {largePj.filter(item => item !== null).length === 0 ? <img className={classes.nothing} src="./images/nothing.gif" alt="Nothing found" /> : largePj}
                        </div>
                    </div>
                    <div className={
                        `${wrappedList[1] === _fullOpen ? classes.shownFull : null} 
                    ${wrappedList[1] === _splitted ? classes.splitted : null} 
                    ${wrappedList[1] === _closed ? classes.hidden : null} 
                    ${classes.common} ${wrappedList[0] !== _splitted ? classes.medium : null} section`
                    }
                        style={{
                            backgroundColor: "#4c2dbd",
                            width: `${wrappedList[1]}vw`
                        }}
                        onClick={(e) => selectSection(1, e)}
                    >
                        <div className={classes.title}>
                            {DATA_Projects[lang].titleMedium}
                        </div>
                        <div className={classes.content} ref={mdSection}>
                            {mediumPj.filter(item => item !== null).length === 0 ? <img className={classes.nothing} src="./images/nothing.gif" alt="Nothing found" /> : mediumPj}
                        </div>
                    </div>
                    <div className={
                        `${wrappedList[2] === _fullOpen ? classes.shownFull : null} 
                   ${wrappedList[2] === _splitted ? classes.splitted : null} 
                   ${wrappedList[2] === _closed ? classes.hidden : null} 
                   ${classes.common} section`
                    }
                        style={{
                            backgroundColor: "#5b36e3",
                            width: `${wrappedList[2]}vw`
                        }}
                        onClick={(e) => selectSection(2, e)}
                    >
                        <div className={classes.title}>
                            {DATA_Projects[lang].titleSmall}
                        </div>
                        <div className={classes.content} ref={slSection}>
                            {smallPj.filter(item => item !== null).length === 0 ? <img className={classes.nothing} src="./images/nothing.gif" alt="Nothing found" /> : smallPj}
                        </div>
                    </div>
                </main>
                {mobile ? '' : <Footer style={{ maxHeight: '13.2vh' }} />}
            </div>
        </Fragment>
    )
}
export async function getServerSideProps() {
    let projectData = await fetch('http://api').then(res => res.json())
    return {
        props: {
            allProjects: projectData,
        }
    }
}

