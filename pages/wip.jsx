import { Fragment, useEffect, useState, useRef } from "react"
import { useRouter } from "next/router";
import Head from "next/head"
import Image from "next/image"
import classes from '../sass/WIP.module.scss'
import Footer from '../components/Footer/Footer'

export default function WIP({ lang, data }) {
    const wipSection = useRef(null)
    const [collarWidth, setColarWidth] = useState(0)
    const [screenChange, setScreenChange] = useState(0)
    const [wipVisibility, setWIPVisibility] = useState('hidden')
    const [growingProgres, setGrowingProgre] = useState(1)
    const router = useRouter()

    useEffect(() => {
        let timeOut

        setColarWidth(document.querySelector('#collar').getBoundingClientRect().width)
        window.addEventListener('resize', () => { setScreenChange(window.innerWidth) })

        const handleRouteChange = (url) => {
            clearTimeout(timeOut)
        }

        router.events.on('routeChangeStart', handleRouteChange)

        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setWIPVisibility('shown')
                } else {
                    setWIPVisibility('hidden')
                }
                
            });
        })
        
        observer.observe(wipSection.current)
        
        if (+growingProgres < +data.progress) {
            timeOut = setTimeout(() => {
                setColarWidth(document.querySelector('#collar').getBoundingClientRect().width)
                setGrowingProgre(prev => prev + 1)
            }, 10)
        }
        return (() => {
            observer.disconnect()
            router.events.off('routeChangeStart', handleRouteChange)
        })

    }, [screenChange, growingProgres])

    return (
        <Fragment>
            <Head>
                <title>{lang === "EN" ? 'WIP' : lang === "DE" ? "In Arbeit" : "В работе" }</title>
            </Head>
            <main className={`${classes.main} ${wipVisibility === "shown" ? classes.shownWIP : classes.hiddenWIP}`} ref={wipSection}>
                <div className={classes.wipWrapper}>
                    <div className={classes.photoTextWrapper}>
                        <div className={classes.imgTitleWrapper}>
                            <div className={classes.imageWrapper}>
                                <Image
                                    src={data.coverImg}
                                    alt="Project Cover"
                                    layout='fill'
                                    objectFit='cover'
                                />
                            </div>
                            <h1 className={classes.title}>
                                {data.title}
                            </h1>
                        </div>
                        <div className={classes.description}>
                            <span className={classes.firstLetter}>{data.description[0]}</span>
                            {data.description.slice(1)}
                        </div>
                    </div>
                    <div className={classes.barWrapper} id="page-wrap">
                        <div className={classes.meter + ' ' + classes.animate}>
                            <span style={{ width: `${growingProgres}%` }} id="collar">
                                <span></span>
                            </span>
                            <div className={classes.pin} style={{ left: `${+collarWidth - 10}px` }}>{growingProgres}</div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </Fragment>

    )
}

export async function getServerSideProps() {

    const wipData = await fetch('http://api').then(res => res.json())

    return {
        props: {
            data: wipData,
        }
    }
}