import { configureStore } from "@reduxjs/toolkit";
import AdminSlice from "./AdminSlice";
import StudentSlice from "./StudentSlice";
const appStore=configureStore({
    reducer:{
         admin:AdminSlice,
         student:StudentSlice
    }
});
export default appStore;