import React from "react";
import s from "./Profile.module.css"
import MyPosts from "./MyPosts/MyPosts";

const Profile = () => {
    return <div className={s.content}>
        <div>
            <img
                src={'https://thumbs.dreamstime.com/b/%D0%BF%D0%B0%D0%BD%D0%BE%D1%80%D0%B0%D0%BC%D0%B0-%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D0%B0-%D0%B5%D0%BA%D0%B0%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D0%B1%D1%83%D1%80%D0%B3%D0%B0-108208082.jpg'}
                alt={''}/>
        </div>
        <div>
            <div>
                <img className={s.avatar}
                     src={'https://trainghiemso.vn/wp-content/uploads/2020/05/%C3%B4m-ti%E1%BB%81n.png'} alt={''}/>
            </div>
            <div>
                description
            </div>
        </div>
        <MyPosts />
    </div>
}

export default Profile;