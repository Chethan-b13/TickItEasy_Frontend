import React from 'react'
import '../../Assests/Styles/common.css';

const LoadingScreen = () => {
  return (
    <div className="loadingBackground">
        <div className="loading"></div>
    </div>
  )
}

export const LightLoadingScreen = () =>{
  return <div className="loading"></div>
}

export default LoadingScreen