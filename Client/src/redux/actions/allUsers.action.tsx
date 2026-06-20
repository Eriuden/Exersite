import axios from "axios";

export const GET_USERS = "GET_USERS"

export const getUsers = (dispatch:any) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/user`)
            .then((res:any)=> {
                dispatch({type: GET_USERS, payload: res.data})
            })
            .catch((err:any) => window.alert(err))
}