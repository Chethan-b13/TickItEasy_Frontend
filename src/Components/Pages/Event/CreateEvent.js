import React, { useState } from 'react'
import { storage } from '../../../configs/firestoreConfig';
import '../../../Assests/Styles/event.css';
import '../../../Assests/Styles/auth.css';
import Navbar from '../../Common/Navbar'
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
            <Navbar />
            <div>
                <div className="eventContainer">
                    <h1>Hello Lets Create Event</h1>
                    <form action="" method="post">
                        <div className="row row1">
                            <div className="inp">
                                <label htmlFor="title">Title:</label>
                                <input className='inputArea' type="text" name="" id="title" placeholder='Enter Text'/>
                            </div>
                            <div className="inp">
                                <label htmlFor="image">Poster:</label>
                                <input className='inputArea' type="file" name="images" id="image" onChange={handleFileUpload}/>
                                {imageUrl && <img src={imageUrl} alt="Uploaded file" />}
                            </div>
                        </div>
                        <div className="row row2">
                            <label htmlFor="desc">Description:</label>
                            <textarea className='inputArea' name="" id="desc" cols="25" rows="15"></textarea>
                        </div>
                        
                        <div className="row row3">
                            <label htmlFor="mode">Mode: </label>
                            <select className='inputArea' name="" id="mode">
                                <option value="Offline" defaultChecked>Offline</option>
                                <option value="Online">Online</option>
                            </select>
                            <label htmlFor="venue">Venue: </label>
                            <select className='inputArea' name="" id="venue">
                                <option value="Bangalore" defaultChecked>Bangalore</option>
                                <option value="Chennai">Chennai</option>
                            </select>
                            <label htmlFor="genre">Genre: </label>
                            <select className='inputArea' name="" id="genre">
                                <option value="Comedy" defaultChecked>Comedy</option>
                                <option value="Drama">Drama</option>
                            </select>
                            {/* <div className="inp"> */}
                                <label htmlFor="seats">Number of Seats</label>
                                <input className='inputArea' type="number" name="" id="seats" min={1} defaultValue={1} style={{width:"10%"}}/>
                            {/* </div> */}
                        </div>

                        <div className="row row4">
                            <div className="inp">
                                <label htmlFor="startdate">Start Date&Time: </label>
                                <input className='inputArea' type="datetime-local" name="" id="startdate" />
                            </div>
                            <div className="inp">
                                <label htmlFor="enddate">End Date&Time: </label>
                                <input className='inputArea' type="datetime-local" name="" id="enddate" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {loading &&
            <LoadingScreen />
            }
        </div>
    )
}

export default CreateEvent