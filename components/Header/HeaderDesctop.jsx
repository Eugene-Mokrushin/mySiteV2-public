import React, { useState, useEffect, useRef, Fragment, useCallback } from 'react'

import { useRouter } from 'next/router'
import Link from 'next/link'

import classes from './HeaderDesctop.module.scss'
import DATA_header from '../../data/header'


const HeaderDesctop = ({ languageSetter, currentLanguage }) => {
    const [btnBG, setBtnBG] = useState(false)
    const [menuState, setMenuState] = useState(false)
    const headerRef = useRef(null)
    const router = useRouter()

    useEffect(() => {
        const handleRouteChange = (url) => {
            setMenuState(false)
        }

        window.addEventListener('wheel', (e) => {
            handleScroll(e)
        })
        router.events.on('routeChangeStart', handleRouteChange)
        return () => {
            router.events.off('routeChangeStart', handleRouteChange)
        }
    }, [])

    const handleScroll = (e) => {
        if (e.deltaY > 0) {
            if (window.location.href.split('/').at(-1) === 'wip' || window.location.href.split('/').at(-1) === 'contacts' || window.location.href.split('/').at(-1) === 'projects' || window.location.href.split('/').at(-1).split('?')[0] === 'projects') {
                return
            }
            setMenuState(true)
        } else {
            setMenuState(false)
        }
    }


    // const handleNavigation = useCallback((e) => {
    //     if (y === null ) {
    //         setY(window.scrollY)
    //     } else {
    //         if (y > window.scrollY) {
    //             setMenuState(true)
    //         } else if (y < window.scrollY) {
    //             if (window.location.href.split('/').at(-1) === 'wip' || window.location.href.split('/').at(-1) === 'contacts' || window.location.href.split('/').at(-1) === 'projects' || window.location.href.split('/').at(-1).split('?')[0] === 'projects') {
    //                 return
    //             }
    //             setMenuState(false)
    //         }
    //         setY(window.scrollY)
    //     }
    // }, [y]);



    const mouseLeave = () => {
        setBtnBG(false)
    }
    const mouseEnter = () => {
        setBtnBG(true)
    }

    const links = DATA_header.links
    const menuItems = DATA_header[currentLanguage].menu.map((item, index) => {
        return (
            <li key={item}><Link href={links[index]}>{item}</Link></li>
        )
    })
    const languagesElements = DATA_header.languages.map(lang => {
        return lang !== currentLanguage ?
            <li
                key={lang}
                className={classes.dropdownContent}
                onClick={(e) => languageSetter(e.target.innerText)}
            >
                {lang}
            </li> :
            null
    })

    return (
        <Fragment>
            <header className={`${classes.header} ${menuState ? classes.hidden : classes.shown}`} ref={headerRef} id="trueHeader">
                <nav className={classes.navDescktop}>
                    {menuItems}
                </nav>
                <ul className={classes.languageDropdown}>
                    <li
                        className={classes.currentLanguage}
                        onClick={(e) => languageSetter(e.target.innerText)}
                        style={{ backgroundColor: btnBG ? "#2e1c6d" : "#0f0925" }}
                    >
                        {currentLanguage}
                    </li>
                    <ul className={classes.langWrapper} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
                        {languagesElements}
                    </ul>
                </ul>
            </header>
            <div className={classes.fakeHeader}></div>
        </Fragment>
    );
}

export default HeaderDesctop;


