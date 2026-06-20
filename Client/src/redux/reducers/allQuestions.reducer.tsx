import { GET_QUESTIONS } from "../actions/allQuestions.action"

const initialState = {}

export const allArticleReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case GET_QUESTIONS:
            return action.payload
        default:
            return state
    }
}