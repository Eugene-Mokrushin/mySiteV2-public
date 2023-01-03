import React, { Fragment, useState, useEffect } from 'react';
import ReactFullpage from "@fullpage/react-fullpage";
import Head from 'next/head'

import isMobile from '../scripts/isMobile'
import classes from '../sass/About.module.scss'

import Initial from '../components/About/Initial';
import Skills from '../components/About/Skills';
import History from '../components/About/History';
import Reading from '../components/About/Reading';
import Diplomas from '../components/About/Diplomas';

const About = (props) => {

    const [mobile, setMobile] = useState(false)

    useEffect(() => {
        if (isMobile.any()) {
            setMobile(true)
        }
    }, [])

    return (
        <Fragment>
            <Head>
                <title>{props.lang === "EN" ? 'About' : props.lang === "DE" ? "Über Mich" : "О себе" }</title>
            </Head>
            {!mobile
                ?
                <ReactFullpage
                    licenseKey={'KEY'}
                    scrollingSpeed={800}
                    scrollOverflow={false}
                    render={() =>
                        <ReactFullpage.Wrapper>
                            <main className={classes.mainAbout}>
                                <section className='section'>
                                    <Initial lang={props.lang} />
                                </section>
                                <section className='section'>
                                    <Skills lang={props.lang} />
                                </section>
                                <section className='section'>
                                    <History lang={props.lang} />
                                </section>
                                <section className='section'>
                                    <Reading lang={props.lang} />
                                </section>
                                <section className='section'>
                                    <Diplomas lang={props.lang} />
                                </section>
                            </main>
                        </ReactFullpage.Wrapper>
                    }
                />
                :
                <main className={classes.mainAbout}>
                    <section className='section'>
                        <Initial lang={props.lang} />
                    </section>
                    <section className='section'>
                        <Skills lang={props.lang} />
                    </section>
                    <section className='section'>
                        <History lang={props.lang} />
                    </section>
                    <section className='section'>
                        <Reading lang={props.lang} />
                    </section>
                    <section className='section'>
                        <Diplomas lang={props.lang} />
                    </section>
                </main>
            }
        </Fragment >
    );
}

export default About;
