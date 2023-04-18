import axios from "axios"
import { BASE_URL } from "../../../configs/apiConfig"
import { refresh_token } from "../../ReduxStores/authSlice"


export const FetchAllEvents = async (props,dispatch,setevents)=>{
    if(props.isAuthenticated){
        try {
            const response = await axios.get(`${BASE_URL}/events/`,{
                headers: {
                  Authorization: `Bearer ${props.token.access_token}`
                }
              })
            setevents([...response.data,response.data[2]]);
            return response.data
        } catch (error) {
            if (error.response?.data.code==="token_not_valid"){
                console.log("Haha Token Expired",props.token.refresh_token);
                await dispatch(refresh_token(props.token.refresh_token))
                window.location = '/'; 
            }else{
                console.log(error);
            }
        }
    }else{
        console.log("Not Logged In!");
        window.location = '/login'
    } 
}