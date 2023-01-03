import { useState, useEffect, Fragment } from "react"

import Sidebar from "./HeaderMobile"
import HeaderDesctop from "./HeaderDesctop"

import mobile from '../../scripts/isMobile'

export default function Header({ languageSetter, currentLanguage }) {
    const [isMobile, setIsMonile] = useState(false)

    useEffect(() => {
        if (mobile.any()) {
            setIsMonile(true)
        }

        function handleResize() {
            if (mobile.any()) {
                setIsMonile(true)
            }
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <Fragment>
            {isMobile ?
                <Sidebar
                    languageSetter={languageSetter}
                    currentLanguage={currentLanguage}
                />
                :
                <HeaderDesctop
                    languageSetter={languageSetter}
                    currentLanguage={currentLanguage}
                />
            }
        </Fragment>

    )
}