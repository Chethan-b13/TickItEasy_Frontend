import React, { useRef, useState } from 'react'
import { storage } from '../../../configs/firestoreConfig';
import '../../../Assests/Styles/event.css';
import '../../../Assests/Styles/auth.css';
import Navbar from '../../Common/Navbar'
import LoadingScreen from '../../Common/LoadingScreen';
import {MdOutlineCreditScore} from 'react-icons/md'
import {RxCrossCircled} from 'react-icons/rx'


const CreateEvent = () => {
    const fileInputRef = useRef(null);
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setloading] = useState(false)
    const handleFileUpload = async (event)=>{
        setloading(true)
        // Checking if a file is already uploaded
        if(imageUrl){
            const storageRef = storage.refFromURL(imageUrl);
            await storageRef.delete();
            console.log("duplicate image");
        }
        const folderPath = "EventImages";
        const file = event.target.files[0];
        const storageRef = storage.ref();
        const fileRef = storageRef.child(`${folderPath}/${file.name}`);
        const snapshot = await fileRef.put(file);
        const downloadURL = await snapshot.ref.getDownloadURL();
        setImageUrl(downloadURL);
        setloading(false)
    }

    const imgDeleteHandler = async (e) => {
        try {
            setloading(true)
            e.preventDefault()
            fileInputRef.current.value = ''
            const storageRef = storage.refFromURL(imageUrl);
            await storageRef.delete();
            setImageUrl("")
            console.log('Image deleted successfully!');
            setloading(false)
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    return (
        <div>
            <Navbar />
            <div>
                <div className="eventContainer">
                    <h1>Create an Event <MdOutlineCreditScore /> </h1>
                    <form action="" method="post">
                        <div className="row row1">
                            <InputField name='Title' id='title' type='text' extras={null} />
                            <InputField name='Poster' id='image' type='file' extras={{image:imageUrl,handler:handleFileUpload,imgDeleteHandler:imgDeleteHandler,fileInputRef:fileInputRef}}/>
                        </div>
                        <div className="row row2">
                            <label htmlFor="desc">Description:</label>
                            <textarea className='inputArea' name="" id="desc" cols="20" rows="10"></textarea>
                        </div>
                        
                        <div className="row row3">
                            <OptionField name='Mode' id='mode' options={['Offline','Online']} />
                            <OptionField name='Venue' id='venue' options={['Bangalore','Chennai']} />
                            <OptionField name='Genre' id='genre' options={['Comedy','Drama']} />
                            <label htmlFor="seats">Number of Seats: </label>
                            <input className='inputArea' type="number" name="" id="seats" min={1} defaultValue={1} style={{width:"10%"}}/>
                        </div>

                        <div className="row row4">
                            <InputField id='startdate' name='Start Date&Time' type="datetime-local" />
                            <InputField id='enddate' name='End Date&Time' type="datetime-local" />
                        </div>
                        <div className="row row5">
                            <button type="submit">Create</button>
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

const InputField = (props) =>{
    
    return(

        <div className="inp">
            <label htmlFor={props.id}>{props.name}:</label>
            <input className='inputArea' ref={props.extras?.fileInputRef} type={props.type} name="" id={props.id} onChange={ props.extras?.handler && props.extras?.handler }/>
            { props.type==='file' && (
                props.extras?.image && (
                <div>
                    <button onClick={props.extras.imgDeleteHandler}><RxCrossCircled /></button>
                    <img src={props.extras?.image} alt="Uploaded file" />
                </div>
                )
                
                ) }

        </div>

    );
}

const OptionField = (props) => {
    return(
        <>
            <label htmlFor={props.id}>{props.name}: </label>
            <select className='inputArea' name={props.id} id={props.id}>
                {
                    props.options.map((opt,idx)=>{
                        return <option key={idx} value={opt} defaultChecked>{opt}</option>
                    })
                }
            </select>
        </>
    );
}

export default CreateEvent