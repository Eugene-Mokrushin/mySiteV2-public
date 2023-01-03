import React, { Fragment, useEffect, useRef, useState } from 'react';
import Footer from '../components/Footer/Footer'
import classes from '../sass/Contacts.module.scss'
import Head from 'next/head'

import DATA_Contacts from '../data/contacts/contacts'

import isMobile from '../scripts/isMobile'
import GoogleMapReact from 'google-map-react'
import mapStyles from '../components/Contacts/mapStyles'

const Contacts = ({ lang }) => {

    const email = useRef(null)
    const mainContacts = useRef(null)
    const [visble, setVisible] = useState(false)
    const [copyVisible, setCopyVisible] = useState(false)
    const [mobile, setMobile] = useState(false)

    useEffect(() => {
        if (isMobile.any()) {
            setMobile(true)
        }
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setVisible(true)
                } else {
                    setVisible(false)
                }

            });
        })
        observer.observe(mainContacts.current)


    }, [])

    function sendEmail() {
        location.href = 'mailto:eugeniymokrushin@gmail.com'
    }

    function copyEmail() {
        if (!mobile) {
            navigator.clipboard.writeText(email.current.innerText);
            setCopyVisible(true)
            setTimeout(() => {
                setCopyVisible(false)
            }, 2000)
        }
    }

    return (
        <Fragment>
            <Head>
                <title>{lang === "EN" ? 'Contacts' : lang === "DE" ? "Kontakte" : "Контакты"}</title>
            </Head>
            <div className={classes.containerContacts}>
                <main ref={mainContacts} className={`${classes.main} ${visble ? classes.visible : classes.hidden} ${mobile ? classes.mobile : ''}`}>
                    <div className={classes.mailTelegram}>
                        <div className={classes.mailWrapper}>
                            <div className={classes.mail} ref={email} onClick={sendEmail}>eugeniymokrushin@gmail.com</div>
                            {!mobile ? <img src="/images/copy.svg" onClick={copyEmail} className={classes.copy} alt="copy"></img> : ''}
                            <div className={classes.fixer} style={copyVisible ? { opacity: 1 } : { opacity: 0 }}>
                                <div className={classes.bubble}>{DATA_Contacts[lang].copy}</div>
                                <div className={classes.pointer}></div>
                            </div>
                        </div>
                        <div className={classes.simple}>{DATA_Contacts[lang].simple}</div>
                        <div className={classes.telegram}>({DATA_Contacts[lang].telegram} - <a href="https://t.me/ZheRoNA">@ZheRoNA</a>)</div>
                    </div>
                    <div className={classes.mapTitle}>
                        <div className={classes.title}>{DATA_Contacts[lang].find}</div>
                        <img src='/images/arrow.png' className={classes.pointer} alt="arrow"></img>
                        <div className={classes.map} id="map">
                            <GoogleMapReact
                                bootstrapURLKeys={{ key: "KEY" }}
                                defaultZoom={13}
                                options={{ styles: mapStyles, fullscreenControl: false, zoomControl: false, mapTypeControl: false, streetViewControl: false, keyboardShortcuts: false }}
                                defaultCenter={{
                                    lat: 48.857076,
                                    lng: 2.347046
                                }}
                            />
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </Fragment>
    );
}

export default Contacts;
