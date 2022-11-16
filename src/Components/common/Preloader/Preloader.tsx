import React from 'react';
import preloader from "../../../assets/images/loading.gif";

export const Preloader = () => {
    return (
        <div>
            <img width="60px" src={preloader} alt='loading'/>
        </div>
    );
};