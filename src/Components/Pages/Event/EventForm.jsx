import React, { createContext, useContext,useEffect,useState} from 'react'
import {MdEdit, MdOutlineCreditScore} from 'react-icons/md'
import {RxCrossCircled} from 'react-icons/rx';
import axios from 'axios';
import { BASE_URL } from '../../../configs/apiConfig';
import { refresh_token } from '../../ReduxStores/authSlice';
import { storage } from '../../../configs/firestoreConfig';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateEventSchema } from '../../Common/FormSchemas';
import { useParams } from 'react-router-dom';

const eventContext = createContext();

const EventForm = ({
    setloading,
    eventData
}) => {

    const [custom_error, setcustom_error] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const auth_info = useSelector(state => state.auth.token)
    const dispatch = useDispatch();
    const { slug } = useParams();

    const { register, handleSubmit, formState: { errors },setValue } = useForm({
        defaultValues: eventData || {}, 
        resolver: yupResolver(CreateEventSchema)
    });
    

    const handleFileUpload = async (event)=>{
        setloading(true)
        // Checking if a file is already uploaded
        if(imageUrl && imageUrl.includes("firebasestorage") ){
            const storageRef = storage.refFromURL(imageUrl);
            await storageRef.delete();
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
            // fileInputRef.current.value = ''
            document.getElementById("image").value = "";
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

    const onSubmit = async (data) => {
        setloading(true)
        try {
            data['image'] = imageUrl
            data['start_time'] = new Date(data['start_time']).toISOString().slice(0, -5);
            data['end_time'] = new Date(data['end_time']).toISOString().slice(0, -5);
            let res;
            if(eventData){
                res = await axios.put(`${BASE_URL}/events/${slug}/`,data,{
                    headers:{
                    'Authorization': 'Bearer ' + auth_info.access_token
                    }
                })
            }else{
                res = await axios.post(`${BASE_URL}/events/`,data,{
                    headers:{
                    'Authorization': 'Bearer ' + auth_info.access_token
                    }
                })
            }
            if(res.status===201){
                setcustom_error("Event Created SuccessFully");
                window.location = '/'; 
            }else if(res.status === 200){
                setcustom_error("Event Edited SuccessFully");
            }else{
                setcustom_error("Something went Wrong!");
            }
        } catch (error) {
            if (error.response?.data.code==="token_not_valid"){
                // console.log("Haha Token Expired",auth_info.token.refresh_token);
                await dispatch(refresh_token(auth_info.refresh_token))
                window.location = '/event'; 
            }else{
                setcustom_error("Something went Wrong!");
                throw error
            }  
        }finally{
            setloading(false)
        }
    }

    useEffect(() => {
      if(eventData){
        setImageUrl(eventData?.image)
        Object.keys(eventData).forEach((key) => {
            if(key.includes("_time")){
                setValue(key,new Date(eventData[key]).toISOString().slice(0, 16))
            }else{
                setValue(key, eventData[key]);
            }
        });
      }
    }, [eventData])
    

    return (
        <eventContext.Provider value={register}>
        <div className="eventContainer">
            {
                eventData 
                ? <h1>Edit Your Event <MdEdit /> </h1>
                : <h1>Create an Event <MdOutlineCreditScore /> </h1>
            }
            

            <div className="line"></div>
            {errors[Object.keys(errors)[0]] && 
            <div className="error">
                {<p>{errors[Object.keys(errors)[0]]?.message || custom_error }</p>}
            </div>
            }
            <form onSubmit={handleSubmit(onSubmit)} method="post">

                <div className="row row1">
                    <InputField name='Title' id='name' type='text' default={eventData && eventData?.name} />
                    <InputField id='price' name='Price Per Ticket' type="number" default={eventData && eventData?.price} />

                    <InputField name='Poster' id='image' type='file' extras={{image:imageUrl,handler:handleFileUpload,imgDeleteHandler:imgDeleteHandler}}/>
                    
                </div>

                <div className="row row2">
                    <label htmlFor="description">Description:</label>
                    <textarea className='inputArea' id="description" cols="20" rows="10" 
                        defaultValue={eventData && eventData?.description} 
                        {...register("description")}
                    >
                    </textarea>
                </div>

                <div className="row row3">
                    <OptionField name='Mode' id='mode' defaultVal={eventData && eventData.mode} options={['Offline','Online']} />
                    <OptionField name='Venue' id='venue' defaultVal={eventData && eventData.venue} options={['Bangalore','Chennai','Mumbai','Kolkata',"Vanuatu"]}  />
                    <OptionField name='Genre' id='genre' defaultVal={eventData && eventData.genre} options={['Event','Comedy','theater&art','Webinar','WorkShop','CollegeEvent']} />
                    <label htmlFor="number_of_seats">Number of Seats: </label>
                    <input className='inputArea' type="number" id="number_of_seats" min={1} defaultValue={eventData && eventData.number_of_seats} style={{width:"10%"}} {...register("number_of_seats")}/>
                </div>

                <div className="row row4">
                    <InputField id='start_time' name='Starts at' type="datetime-local" default={eventData && new Date(eventData?.start_time).toISOString().slice(0, 16) }/>
                    <InputField id='end_time' name='Ends at' type="datetime-local" default={eventData && new Date(eventData?.end_time).toISOString().slice(0, 16)} />
                </div>

                <div className="row row5">
                    <button type='submit'>{eventData ?  "Edit":"Create"}</button>
                </div>

            </form>
        </div>
        </eventContext.Provider>
    )
}

const InputField = (props) =>{
    
    const inputSchema = useContext(eventContext);

    return(
        
        <div className="inp">
            <label htmlFor={props.id}>{props.name}:</label>
            {
                props.extras?
                <input {...inputSchema(props.id)} className='inputArea' type={props.type} id={props.id} onChange={ props.extras?.handler && props.extras?.handler }/>
                : <input {...inputSchema(props.id)} className='inputArea' type={props.type} id={props.id} defaultValue={props.default? props.default : ''} />
             
            }
            { props.type==='file' && (
                props.extras?.image && (
                <div id='AfterUpload'>
                    <img src={props.extras?.image} alt="Uploaded file" />
                    <a onClick={props.extras.imgDeleteHandler}><RxCrossCircled /></a>
                </div>
                )
                
                ) }

        </div>

    );
}

const OptionField = (props) => {
    const inputSchema = useContext(eventContext);

    const def_value = props?.defaultVal;
    
    return(
        <>
            <label htmlFor={props.id}>{props.name}: </label>
            <select className='inputArea' id={props.id} value={def_value} {...inputSchema(props.id)}>
                <option value="" disabled>Select an option</option>
                {
                    props.options.map((opt,idx)=>{
                        return <option key={idx} value={opt}>{opt}</option>
                    })
                }
            </select>
        </>
    );
}

export default EventForm