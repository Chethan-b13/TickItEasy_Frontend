import React from 'react'
import Header from '../Common/Header'

const Home = () => {
  const access_token = localStorage.getItem('access_token')
  console.log(access_token);
  return (
    <div className="homeContainer">
        <Header />
    </div>
  )
}

export default Home