import React from "react";
import nonImage from './images/noImage.png'

export const Profile = () => {
    return (
        <>
            <div className="profilePic">
                <img src={nonImage} alt="" />
            </div>
            <div>
                <h4 className="profileName">@UserName</h4>
            </div>
            <div className="profileInfo">
                <p>Info</p>
            </div>
            <div className="profileTarget">
                <p>Target</p>
            </div>
        </>
    )
}