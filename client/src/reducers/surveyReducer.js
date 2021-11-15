import { FETCH_SURVEYS } from "../action/types";
export default (state=[],action)=>{
    switch(action.type){
        case FETCH_SURVEYS:
            return action.payload;
        default:
            return state;
    }
} 