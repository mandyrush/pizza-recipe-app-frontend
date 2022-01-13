import React from "react";

import { CapitalizeFirstLetter } from "../helpers";

const RatingCard = ({ rating }) => {
    return (
        <div>
            <h2>{CapitalizeFirstLetter(rating.name)} - {rating.score} / 50</h2>
            <p>{rating.comments}</p>
        </div>
    )
}

export default RatingCard;