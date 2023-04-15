import React, { useState } from 'react'
import { storage } from '../../../configs/firestoreConfig';
import '../../../Assests/Styles/event.css';
import LoadingScreen from '../../Common/LoadingScreen';


const CreateEvent = () => {
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setloading] = useState(false)
    const handleFileUpload = async (event)=>{
        setloading(true)
        const folderPath = "EventImages";
        const file = event.target.files[0];
        const storageRef = storage.ref();
        const fileRef = storageRef.child(`${folderPath}/${file.name}`);
        const snapshot = await fileRef.put(file);
        const downloadURL = await snapshot.ref.getDownloadURL();
        setImageUrl(downloadURL);
        console.log(downloadURL);
        setloading(false)
    }
    return (
        <div>
            <h1>Hello Lets Create Event</h1>
            <input type="file" name="images" id="images" onChange={handleFileUpload}/>
            {imageUrl && <img src={imageUrl} alt="Uploaded file" />}
            {loading &&
            <LoadingScreen />
            }
        </div>
    )
}

export default CreateEvent