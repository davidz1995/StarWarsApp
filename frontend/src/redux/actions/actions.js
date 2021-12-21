import axios from "axios";
import { GET_CHARACTERS_BY_FILMS } from "./actionTypes";
import { localhost } from '../../constants'

export const getCharactersByFilm = (id, authorized) => {
    return async (dispatch) => {
        if (id) {
        const response = await axios.get(`${localhost}/${id}`,{
            headers:{
                Authorization: 'Bearer ' + authorized
            }
        })
        let error = [{name: 'Not found'}]
        if(response.status === 200) dispatch({type: GET_CHARACTERS_BY_FILMS, payload: response.data})
        if(response.status === 404) dispatch({type: GET_CHARACTERS_BY_FILMS, payload: error})
        } 
    }
}
