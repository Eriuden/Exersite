import axios from "axios";

export const GET_ACTIONS = "GET_ACTIONS"

export const getActions = (dispatch:any) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/user`)
            .then((res:any)=> {
                dispatch({type: GET_ACTIONS, payload: res.data})
            })
            .catch((err:any) => window.alert(err))
}