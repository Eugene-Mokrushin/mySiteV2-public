import React, { Fragment, useEffect, useState } from 'react'
import Head from 'next/head'
import ReactFullpage from "@fullpage/react-fullpage";

import classes from '../sass/Index.module.scss'
import isMobile from '../scripts/isMobile'

import ImageSection from '../components/Index/ImageSection'
import RecentProjectsSection from '../components/Index/RecentProjectsSection'
import GridPhotosSection from '../components/Index/GridPhotosSection'

export default function Main(props) {
    const [mobile, setMobile] = useState(false)

    useEffect(() => {
        if (isMobile.any()) {
            setMobile(true)
        }
    }, [])

    return (
        <Fragment>
            <Head>
                <title>{props.lang === "EN" ? 'Hello!' : props.lang === "DE" ? "Hallo!" : "Привет!" }</title>
            </Head>
            {mobile ?
                <main className={classes.main}>
                    <section className='section'>
                        <ImageSection lang={props.lang} />
                    </section>
                    <section className='section'>
                        <RecentProjectsSection lang={props.lang} projectCardsData={props.projects} />
                    </section>
                    <section className='section'>
                        <GridPhotosSection lang={props.lang} photosData={props.photos} />
                    </section>
                </main>
                :
                <ReactFullpage
                    licenseKey={'key'}
                    scrollingSpeed={800}
                    setAutoScrolling={false}
                    scrollOverflow={false}
                    render={() =>
                        <ReactFullpage.Wrapper>
                            <main className={classes.main}>
                                <section className='section'>
                                    <ImageSection lang={props.lang} />
                                </section>
                                <section className='section'>
                                    <RecentProjectsSection lang={props.lang} projectCardsData={props.projects} />
                                </section>
                                <section className='section'>
                                    <GridPhotosSection lang={props.lang} photosData={props.photos} />
                                </section>
                            </main>
                        </ReactFullpage.Wrapper>
                    }
                />
            }
        </Fragment>
    )
}
export async function getServerSideProps() {
    const projectData = await fetch('http://api').then(res => res.json())
    const galleryPhotos = await fetch('http://api').then(res => res.json())

    return {
        props: {
            projects: projectData,
            photos: galleryPhotos
        }
    }
}