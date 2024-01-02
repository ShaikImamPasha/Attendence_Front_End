import { createSlice } from "@reduxjs/toolkit";
const adminSlice=createSlice(
    {
        name:"AdminSlice",
        initialState:{
            AdminDetailes:[],
            data:["data"]
        },
        reducers:{
            addAdminData:function(state,action){
                return {...state,AdminDetailes:action.payload}
            }
        }
    }
)
export const{addAdminData}=adminSlice.actions;
export default adminSlice.reducer;