import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import classes from './Index/ImageSection.module.scss'

function Fader({ text, lang }) {
    const [phraseVis, setPhraseVis] = useState(text[0])
    const [fadeProp, setFadeProp] = useState({
        fade: classes.fadeIn
    })


    useEffect(() => {
        let timeOut
        if (fadeProp.fade === classes.fadeOut) {
            timeOut = setInterval(() => {
                setFadeProp({ fade: classes.fadeIn })
                const currentIndex = text.indexOf(phraseVis)
                const length = text.length
                if (currentIndex < length - 1) {
                    setPhraseVis(text[currentIndex + 1])
                } else {
                    setPhraseVis(text[0])
                }
            }, 1000)
        } else {
            timeOut = setInterval(() => {
                setFadeProp({ fade: classes.fadeOut })
            }, 4000)
        }

        return () => clearInterval(timeOut)

    }, [fadeProp, lang])

    return (
        <div className={fadeProp.fade}>
            {phraseVis}
        </div>
    )
}

Fader.defaultProps = {
    text: 'Provide array'
}

Fader.propTypes = {
    text: PropTypes.array,
}

export default Fader