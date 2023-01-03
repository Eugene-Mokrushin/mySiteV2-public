import { Fragment, useState, useRef, useEffect, useCallback } from 'react'

import Link from 'next/link'
import Image from 'next/image'


import classes from './HeaderMobile.module.scss'
import DATA_header from '../../data/header'
import makeid from '../../scripts/makeId'

export default function Sidebar({ languageSetter, currentLanguage }) {

    const [languageToggle, setLaguageToggle] = useState(false)
    const [menuToggle, setMenuToggle] = useState(false)
    const [scrollActive, setScrollActive] = useState(false)
    const [y, setY] = useState(window.scrollY);

    const handleNavigation = useCallback(
        e => {
            const window = e.currentTarget;
            if (y > window.scrollY) {
                setLaguageToggle(false)
                setScrollActive(false)
                setMenuToggle(false)
            } else if (y < window.scrollY) {
                setLaguageToggle(false)
                setMenuToggle(false)
                if (window.scrollY < 100) {
                    setScrollActive(false)
                } else {
                    setScrollActive(true)
                }
            }
            setY(window.scrollY);
        }, [y]
    );

    const links = DATA_header.links
    const menuItems = DATA_header[currentLanguage].menu.map((item, index) => {
        return (
            <li key={makeid(13)} className={classes.menuItemBtn} onClick={handleCloseAll}>
                <Link href={links[index]}>{item}</Link>
            </li>
        )
    })
    const languagesElements = DATA_header.languages.map(lang => {
        return lang !== currentLanguage ?
            <li
                key={lang}
                className={classes.dropdownContent}
                onClick={(e) => { languageSetter(e.target.innerText); handleCloseAll }}
            >
                {lang}
            </li> :
            null
    })

    useEffect(() => {
        setY(window.scrollY);
        window.addEventListener("scroll", handleNavigation);

        return () => {
            window.removeEventListener("scroll", handleNavigation);
        };
    }, [handleNavigation])

    function handleCloseAll() {
        setMenuToggle(false)
        setLaguageToggle(false)
    }

    function toggleLang() {
        setMenuToggle(false)
        setLaguageToggle(prev => !prev)
    }

    function toggleMenu() {
        setLaguageToggle(false)
        setMenuToggle(prev => !prev)
    }

    return (
        <div className={`${classes.headerWrapper} ${scrollActive ? classes.hideHeader : classes.showHeader}`}>
            <div className={`${classes.btnBgL} ${menuToggle ? classes.btnBgLVis : ''}`}></div>
            <div className={`${classes.btnBgR} ${languageToggle ? classes.btnBgRVis : ''}`}></div>
            <nav role="navigation" className={classes.nav}>
                <div className={`${classes.menuToggle} ${menuToggle ? classes.visible : ''}`}>
                    <div className={classes.burger} onClick={toggleMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <ul className={classes.menu}>
                        {menuItems}
                    </ul>
                </div>
            </nav>
            <div className={classes.language}>
                <ul className={`${classes.dropLng} ${languageToggle ? classes.visible : ''}`}>
                    {languagesElements}
                </ul>
                <img src={languageToggle ? '/images/menuCross.svg' : '/images/trIcon.svg'}
                    onClick={toggleLang}
                />
            </div>
        </div>
    )
}