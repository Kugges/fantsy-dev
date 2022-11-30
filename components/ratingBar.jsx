import React from 'react'
import { AiFillStar } from "react-icons/ai";

const RatingBar = () => {
    return (
        <div className="flex gap-1 text-fantsy-orange-500 justify-center items-center">
            <AiFillStar size={25} />
            <AiFillStar size={25} />
            <AiFillStar size={25} />
            <AiFillStar size={25} />
            <AiFillStar size={25} />
        </div>
    )
}

export default RatingBar