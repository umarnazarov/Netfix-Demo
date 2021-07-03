import React from 'react'

function StarManage({ stars }) {
    return (
        <div>
            <i class={stars >= 1 ? "fas fa-star rating" : stars >= 0.5 ? "fas fa-star-half-alt rating" : "far fa-star rating"}></i>
            <i class={stars >= 2 ? "fas fa-star rating" : stars >= 1.5 ? "fas fa-star-half-alt rating" : "far fa-star rating"}></i>
            <i class={stars >= 3 ? "fas fa-star rating" : stars >= 2.5 ? "fas fa-star-half-alt rating" : "far fa-star rating"}></i>
            <i class={stars >= 4 ? "fas fa-star rating" : stars >= 3.5 ? "fas fa-star-half-alt rating" : "far fa-star rating"}></i>
            <i class={stars >= 5 ? "fas fa-star rating" : stars >= 4.5 ? "fas fa-star-half-alt rating" : "far fa-star rating"}></i>
        </div>
    )
}

export default StarManage
