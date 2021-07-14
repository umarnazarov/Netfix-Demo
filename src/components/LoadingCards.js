import React from 'react'
import loadingSvg from "../images/loadingSvg.svg"

function LoadingCards() {
    return (
        <div style={{ height: "100vh", display: "flex", flexDirection: 'column', alignItems: "center" }}>
            <img style={{ width: '300px', height: "300px" }} src={loadingSvg} />
            <h2 style={{ fontSize: "18px", color: "#CA1F2B", fontWeight: "400"}} >Loading Please Wait</h2>
        </div>
    )
}

export default LoadingCards
