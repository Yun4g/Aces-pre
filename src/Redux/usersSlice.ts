import { createSlice, PayloadAction } from "@reduxjs/toolkit";



export interface User {
    id : string;
    userName : string;
    email : string;
    role : string;
}


export interface UserState {
    users : User[];
}

 const initialState: UserState = {
    users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
   reducers: {
    fetchUsers: (state) => {
      state.users = state.users;
    }
   }


})

export const {fetchUsers} = usersSlice.actions;
export default usersSlice.reducer;

