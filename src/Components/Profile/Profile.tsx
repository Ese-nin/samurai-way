import React from "react";
import "./Profile.css"

const Profile = () => {
    return <div className={'content'}>
        <div>
            <img
                src={'https://thumbs.dreamstime.com/b/%D0%BF%D0%B0%D0%BD%D0%BE%D1%80%D0%B0%D0%BC%D0%B0-%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D0%B0-%D0%B5%D0%BA%D0%B0%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D0%B1%D1%83%D1%80%D0%B3%D0%B0-108208082.jpg'} alt={''}/>
        </div>
        <div>
            avtar + desription
        </div>
        <div>
            <div>
                My posts
            </div>
            <div>
                New post
            </div>
        </div>
        <div>
            <div>
                Post 1
            </div>
            <div>
                Post 2
            </div>
        </div>
    </div>
}

export default Profile;