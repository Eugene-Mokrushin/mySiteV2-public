import React, { Fragment, useEffect, useRef, useState } from 'react';
import Image from 'next/image'
import classes from './Initial.module.scss'

import DATA_Initial from '../../data/about/initial'
import isMobile from '../../scripts/isMobile';


const Initial = (props) => {

    const initSection = useRef(null)
    const [initVisibility, setInitVisibility] = useState(false)
    const [mobile, setMobile] = useState(false)

    useEffect(() => {
        class TextScramble {
            constructor(el) {
                this.el = el;
                this.chars = '!<>-_\\/[]{}—=+*^?#________';
                this.update = this.update.bind(this);
            }
            setText(newText) {
                const oldText = this.el.innerText;
                const length = Math.max(oldText.length, newText.length);
                const promise = new Promise(resolve => this.resolve = resolve);
                this.queue = [];

                for (let i = 0; i < length; i++) {
                    const from = oldText[i] || '';
                    const to = newText[i] || '';
                    const start = Math.floor(Math.random() * 40);
                    const end = start + Math.floor(Math.random() * 40);
                    this.queue.push({
                        from,
                        to,
                        start,
                        end
                    });
                }
                cancelAnimationFrame(this.frameRequest);
                this.frame = 0;
                this.update();
                return promise;
            }
            update() {
                let output = '';
                let complete = 0;

                for (let i = 0, n = this.queue.length; i < n; i++) {
                    let {
                        from,
                        to,
                        start,
                        end,
                        char
                    } = this.queue[i];

                    if (this.frame >= end) {
                        complete++;
                        output += to;
                    } else if (this.frame >= start) {
                        if (!char || Math.random() < 0.28) {
                            char = this.randomChar();
                            this.queue[i].char = char;
                        }

                        output += `<span class="dud">${char}</span>`;
                    } else {
                        output += from;
                    }
                }

                this.el.innerHTML = output;

                if (complete === this.queue.length) {
                    this.resolve();
                } else {
                    this.frameRequest = requestAnimationFrame(this.update);
                    this.frame++;
                }
            }
            randomChar() {
                return this.chars[Math.floor(Math.random() * this.chars.length)];
            }
        }
        const phrases = DATA_Initial[props.lang].phrases;
        const el = document.querySelector('#text-scramble');
        const fx = new TextScramble(el);
        let counter = 0;

        const next = () => {
            fx.setText(phrases[counter]).then(() => {
                setTimeout(next, 2000);
            });
            counter = (counter + 1) % phrases.length;
        };
        next();
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setInitVisibility(true)
                } else {
                    setInitVisibility(false)
                }

            });
        })
        observer.observe(initSection.current)
        return (() => {
            observer.disconnect()
        })

    }, [])

    useEffect(() => {
        if (isMobile.any()) {
            setMobile(true)
        }
    }, [])



    return (
        <Fragment>
            <div className={classes.fakeHeader}></div>
            <div
                className={
                    `${classes.initialWrapper} 
                    ${initVisibility ? classes.visible : classes.invisible} 
                    ${mobile ? classes.mobile : ''}`}
                ref={initSection}>
                <div className={classes.contentWrapper}>
                    <div className={classes.wrapperImg}>
                        <div className={classes.imageWrapper}>
                            <Image
                                src={mobile ? '/images/me2.jpg' : '/images/about_photo.jpg'}
                                layout='fill'
                                objectFit='cover'
                                priority={true}
                            // quality={100}
                            />
                        </div>
                    </div>
                    <div className={classes.textWrapper}>
                        <h1 className={classes.title}>{DATA_Initial[props.lang].title}</h1>
                        <div className={classes.text}>{DATA_Initial[props.lang].description.split('<br>').map((x, i) => (<div key={i} className={classes.paragraph}><p>{x}</p></div>))}</div>
                    </div>
                </div>
                <div className={classes.scrumble} id="text-wrapper">
                    <div id="text-scramble"></div>
                </div>
            </div>
        </Fragment>
    );
}

export default Initial;
