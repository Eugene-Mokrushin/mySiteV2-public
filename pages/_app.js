import { useState, useEffect } from 'react'
import Head from 'next/head'

import '../sass/globals.scss'
import '../components/Projects/Editor.scss'
import isMobile from '../scripts/isMobile'

import Header from '../components/Header/Header'

function MyApp({ Component, pageProps }) {
  const [language, setLanguage] = useState('EN');
  const [mobile, setMobile] = useState(false)


  function hangleLanguage(selectedLanguage) {
    setLanguage(selectedLanguage)
  }

  useEffect(() => {
    if (isMobile.any()) {
      setMobile(true)
    } else {
      const coords = { x: 0, y: 0 };
      const circles = document.querySelectorAll("#circle");

      const colors = [
        "#44107a",
        "#4d1c81",
        "#582b89",
        "#633991",
        "#6e4799",
        "#7955a1",
        "#7f5ca5",
        "#8a6aad",
        "#9274b2",
        "#9a7eb7",
        "#a38abe",
        "#b29dc9",
        "#b8a4cd",
        "#c1b0d4",
        "#c9b9d9",
        "#d2c5e0",
        "#dfd6e9",
        "#ece7f2",
        "#f2eef6",
        "#ffffff",
      ];

      circles.forEach(function (circle, index) {
        circle.x = 0;
        circle.y = 0;
        circle.style.backgroundColor = colors[index % colors.length];
      });

      window.addEventListener("mousemove", function (e) {
        coords.x = e.clientX;
        coords.y = e.clientY;

      });

      function animateCircles() {

        let x = coords.x;
        let y = coords.y;

        circles.forEach(function (circle, index) {
          circle.style.left = x - 12 + "px";
          circle.style.top = y - 12 + "px";

          circle.style.scale = (circles.length - index) / circles.length;

          circle.x = x;
          circle.y = y;

          const nextCircle = circles[index + 1] || circles[0];
          x += (nextCircle.x - x) * 0.3;
          y += (nextCircle.y - y) * 0.3;
        });

        requestAnimationFrame(animateCircles);
      }

      animateCircles();
    }
  }, [])


  console.warn = () => { };
  console.error = () => { };

  return (
    <>
      <Head>
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon.png" />
      </Head>
      <div className="container">
        {mobile ? null :
          <>
            <div id="circle"></div>
            <div id="circle"></div>
            <div id="circle"></div>
            <div id="circle"></div>
            <div id="circle"></div>
            <div id="circle"></div>
            <div id="circle"></div>
            <div id="circle"></div>
            <div id="circle"></div>
            <div id="circle"></div>
            <div id="circle"></div>
            <div id="circle"></div>
            <div id="circle"></div>
            <div id="circle"></div>
            <div id="circle"></div>
            <div id="circle"></div>
            <div id="circle"></div>
            <div id="circle"></div>
            <div id="circle"></div>
            <div id="circle"></div>
          </>}
        <Header
          languageSetter={hangleLanguage}
          currentLanguage={language}
        />
        <Component {...pageProps} lang={language} />
      </div>
    </>
  )
}

export default MyApp
