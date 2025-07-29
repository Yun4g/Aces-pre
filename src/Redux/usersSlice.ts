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
    fetchUsers: (state, action : PayloadAction<User[]>) => {
      state.users = action.payload;
    }
   }


})

export const {fetchUsers} = usersSlice.actions;
export default usersSlice.reducer;

