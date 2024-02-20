import { useLottie } from "lottie-react";
import React, { useEffect, useState } from 'react';
import "../../Assests/Styles/snackbar.css";


const SnackBar = (props) => {

    const [counter, setcounter] = useState(1);

    

    const options = {
        animationData: props.lotie,
        loop: true
    };

    const { View } = useLottie(options);

    useEffect(() => {
      setTimeout(() => {
        setcounter(prev=> {
            return (prev + 1) % props.prompts.length;
        })
      }, 2000);
      
    }, [counter])
    

    return (
    <>
    <div className='snackbarContainer'>
        <div className="flexBox snackbarText">
            <>{View}</>
            <h3 key={counter}>{props?.prompts[counter]}</h3>
        </div>
        <div className="vertical-loader"></div>
    </div>
    </>
    )
}

export default SnackBar