import axios from "axios";
import { FETCH_USER, GOOGLE_AUTH } from "./types";
// const Api = axios.create({
//   baseURL: "http://localhost:5000",
//   withCredentials: true,
// });
const Api = axios.create({
  baseURL: 'https://powerful-brushlands-97812.herokuapp.com',
  withCredentials: true,
});
export const fetchUser = () => async (dispatch) => {
  const res = await Api.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken=(token)=> async(dispatch)=>{
   const res=await Api.post('/api/stripe',token);
   dispatch({ type: FETCH_USER, payload:res.data});
}
// export const google_auth=async ()=>await Api.get('/auth/google')
