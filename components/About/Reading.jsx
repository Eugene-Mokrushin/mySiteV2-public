import clsx from "clsx"
import React, { useState, useEffect } from 'react'

import classes from './Reading.module.scss'
import DATA_Reading from '../../data/about/reading'
import isMobile from "../../scripts/isMobile"

const animationStyle = classes.animStyle
export default function Reading({ lang }) {
    const [focusedIndex, setFocusedIndex] = useState(2)
    const [mobile, setMobile] = useState(false)

    useEffect(() => {
        if (isMobile.any()) {
            setMobile(true)
            setFocusedIndex(-1)
        }
    }, []);

    return (
        <div className={`${classes.readingWrapper} ${mobile ? classes.mobile : ''}`}>
            <div className={classes.titleWrapper}>
                <span className={classes.title}>
                    <span>{DATA_Reading[lang].title}</span>
                </span>
            </div>
            <div className={classes.allBooks}>
                <div role="list" className={classes.books}>
                    {DATA_Reading[lang].books.map((book, index) => (
                        <button
                            role="listitem"
                            key={book.title}
                            onClick={() => {
                                if (index === focusedIndex) {
                                    setFocusedIndex(-1)
                                } else {
                                    setFocusedIndex(index)
                                }
                            }}
                            className={clsx(
                                classes.button1,
                                focusedIndex !== index && classes.buttonH,
                                focusedIndex === index ? classes.buttonB1 : classes.buttonB2,
                                animationStyle
                            )}
                        >
                            <div
                                className={clsx(
                                    classes.div2,
                                    animationStyle
                                )}
                                style={{
                                    backgroundColor: book.spineBackgroundColor,
                                    color: book.spineForegroundColor,
                                    transformStyle: "preserve-3d",
                                    transform: `translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(${focusedIndex === index ? "-60deg" : "0deg"
                                        }) rotateZ(0deg) skew(0deg, 0deg)`,
                                }}
                            >
                                <span
                                    aria-hidden
                                    className={classes.span3}
                                />
                                <h2 className={classes.h2} style={{ writingMode: "vertical-lr" }}>
                                    {book.title}
                                </h2>
                            </div>
                            <div
                                className={clsx(
                                    classes.div1,
                                    animationStyle
                                )}
                                style={{
                                    transformStyle: "preserve-3d",
                                    transform: `translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(${focusedIndex === index ? "30deg" : "95deg"
                                        }) rotateZ(0deg) skew(0deg, 0deg)`,
                                }}
                            >
                                <span
                                    aria-hidden
                                    className={classes.span2}
                                />
                                <span
                                    aria-hidden
                                    className={classes.span1}
                                    style={{
                                        background: `linear-gradient(to right, rgba(255, 255, 255, 0) 2px, rgba(255, 255, 255, 0.5) 3px, rgba(255, 255, 255, 0.25) 4px, rgba(255, 255, 255, 0.25) 6px, transparent 7px, transparent 9px, rgba(255, 255, 255, 0.25) 9px, transparent 12px)`,
                                    }}
                                />
                                <img src={book.coverUrl} alt={book.title} className={clsx(classes.title1, animationStyle)} />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
