import React from 'react'
import Spinner from "../images/Spinner.svg"
function LoaderTwo({height, width}) {
    return (
        <div style={{ display: "flex", justifyContent:"center"}}>
            <img style={{ width, height }} src={Spinner} />
        </div>
    )
}

export default LoaderTwo
