import React, { useState } from 'react'
import '../../../Assests/Styles/event.css';
import '../../../Assests/Styles/auth.css';
import Navbar from '../../Common/Navbar'
import LoadingScreen from '../../Common/LoadingScreen';

import EventForm from './EventForm';

const CreateEvent = () => {
    const [loading, setloading] = useState(false)

    return (
        <div>
            <Navbar />
            <EventForm setloading={setloading} />
            {loading &&
            <LoadingScreen />
            }
        </div>
    )
}



export default CreateEvent