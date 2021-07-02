import React from 'react'
import loadingSvg from "../images/loadingSvg.svg"

function LoadingCards() {
    return (
        <div style={{ margin: '0 auto' }}>
            <img style={{ width: '300px', height: "300px" }} src={loadingSvg} />
        </div>
    )
}

export default LoadingCards
