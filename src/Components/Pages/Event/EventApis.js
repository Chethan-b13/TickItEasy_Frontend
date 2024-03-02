import axios from "axios"
import { BASE_URL } from "../../../configs/apiConfig"

export const FetchAllEvents = async (dispatch,setevents)=>{
        try {
            const response = await axios.get(`${BASE_URL}/events/all-events`)
            setevents(response.data);
            return response.data
        } catch (error) {
            // if (error.response?.data.code==="token_not_valid"){
            //     console.log("Haha Token Expired",props.token.refresh_token);
            //     await dispatch(refresh_token(props.token.refresh_token))
            //     window.location = '/'; 
            // }else{
                console.log(error);
            // }
            throw error
        }
}