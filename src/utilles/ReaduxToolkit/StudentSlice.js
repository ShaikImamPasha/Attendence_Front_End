const { createSlice } = require("@reduxjs/toolkit");

const StudentSlice=createSlice({
    name:"Student",
    initialState:{
        StudentData:[],
        mapActiveState:true,
        teacherLoaction:null
    },
    reducers:{
        addStudentData:function(state,action){
            return {...state,StudentData:action.payload}
        },
        addsetMapActiveState:function(state,action){
            return {...state,mapActiveState:action.payload}
        },
        addTeacherLoaction:function(state,action){
            return {...state,teacherLoaction:action.payload}
        }
    }
})
export const{addStudentData,addsetMapActiveState,addTeacherLoaction}=StudentSlice.actions;
export default StudentSlice.reducer;