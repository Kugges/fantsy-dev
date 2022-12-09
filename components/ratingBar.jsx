import { Rating } from 'flowbite-react';
import React from 'react'
import { AiFillStar } from "react-icons/ai";

const RatingBar = () => {
    return (
        <div className="flex gap-1 justify-center items-center">
            <Rating>
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star filled={false} />
            </Rating>
        </div>
    )
}

export default RatingBar