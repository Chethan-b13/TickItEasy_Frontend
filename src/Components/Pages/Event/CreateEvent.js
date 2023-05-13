import React, { createContext, useContext, useRef, useState } from 'react'
import { storage } from '../../../configs/firestoreConfig';
import '../../../Assests/Styles/event.css';
import '../../../Assests/Styles/auth.css';
import Navbar from '../../Common/Navbar'
import LoadingScreen from '../../Common/LoadingScreen';
import {MdOutlineCreditScore} from 'react-icons/md'
import {RxCrossCircled} from 'react-icons/rx';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { CreateEventSchema } from '../../Common/FormSchemas';
import axios from 'axios';
import { BASE_URL } from '../../../configs/apiConfig';
import { useDispatch, useSelector } from 'react-redux';
import { refresh_token } from '../../ReduxStores/authSlice';


const eventContext = createContext();

const CreateEvent = () => {
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setloading] = useState(false)
    const [page, setpage] = useState(1);
    const [custom_error, setcustom_error] = useState(null);

    const auth_info = useSelector(state => state.auth.token)
    const dispatch = useDispatch()

    const { register, handleSubmit, formState:{errors} } = useForm({
        resolver: yupResolver(CreateEventSchema),
    });




    const handleFileUpload = async (event)=>{
        setloading(true)
        // Checking if a file is already uploaded
        if(imageUrl){
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
            data['name'] = data['title']
            delete data['title'];
            data['start_time'] = new Date(data['start_time']).toISOString().slice(0, -5);;
            data['end_time'] = new Date(data['end_time']).toISOString().slice(0, -5);;
            const res = await axios.post(`${BASE_URL}/events/`,data,{
                headers:{
                'Authorization': 'Bearer ' + auth_info.access_token
                }
            })
            if(res.status===201){
                setcustom_error("Event Created SuccessFully");
                window.location = '/'; 
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




    return (
        <div>
            <Navbar />
            <eventContext.Provider value={register}>
                    <div className="eventContainer">
                        <h1>Create an Event <MdOutlineCreditScore /> </h1>
                        {/* <div className='paginationbuttons row5'>
                            {
                                [1,2,3,4,5].map((num,i)=>{
                                    return <PaginationButton key={i} page={page} number={num} setpage={setpage} />
                                })
                            }
                        </div> */}

                        <div className="line"></div>
                        {errors[Object.keys(errors)[0]] && 
                        <div className="error">
                            {<p>{errors[Object.keys(errors)[0]]?.message || custom_error }</p>}
                        </div>
                        }
                        <form onSubmit={handleSubmit(onSubmit)} method="post">
                            {/* {page===1 &&  */}
                                <div className="row row1">
                                    <InputField name='Title' id='title' type='text' extras={null} />
                                    <InputField id='price' name='Price Per Ticket' type="number" default={1} />

                                    <InputField name='Poster' id='image' type='file' extras={{image:imageUrl,handler:handleFileUpload,imgDeleteHandler:imgDeleteHandler}}/>
                                    
                                </div>
                            {/* } */}

                            {/* {page===2 &&  */}
                                <div className="row row2">
                                    <label htmlFor="description">Description:</label>
                                    <textarea className='inputArea' id="description" cols="20" rows="10" {...register("description")}></textarea>
                                </div>
                                {/* } */}
                            
                            {/* { page===3 && */}
                                <div className="row row3">
                                    <OptionField name='Mode' id='mode' options={['Offline','Online']} />
                                    <OptionField name='Venue' id='venue' options={['Bangalore','Chennai','Mumbai','Kolkata']}  />
                                    <OptionField name='Genre' id='genre' options={['Event','Comedy','theater&art','Webinar','WorkShop','CollegeEvent']} />
                                    <label htmlFor="number_of_seats">Number of Seats: </label>
                                    <input className='inputArea' type="number" id="number_of_seats" min={1} defaultValue={1} style={{width:"10%"}} {...register("number_of_seats")}/>
                                </div>
                            {/* } */}

                            {/* { page===4 && */}
                                <div className="row row4">
                                    <InputField id='start_time' name='Starts at' type="datetime-local" default={new Date().toISOString().slice(0, 16)} />
                                    <InputField id='end_time' name='Ends at' type="datetime-local" default={new Date().toISOString().slice(0, 16)} />
                                </div>
                            {/* } */}
                            {/* {page===5 && */}
                                <div className="row row5">
                                    <button type='submit'>Create</button>
                                </div>
                            {/* } */}
                        </form>
                    </div>
            </eventContext.Provider>
            {loading &&
            <LoadingScreen />
            }
        </div>
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
    return(
        <>
            <label htmlFor={props.id}>{props.name}: </label>
            <select defaultValue="" className='inputArea' id={props.id} {...inputSchema(props.id)}>
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

const PaginationButton = (props)=>{
    return <button className={props.page===props.number?'buttonactive':""} onClick={()=>props.setpage(props.number)} >Step {props.number}</button>
}

export default CreateEvent