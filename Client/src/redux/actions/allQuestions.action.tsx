import axios from "axios";

export const GET_QUESTIONS = "GET_QUESTIONS"

export const getActions = (dispatch:any) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/user`)
            .then((res:any)=> {
                dispatch({type: GET_QUESTIONS, payload: res.data})
            })
            .catch((err:any) => window.alert(err))
}