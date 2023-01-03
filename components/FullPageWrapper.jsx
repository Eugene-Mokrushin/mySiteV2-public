import React, { Fragment } from "react";
// import ReactDOM from "react-dom";
import ReactFullpage from "@fullpage/react-fullpage";
import Head from 'next/head'

export default function FullPage(props) {
    return (
        <Fragment>
            <ReactFullpage
                licenseKey='key'
                scrollingSpeed={1000}
                render={() =>
                    <ReactFullpage.Wrapper>
                        {props.children}
                    </ReactFullpage.Wrapper>
                }
            />
        </Fragment>
    )
}

